"use client";

import { memo } from "react";
import { sections } from "@/data/deck";

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  showGrid: boolean;
  onShowGrid: () => void;
}

function Navigation({
  activeSection,
  onNavigate,
  showGrid,
  onShowGrid,
}: NavigationProps) {
  return (
    <nav
      className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-ink/5 z-40 hidden lg:flex flex-col py-6 no-print"
      role="navigation"
      aria-label="Deck sections"
    >
      {/* Logo / Back to grid */}
      <button
        onClick={onShowGrid}
        className="px-6 mb-8 flex items-center gap-2 text-left group"
        aria-label="Back to overview"
      >
        <div className="w-8 h-8 bg-ink rounded-md flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-white"
          >
            <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
          </svg>
        </div>
        <span className="text-body-sm font-medium text-ink-light group-hover:text-ink transition-colors">
          Overview
        </span>
      </button>

      {/* Section links */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto relative">
        {sections.map((section, i) => {
          const isActive = !showGrid && activeSection === i;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 group relative ${
                isActive
                  ? "bg-surface-cool text-ink"
                  : "text-ink-muted hover:text-ink hover:bg-surface-warm transition-colors duration-150"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active indicator bar — instant on click */}
              <div
                className="absolute left-0 top-1/2 w-[3px] rounded-full bg-accent"
                style={{
                  height: isActive ? 20 : 0,
                  opacity: isActive ? 1 : 0,
                  transform: "translateY(-50%)",
                }}
              />
              <span
                className={`w-5 text-caption font-mono flex-shrink-0 ${
                  isActive ? "text-accent" : "text-ink-muted"
                }`}
              >
                {section.tileIcon}
              </span>
              <span
                className={`text-body-sm truncate ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {section.navLabel}
              </span>
              {/* Active dot — instant */}
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(0)",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Progress */}
      {!showGrid && (
        <div className="px-6 pt-4 border-t border-ink/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-ink-muted">Progress</span>
            <span className="text-caption font-mono text-ink-muted">
              {activeSection + 1}/{sections.length}
            </span>
          </div>
          <div className="w-full h-1 bg-surface-cool rounded-full overflow-hidden">
            <div
              className="h-full bg-ink rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((activeSection + 1) / sections.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default memo(Navigation);
