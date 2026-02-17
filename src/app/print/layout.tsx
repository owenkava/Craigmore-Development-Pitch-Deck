import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Craigmore Drive — Investor Deck (Print)",
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Inter';
                src: url('/fonts/Inter-Regular.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'Inter';
                src: url('/fonts/Inter-Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'Inter';
                src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
                font-weight: 600;
                font-style: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'Inter';
                src: url('/fonts/Inter-Bold.woff2') format('woff2');
                font-weight: 700;
                font-style: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'JetBrains Mono';
                src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'JetBrains Mono';
                src: url('/fonts/JetBrainsMono-Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: block;
              }
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Inter', system-ui, sans-serif;
                background: #ffffff;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
