import { useState, useEffect, useRef, useCallback } from "react";
import { MdClose, MdPlayArrow, MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./styles/WorkGallery.css";

/* ── Types ────────────────────────────────────────────────────────── */

export interface MediaItem {
  type: "image" | "video";
  src: string;      // image path  |  video file path  |  YouTube/Vimeo embed URL
  poster?: string;  // optional poster for video grid thumbnail
  caption?: string;
}

export interface WorkProject {
  num: string;
  title: string;
  category: string;
  tools: string;
  thumbnail: string;
  gallery: MediaItem[];
}

interface WorkGalleryProps {
  project: WorkProject;
  onClose: () => void;
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function isYouTube(src: string) {
  return src.includes("youtube.com") || src.includes("youtu.be");
}
function isVimeo(src: string) {
  return src.includes("vimeo.com");
}
function isInstagram(src: string) {
  return src.includes("instagram.com");
}
function isEmbedVideo(src: string) {
  return isYouTube(src) || isVimeo(src) || isInstagram(src);
}

/** Converts any YouTube/Vimeo/Instagram share URL into its embeddable form. */
function toEmbedUrl(src: string): string {
  // YouTube: watch?v=ID or youtu.be/ID → /embed/ID
  if (isYouTube(src)) {
    const match = src.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    return src;
  }
  // Vimeo: vimeo.com/ID → player.vimeo.com/video/ID
  if (isVimeo(src)) {
    const match = src.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    return src;
  }
  // Instagram: /reel/CODE/ or /p/CODE/ → /reel/CODE/embed/
  if (isInstagram(src)) {
    const match = src.match(/instagram\.com\/(reel|p)\/([^/?]+)/);
    if (match) return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
    return src;
  }
  return src;
}

function getYouTubeThumbnail(src: string): string {
  const match = src.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : "";
}

/** Platform label for branded placeholders in the grid */
function getPlatformLabel(src: string) {
  if (isYouTube(src))   return { label: "YouTube",   color: "#FF0000", bg: "linear-gradient(135deg,#1a0000,#3d0000)" };
  if (isVimeo(src))     return { label: "Vimeo",     color: "#1AB7EA", bg: "linear-gradient(135deg,#001020,#00243d)" };
  if (isInstagram(src)) return { label: "Instagram", color: "#E1306C", bg: "linear-gradient(135deg,#405DE6,#5851DB,#833AB4,#C13584,#E1306C,#FD1D1D)" };
  return null;
}

/**
 * Converts a local public-folder path like "/videos/file.mp4" into the full
 * path including Vite's base URL (e.g. "/react-portfolio/videos/file.mp4").
 * Full http/https URLs are returned unchanged.
 */
function resolveVideoSrc(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  // Strip trailing slash from base so we don't get double slashes
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return base + src;
}


/* ── Component ────────────────────────────────────────────────────── */

const WorkGallery = ({ project, onClose }: WorkGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  /* No body scroll lock needed — the gallery is position:fixed and already covers the
     full viewport. Modifying body.style.overflow or position disrupts GSAP's internal
     scroll-position tracking and causes the Work pin to freeze after closing.
     Instead, we rely on overscroll-behavior:contain on the backdrop (set in CSS)
     to stop wheel events from chaining through to the underlying page. */

  /* Keyboard nav */
  const closeAll = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex(null);
    else onClose();
  }, [lightboxIndex, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i! + 1) % project.gallery.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (i) => (i! - 1 + project.gallery.length) % project.gallery.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll, lightboxIndex, project.gallery.length]);

  /* ── Grid item ── */
  const renderGridItem = (item: MediaItem, idx: number) => {
    const isVid = item.type === "video";
    const ytThumb = isVid && isYouTube(item.src) ? getYouTubeThumbnail(item.src) : "";
    const thumb = item.poster || ytThumb;
    const platform = isVid ? getPlatformLabel(item.src) : null;

    return (
      <div
        className={`gallery-grid-item${isVid ? " gallery-grid-item--video" : ""}`}
        key={idx}
        onClick={() => setLightboxIndex(idx)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(idx)}
      >
        {isVid ? (
          thumb ? (
            <img src={thumb} alt={item.caption || `Video ${idx + 1}`} />
          ) : platform ? (
            /* Branded placeholder when no thumbnail is available (Instagram, Vimeo) */
            <div
              className="gallery-grid-placeholder"
              style={{ background: platform.bg }}
            >
              <span style={{ color: platform.color }}>{platform.label}</span>
            </div>
          ) : (
            <video src={resolveVideoSrc(item.src)} preload="metadata" playsInline muted />
          )
        ) : (
          <img src={item.src} alt={item.caption || `${project.title} ${idx + 1}`} />
        )}
        <div className="gallery-grid-overlay" />
        {isVid && (
          <div className="gallery-play-badge">
            <MdPlayArrow />
          </div>
        )}
      </div>
    );
  };

  /* ── Lightbox media ── */
  const renderLightboxMedia = (item: MediaItem) => {
    if (item.type === "image") {
      return (
        <img src={item.src} alt={item.caption || ""} className="lb-media" />
      );
    }
    // Any embed platform (YouTube, Vimeo, Instagram) — convert share URL → embed URL first
    if (isEmbedVideo(item.src)) {
      return (
        <iframe
          className="lb-media lb-media--iframe"
          src={toEmbedUrl(item.src)}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={item.caption || "Video"}
        />
      );
    }
    // Local video file (.mp4 etc.) — resolve base URL for public-folder paths
    return (
      <video
        className="lb-media"
        src={resolveVideoSrc(item.src)}
        controls
        playsInline
        poster={item.poster}
      />
    );
  };

  const currentItem =
    lightboxIndex !== null ? project.gallery[lightboxIndex] : null;

  return (
    <>
      {/* ── Gallery modal ── */}
      <div
        className="gallery-backdrop"
        ref={backdropRef}
        onClick={onClose}
      >
        <div
          className="gallery-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="gallery-header">
            <div className="gallery-header-info">
              <span className="gallery-num">{project.num}</span>
              <div>
                <h3 className="gallery-title">{project.title}</h3>
                <p className="gallery-category">{project.category}</p>
              </div>
            </div>
            <button
              className="gallery-close-btn"
              onClick={onClose}
              aria-label="Close gallery"
            >
              <MdClose />
            </button>
          </div>

          {/* Tools tag */}
          <div className="gallery-tools-bar">
            <span>{project.tools}</span>
          </div>

          {/* 3-column grid */}
          <div className="gallery-grid">
            {project.gallery.map((item, idx) => renderGridItem(item, idx))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {currentItem && (
        <div
          className="gallery-lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="gallery-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="lb-close-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <MdClose />
            </button>

            {/* Counter */}
            <div className="lb-counter">
              {lightboxIndex! + 1} / {project.gallery.length}
            </div>

            {/* Media */}
            <div className="lb-media-wrapper">
              {renderLightboxMedia(currentItem)}
            </div>

            {/* Caption */}
            {currentItem.caption && (
              <p className="lb-caption">{currentItem.caption}</p>
            )}

            {/* Prev / Next */}
            {project.gallery.length > 1 && (
              <>
                <button
                  className="lb-nav lb-nav--prev"
                  onClick={() =>
                    setLightboxIndex(
                      (i) =>
                        (i! - 1 + project.gallery.length) %
                        project.gallery.length
                    )
                  }
                  aria-label="Previous"
                >
                  <MdChevronLeft />
                </button>
                <button
                  className="lb-nav lb-nav--next"
                  onClick={() =>
                    setLightboxIndex(
                      (i) => (i! + 1) % project.gallery.length
                    )
                  }
                  aria-label="Next"
                >
                  <MdChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkGallery;
