import { NextResponse } from "next/server";
import type { Browser } from "puppeteer-core";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* ── Browser singleton — reuse across requests ── */
let browserInstance: Browser | null = null;

const IS_VERCEL = !!process.env.VERCEL;

async function getBrowser(): Promise<Browser> {
  if (browserInstance && browserInstance.connected) {
    return browserInstance;
  }

  if (IS_VERCEL) {
    // Vercel serverless: use @sparticuz/chromium (lightweight, Lambda-compatible)
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteerCore = (await import("puppeteer-core")).default;

    browserInstance = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    // Local dev: use full puppeteer with bundled Chromium
    const puppeteer = (await import("puppeteer")).default;
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--font-render-hinting=none",
        "--disable-web-security",
      ],
    }) as unknown as Browser;
  }

  return browserInstance;
}

export async function GET() {
  const t0 = Date.now();
  let page: Awaited<ReturnType<Browser["newPage"]>> | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    // Retina-quality rendering
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    // Navigate — generous timeout for first cold compile
    await page.goto(`${baseUrl}/print`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Wait for the print root to appear
    await page.waitForSelector("#print-root", { timeout: 10000 });

    // Wait for fonts + images in parallel (3s cap on images)
    await page.evaluate(() => {
      return Promise.all([
        document.fonts.ready,
        Promise.race([
          Promise.all(
            Array.from(document.querySelectorAll("img")).map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                  })
            )
          ),
          new Promise<void>((resolve) => setTimeout(resolve, 3000)),
        ]),
      ]);
    });

    // Brief settle for CSS paint
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Count slides
    const slideCount = await page.evaluate(() => {
      return document.querySelectorAll(".slide-page").length;
    });

    // Generate PDF
    const pdf = await page.pdf({
      width: "1280px",
      height: "720px",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const elapsed = Date.now() - t0;
    console.log(`PDF generated: ${slideCount} slides, ${pdf.byteLength} bytes, ${elapsed}ms`);

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Craigmore Drive Investor Deck.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json(
      {
        error: "PDF export failed",
        details: error instanceof Error ? error.message : "Unknown error",
        hint: "Ensure Puppeteer is installed and a Chromium binary is available.",
      },
      { status: 500 }
    );
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
}
