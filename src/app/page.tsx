"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Tile from "@/components/Tile";
import CoverSection from "@/components/sections/CoverSection";
import TeamSection from "@/components/sections/TeamSection";
import OpportunitySection from "@/components/sections/OpportunitySection";
import PropertySection from "@/components/sections/PropertySection";
import ZoningSurroundingsSection from "@/components/sections/ZoningSurroundingsSection";
import FinancialsSection from "@/components/sections/FinancialsSection";
import HomeTypeSection from "@/components/sections/HomeTypeSection";
import ClosingSection from "@/components/sections/ClosingSection";
import { sections } from "@/data/deck";

export default function Home() {
  const [showGrid, setShowGrid] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollRef = useRef<number | null>(null);
  // Lock out scroll-based updates during programmatic navigation
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll the snap container to a section index
  const scrollToIndex = useCallback((index: number, instant = false) => {
    const container = scrollContainerRef.current;
    const el = document.getElementById(sections[index].id);
    if (el && container) {
      const top = el.offsetTop - container.offsetTop;
      if (instant) {
        container.style.scrollBehavior = "auto";
        container.scrollTo({ top });
        requestAnimationFrame(() => {
          container.style.scrollBehavior = "";
        });
      } else {
        container.scrollTo({ top });
      }
    }
  }, []);

  const navigateToSection = useCallback(
    (index: number) => {
      // Instantly highlight the clicked section
      setActiveSection(index);
      activeSectionRef.current = index;

      // Block scroll handler from overwriting during smooth scroll
      isNavigatingRef.current = true;
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 900);

      if (showGrid) {
        pendingScrollRef.current = index;
        setShowGrid(false);
      } else if (scrollContainerRef.current) {
        scrollToIndex(index);
      }
    },
    [showGrid, scrollToIndex]
  );

  // When switching from grid to sections, scroll to the pending target
  useEffect(() => {
    if (showGrid || pendingScrollRef.current === null) return;

    const target = pendingScrollRef.current;
    pendingScrollRef.current = null;
    // Wait two frames for the sections DOM to be fully laid out
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToIndex(target, true);
      });
    });
  }, [showGrid, scrollToIndex]);

  const showGridView = useCallback(() => {
    setShowGrid(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Track active section on scroll — uses rAF to avoid jitter
  const activeSectionRef = useRef(0);
  useEffect(() => {
    if (showGrid) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerOffset = container.offsetTop;
    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;

      // Don't override active section during click-initiated navigation
      if (isNavigatingRef.current) return;

      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const scrollProbe = scrollTop + viewportHeight * 0.35;

      const sectionEls = container.querySelectorAll("[data-section-index]");
      let active = 0;

      sectionEls.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const sectionTop = htmlEl.offsetTop - containerOffset;
        if (sectionTop <= scrollProbe) {
          active = Number(htmlEl.dataset.sectionIndex);
        }
      });

      // Only update state when the active section actually changes
      if (!isNaN(active) && active !== activeSectionRef.current) {
        activeSectionRef.current = active;
        setActiveSection(active);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActive);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [showGrid]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showGrid) return;
      // Don't intercept keyboard events when user is interacting with form elements
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        if (activeSection < sections.length - 1) {
          navigateToSection(activeSection + 1);
        }
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeSection > 0) {
          navigateToSection(activeSection - 1);
        }
      }
      if (e.key === "Escape") {
        showGridView();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showGrid, activeSection, navigateToSection, showGridView]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: showGrid ? "#ffffff" : "#023E40" }}>
      <Navigation
        activeSection={activeSection}
        onNavigate={navigateToSection}
        showGrid={showGrid}
        onShowGrid={showGridView}
      />
      <MobileNav
        activeSection={activeSection}
        onNavigate={navigateToSection}
        showGrid={showGrid}
        onShowGrid={showGridView}
      />
      <Header onNavigate={navigateToSection} showGrid={showGrid} />

      <main className="lg:ml-[240px] pt-14 relative" style={{ backgroundColor: showGrid ? undefined : "#023E40" }}>
        {/* Grid view */}
        <div
          className="min-h-screen flex items-center justify-center px-6 py-20 transition-opacity duration-300"
          style={{
            opacity: showGrid ? 1 : 0,
            pointerEvents: showGrid ? "auto" : "none",
            position: showGrid ? "relative" : "absolute",
            inset: showGrid ? undefined : 0,
            zIndex: showGrid ? 1 : 0,
          }}
        >
          <div className="w-full max-w-[1200px] mx-auto">
            {/* Grid header */}
            <div className="mb-12">
              <span className="section-label">Investor Deck</span>
              <h1 className="text-display-md sm:text-display-lg font-display font-bold tracking-tight text-ink mb-2">
                Craigmore Drive
              </h1>
              <p className="text-body-lg text-ink-light max-w-xl">
                Select a section to explore, or navigate sequentially using the sidebar.
              </p>
            </div>

            {/* Tile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, i) => (
                <Tile
                  key={section.id}
                  number={section.tileIcon}
                  title={section.navLabel}
                  subtitle={section.subtitle}
                  onClick={() => navigateToSection(i)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sections view */}
        <div
          className="transition-opacity duration-300"
          style={{
            opacity: showGrid ? 0 : 1,
            pointerEvents: showGrid ? "none" : "auto",
            position: showGrid ? "absolute" : "relative",
            inset: showGrid ? 0 : undefined,
            zIndex: showGrid ? 0 : 1,
          }}
        >
          <div ref={scrollContainerRef} className="scroll-snap-container" style={{ backgroundColor: "#023E40" }}>
            <CoverSection onNavigate={navigateToSection} />
            <OpportunitySection onNavigate={navigateToSection} />
            <PropertySection onNavigate={navigateToSection} />
            <ZoningSurroundingsSection onNavigate={navigateToSection} />
            <HomeTypeSection onNavigate={navigateToSection} />
            <FinancialsSection onNavigate={navigateToSection} />
            <TeamSection onNavigate={navigateToSection} />
            <ClosingSection onNavigate={navigateToSection} />
          </div>
        </div>
      </main>

      {/* Mobile progress bar */}
      {!showGrid && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-surface-cool z-50 lg:hidden no-print">
          <motion.div
            className="h-full bg-ink"
            animate={{
              width: `${((activeSection + 1) / sections.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
}
