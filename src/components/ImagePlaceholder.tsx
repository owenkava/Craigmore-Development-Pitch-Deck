"use client";

import { useState } from "react";

interface ImagePlaceholderProps {
  label: string;
  aspect?: string;
  src?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  aspect = "16/9",
  src,
  className = "",
}: ImagePlaceholderProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showPlaceholder = !src || errored || !loaded;

  return (
    <div
      className={`relative bg-surface-cool rounded-card overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src && !errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      ) : null}
      {showPlaceholder && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="mb-2 opacity-30"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          <span className="text-caption font-mono opacity-50">{label}</span>
        </div>
      )}
    </div>
  );
}
