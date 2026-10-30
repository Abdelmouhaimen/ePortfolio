import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { chapters, projects, experience, skillGroups } from "./data";
import portrait from "../src/Assets/homePicture.png";
import "./style.css";

const Arrow = ({ diagonal = false }) => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} />
  </svg>
);
const Mark = () => (
  <svg
    aria-hidden="true"
    width="35"
    height="35"
    viewBox="0 0 48 48"
    fill="none"
  >
    <ellipse
      cx="24"
      cy="24"
      rx="19"
      ry="8"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(-45 24 24)"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="19"
      ry="8"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(45 24 24)"
    />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
  </svg>
);
const External = ({ href, children, className = "" }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
    <Arrow diagonal />
  </a>
);

function useMotionPreference() {
  const [reduced, setReduced] = useState(() => {
    try {
      const value = localStorage.getItem("portfolio-motion");
      if (value) return value === "off";
    } catch {
      /* Storage may be disabled. */
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = (event) => {
      try {
        if (localStorage.getItem("portfolio-motion")) return;
      } catch {
        /* Use OS preference. */
      }
      setReduced(event.matches);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "off" : "on";
  }, [reduced]);
  const toggle = () =>
    setReduced((previous) => {
      try {
        localStorage.setItem("portfolio-motion", previous ? "on" : "off");
      } catch {
        /* In-memory preference still works. */
      }
      return !previous;
    });
  return [reduced, toggle];
}

function Scene({ state }) {
  const canvas = useRef(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    let cancelled = false,
      destroy;
    const start = async () => {
      try {
        const { createExperience } = await import("./scene");
        if (!cancelled)
          destroy = createExperience(
            canvas.current,
            state,
            () => setStatus("ready"),
            () => setStatus("fallback"),
          );
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    };
    start();
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [state]);
  return (
    <div className={`scene scene--${status}`}>
      <div className="scene-fallback" aria-hidden="true">
        <div className="fallback-orbit one" />
        <div className="fallback-orbit two" />
        <div className="fallback-core" />
        <span>PERCEPTION / INTELLIGENCE / ACTION</span>
      </div>
      <canvas ref={canvas} aria-hidden="true" data-testid="experience-canvas" />
      {status === "fallback" && (
        <p className="render-note">
          Sculptural view · 3D unavailable on this device
        </p>
      )}
    </div>
  );
}

function ProjectArt({ kind, image, title }) {
  if (image)
    return (
      <div className="project-art project-art--image">
        <img
          src={image}
          alt={`${title} project preview`}
          width="800"
          height="500"
          loading="lazy"
        />
      </div>
    );
  if (kind === "spatial")
    return (
      <div className="project-art art-spatial" aria-hidden="true">
        <div className="map-floor">
          <div className="map-room r1" />
          <div className="map-room r2" />
          <div className="map-room r3" />
          <div className="vision-cone c1" />
          <div className="vision-cone c2" />
          {Array.from({ length: 6 }, (_, i) => (
            <i className={`map-person p${i}`} key={i} />
          ))}
        </div>
        <span className="art-tag">CAMERAS → STRUCTURED SPACE</span>
        <span className="art-index">M/S</span>
      </div>
    );
  if (kind === "voice")
    return (
      <div className="project-art art-voice" aria-hidden="true">
        <div className="voice-orb" />
        <div className="voice-bars">
          {Array.from({ length: 43 }, (_, i) => (
            <i
              key={i}
              style={{
                "--h": `${14 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.35)) * 90}px`,
                "--i": i,
              }}
            />
          ))}
        </div>
        <span className="art-tag">LISTEN. UNDERSTAND. ACT.</span>
        <span className="art-index">sotiby</span>
      </div>
    );
  if (kind === "learning")
    return (
      <div className="project-art art-learning" aria-hidden="true">
        <div className="scene-grid" />
        <div className="person-shape">
          <i />
          <b />
        </div>
        <div className="detect-box">
          <span>PEDESTRIAN / CONTEXT</span>
          <i className="crosshair" />
        </div>
        <div className="detect-context" />
        <span className="art-tag">BEHAVIOUR-AWARE PERCEPTION</span>
      </div>
    );
  return (
    <div className={`project-art art-generic art-${kind}`} aria-hidden="true">
      <div className="generic-orbit" />
      <div className="generic-orbit orbit-b" />
      <div className="generic-object" />
      {kind === "product" && (
        <div className="mini-phone">
          <i />
          <i />
          <i />
        </div>
      )}
      <span className="art-tag">
        {kind === "research"
          ? "COMPRESS / COMPUTE / MEASURE"
          : kind === "satellite"
            ? "EARTH / OBSERVATION"
            : kind === "robot"
              ? "THE PHYSICAL AI WORKBENCH"
              : kind === "polymer"
                ? "DATA / MATERIALS / MODELS"
                : kind === "clinical"
                  ? "DOCUMENTS / CONTEXT / RETRIEVAL"
                  : "BUILD / LEARN / ITERATE"}
      </span>
    </div>
  );
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!project) return;
    const el = dialog.current;
    const opener = document.activeElement;
    el.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [project]);
  if (!project) return null;
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <ProjectArt
          kind={project.visual}
          image={project.image}
          title={project.title}
        />
        <div className="dialog-copy">
          <span className="eyebrow">{project.type}</span>
          <h2 id="project-title">{project.title}</h2>
          <p className="dialog-summary">{project.summary}</p>
          <div className="project-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h3>The question</h3>
          <p>{project.problem}</p>
          <h3>The work</h3>
          <p>{project.approach}</p>
          <p className="project-note">{project.note}</p>
          <div className="dialog-links">
            {project.links.map((link) => (
              <External
                key={link.url}
                href={link.url}
                className="button button-dark"
              >
                {link.label}
              </External>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

function App() {
  const [reduced, toggleMotion] = useMotionPreference();
  const [menu, setMenu] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [exploded, setExploded] = useState(null);
  const [xray, setXray] = useState(false);
  const initialParams = new URLSearchParams(location.search);
  const allowedFilters = [
    "All work",
    "Vision",
    "Agents",
    "Geometry",
    "Products",
    "Research",
  ];
  const [filter, setFilter] = useState(
    allowedFilters.includes(initialParams.get("filter"))
      ? initialParams.get("filter")
      : "All work",
  );
  const [selected, setSelected] = useState(
    projects.find((project) => project.id === initialParams.get("project")) ||
      null,
  );
  const journey = useRef(null);
  const stage = useRef(null);
  const state = useRef({
    reduced,
    progress: 0,
    pointer: { x: 0, y: 0 },
    exploded,
    xray,
  });
  const [scrolled, setScrolled] = useState(false);
  state.current.reduced = reduced;
  state.current.exploded = exploded;
  state.current.xray = xray;

  useEffect(() => {
    let frame = 0,
      chapter = 0,
      stops = [],
      needsMeasurement = true;
    const update = () => {
      frame = 0;
      const rect = journey.current.getBoundingClientRect();
      const height = stage.current.clientHeight;
      if (needsMeasurement) {
        stops = [...journey.current.querySelectorAll(".chapter")].map(
          (element) => element.offsetTop,
        );
        needsMeasurement = false;
      }
      const position = Math.max(0, -rect.top);
      let index = 0;
      while (index < 4 && position >= stops[index + 1]) index++;
      const interval =
        (stops[index + 1] || stops[index] + height) - stops[index];
      const progress = Math.max(
        0,
        Math.min(4, index + (position - stops[index]) / interval),
      );
      state.current.progress = progress;
      stage.current.style.setProperty(
        "--journey-progress",
        `${(progress / 4) * 100}%`,
      );
      const next = Math.round(progress);
      if (chapter !== next) {
        chapter = next;
        setActiveChapter(next);
      }
      setScrolled(window.scrollY > 100);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      needsMeasurement = true;
      queue();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(journey.current);
    const pointer = (event) => {
      state.current.pointer = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    const leave = () => {
      state.current.pointer = { x: 0, y: 0 };
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", pointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(location.search);
      setSelected(
        projects.find((project) => project.id === params.get("project")) ||
          null,
      );
      setFilter(
        allowedFilters.includes(params.get("filter"))
          ? params.get("filter")
          : "All work",
      );
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  const updateUrl = (key, value, push = false) => {
    const url = new URL(location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    history[push ? "pushState" : "replaceState"]({}, "", url);
  };
  const showProject = (project) => {
    setSelected(project);
    updateUrl("project", project.id, true);
  };
  const closeProject = () => {
    setSelected(null);
    updateUrl("project", null);
  };
  const setProjectFilter = (next) => {
    setFilter(next);
    updateUrl("filter", next === "All work" ? null : next);
  };
  const navigate = () => setMenu(false);
  const featured = projects.filter((project) => project.featured);
  const filtered = projects.filter(
    (project) => filter === "All work" || project.category.includes(filter),
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          href="#intro"
          className="brand"
          aria-label="Abdelmouhaimen Sarhane, home"
        >
          <Mark />
          <span>
            abdelmouhaimen
            <span className="brand-sub">SARHANE / ENGINEER & BUILDER</span>
          </span>
        </a>
        <nav
          className={`main-nav ${menu ? "is-open" : ""}`}
          aria-label="Main navigation"
          id="main-nav"
        >
          <a href="#work" onClick={navigate}>
            Selected work <span>04</span>
          </a>
          <a href="#experience" onClick={navigate}>
            Experience
          </a>
          <a href="#about" onClick={navigate}>
            About
          </a>
          <a href="/legacy/" onClick={navigate}>
            Original site <Arrow diagonal />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="motion-toggle"
            onClick={toggleMotion}
            aria-pressed={!reduced}
            aria-label={reduced ? "Enable animations" : "Pause animations"}
          >
            <span aria-hidden="true">{reduced ? "▷" : "Ⅱ"}</span>
            <span className="motion-label">
              Motion {reduced ? "off" : "on"}
            </span>
          </button>
          <a className="contact-pill" href="#contact">
            Let’s talk <Arrow diagonal />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="main-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? (
              "×"
            ) : (
              <>
                <i />
                <i />
              </>
            )}
          </button>
        </div>
      </header>

      <main id="main">
        <div className="journey" ref={journey}>
          <div
            className="journey-stage"
            ref={stage}
            data-chapter={activeChapter}
          >
            <div className="atmosphere" aria-hidden="true">
              <div className="color-field field-pink" />
              <div className="color-field field-blue" />
              <div className="color-field field-white" />
              <div className="fluted-glass" />
              <div className="film-grain" />
            </div>
            <Scene state={state} />
            <div className="stage-topline">
              <span>
                <i className="status-dot" /> BASED IN PARIS, FRANCE
              </span>
              <span>COMPUTER VISION × REAL-WORLD AI</span>
            </div>
            <div className="scene-coordinate" aria-hidden="true">
              <span>+ 48.8566° N</span>
              <span>02.3522° E +</span>
            </div>
            <div className="scene-caption">
              <span className="cross-icon">+</span>
              <div>
                <span className="eyebrow">
                  {
                    [
                      "CONCEPT / AUTONOMOUS PERCEPTION",
                      "ASSEMBLY / PERCEPTION STACK",
                      "SCENE / SHARED SPATIAL STATE",
                      "MODEL / CONNECTED REPRESENTATIONS",
                      "SIGNAL / CONVERSATION TO ACTION",
                    ][activeChapter]
                  }
                </span>
                <span className="caption-sub">
                  {
                    [
                      "A study in seeing the world differently.",
                      "Separate the layers. Understand the system.",
                      "An illustrative multi-camera environment.",
                      "A visual metaphor for learning.",
                      "An illustrative voice signal. No microphone needed.",
                    ][activeChapter]
                  }
                </span>
              </div>
            </div>
            <nav className="chapter-nav" aria-label="Explore the 3D chapters">
              {chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={activeChapter === index ? "step" : undefined}
                >
                  <span className="chapter-number">0{index}</span>
                  <span>{chapter.short}</span>
                  <i />
                </a>
              ))}
            </nav>
            <div className="journey-line" aria-hidden="true">
              <i />
            </div>
          </div>
          <div className="chapters">
            {chapters.map((chapter, index) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className={`chapter chapter-${index}`}
                aria-labelledby={`${chapter.id}-title`}
              >
                <div className="chapter-copy">
                  <p className="eyebrow chapter-eyebrow">
                    <span className="tiny-cross">✳</span>
                    {chapter.label}
                  </p>
                  <h1
                    hidden={index !== 0}
                    id={index === 0 ? `${chapter.id}-title` : undefined}
                  >
                    {index === 0 && (
                      <>
                        {chapter.title}
                        <br />
                        <em>{chapter.accent}</em>
                      </>
                    )}
                  </h1>
                  {index > 0 && (
                    <h2 id={`${chapter.id}-title`}>
                      {chapter.title}
                      <br />
                      <em>{chapter.accent}</em>
                    </h2>
                  )}
                  <p className="chapter-description">{chapter.subtitle}</p>
                  {index === 0 ? (
                    <div className="hero-actions">
                      <a href="#work" className="button button-white">
                        Explore my work <Arrow />
                      </a>
                      <a
                        href="/files/Abdelmouhaimen-Sarhane-CV.pdf"
                        className="text-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read my CV <Arrow diagonal />
                      </a>
                    </div>
                  ) : index === 1 ? (
                    <div className="scene-controls">
                      <button
                        className={`glass-button ${exploded !== false ? "selected" : ""}`}
                        aria-pressed={exploded !== false}
                        onClick={() =>
                          setExploded((previous) => !(previous ?? true))
                        }
                      >
                        {exploded !== false ? "Assemble view" : "Explode view"}
                        <span aria-hidden="true">↗</span>
                      </button>
                      <button
                        className={`glass-button ${xray ? "selected" : ""}`}
                        aria-pressed={xray}
                        onClick={() => setXray(!xray)}
                      >
                        Transparent shell <span aria-hidden="true">◈</span>
                      </button>
                      <a className="text-link" href="#experience">
                        My experience <Arrow />
                      </a>
                    </div>
                  ) : (
                    <button
                      className="text-link"
                      onClick={() =>
                        showProject(
                          projects.find(
                            (project) =>
                              project.id ===
                              (index === 2
                                ? "manysight"
                                : index === 3
                                  ? "pedestrian"
                                  : "sotiby"),
                          ),
                        )
                      }
                    >
                      Inside the project <Arrow diagonal />
                    </button>
                  )}
                  <div className="chapter-tags">
                    {chapter.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                {index === 0 && (
                  <aside className="hero-note">
                    <div className="note-icon">
                      <svg
                        aria-hidden="true"
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="m3 8 9-5 9 5v9l-9 5-9-5V8Z M3 8l9 5 9-5 M12 13v9" />
                      </svg>
                    </div>
                    <span className="eyebrow">CURRENTLY</span>
                    <strong>
                      Engineering
                      <br />
                      perception at Parrot.
                    </strong>
                    <div className="note-divider" />
                    <span className="eyebrow">BUILDING INDEPENDENTLY</span>
                    <p>
                      ManySight <span>↗</span>
                      <br />
                      Sotiby <span>↗</span>
                    </p>
                  </aside>
                )}
                {index === 0 && (
                  <a href="#physical-ai" className="scroll-cue">
                    <span className="scroll-icon">
                      <i />
                    </span>
                    Scroll to change perspective <span>↓</span>
                  </a>
                )}
              </section>
            ))}
          </div>
        </div>

        <section
          className="work-section section-pad"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="tiny-cross">✳</span> SELECTED WORK / 01—04
              </p>
              <h2 id="work-title">
                Ideas made <em>tangible.</em>
              </h2>
            </div>
            <p>
              Different problems. The same instinct:
              <br />
              understand it, build it, test it in the world.
            </p>
          </div>
          <div className="featured-grid">
            {featured.map((project, index) => (
              <button
                key={project.id}
                className={`featured-card featured-card-${index}`}
                onClick={() => showProject(project)}
                aria-label={`Read case study: ${project.title}`}
              >
                <ProjectArt
                  kind={project.visual}
                  image={project.image}
                  title={project.title}
                />
                <div className="featured-copy">
                  <span className="eyebrow">
                    0{index + 1} / {project.kicker}
                  </span>
                  <div className="featured-title">
                    <h3>{project.title}</h3>
                    <span className="round-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <p>{project.summary}</p>
                  <div className="project-tags">
                    {project.stack.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="all-work-heading">
            <h3>The wider field.</h3>
            <span>A living collection of projects & experiments</span>
          </div>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {allowedFilters.map((item) => (
              <button
                key={item}
                onClick={() => setProjectFilter(item)}
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
              >
                {item}
                <span>
                  {item === "All work"
                    ? projects.length
                    : projects.filter((project) =>
                        project.category.includes(item),
                      ).length}
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {filtered.length} projects
          </p>
          <div className="project-list">
            {filtered.map((project, index) => (
              <button
                key={project.id}
                onClick={() => showProject(project)}
                className="project-row"
              >
                <span className="row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="row-name">
                  <strong>{project.title}</strong>
                  <span>{project.type}</span>
                </span>
                <span className="row-category">
                  {project.category.join(" / ")}
                </span>
                <Arrow diagonal />
              </button>
            ))}
          </div>
        </section>

        <section
          className="experience-section section-pad"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="tiny-cross">✳</span> THE PATH SO FAR
              </p>
              <h2 id="experience-title">
                Learning by
                <br />
                <em>doing the work.</em>
              </h2>
            </div>
            <a
              href="/files/Abdelmouhaimen-Sarhane-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              Full CV <Arrow diagonal />
            </a>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item" key={item.company}>
                <div className="timeline-date">
                  <i className={index === 0 ? "is-current" : ""} />
                  <span>{item.date}</span>
                </div>
                <div className="timeline-company">
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <div className="timeline-detail">
                  <p>{item.detail}</p>
                  <div className="project-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="education-strip">
            <span className="eyebrow">EDUCATION</span>
            <div>
              <h3>Toulouse INP — ENSEEIHT</h3>
              <p>
                Engineering degree · Informatique et Télécommunications
                <br />
                Image & Multimedia specialisation · 2022–2025
              </p>
            </div>
            <div>
              <h3>ENS Paris-Saclay</h3>
              <p>
                MVA — Mathematics, Vision, Learning
                <br />
                Listed studies, 2025–2026
              </p>
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-top">
            <div className="about-image">
              <img
                src={portrait}
                alt="Abdelmouhaimen Sarhane"
                width="600"
                height="700"
                loading="lazy"
              />
              <div className="portrait-caption">
                <span>ABDELMOUHAIMEN SARHANE</span>
                <span>ENGINEER. BUILDER. CURIOUS HUMAN.</span>
              </div>
              <span className="image-corner tl" />
              <span className="image-corner br" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">
                <span className="tiny-cross">✳</span> THE PERSON BEHIND THE
                PROJECTS
              </p>
              <h2 id="about-title">
                Curiosity is
                <br />
                <em>the starting point.</em>
              </h2>
              <p className="about-lead">
                “How far could I get with this tonight?”
              </p>
              <p>
                That question starts a lot of my projects. I like unfamiliar
                domains, finding the pattern in a messy problem, and turning an
                idea into something I can test.
              </p>
              <p>
                I’m a computer vision and embedded deep learning engineer at
                Parrot, based in Paris. My work spans perception, geometric
                reasoning, and applied ML. Outside work, I build ManySight,
                co-build Sotiby, and explore the physical side of AI.
              </p>
              <p>
                I care about useful systems and honest experiments. A good
                result matters more when you understand why it works — and where
                it doesn’t.
              </p>
              <div className="about-links">
                <External href="https://github.com/Abdelmouhaimen">
                  GitHub
                </External>
                <External href="https://www.linkedin.com/in/Abdelmouhaimen">
                  LinkedIn
                </External>
              </div>
            </div>
          </div>
          <div className="skills-heading">
            <p className="eyebrow">MY TOOLBOX</p>
            <p>Tools change. The engineering questions stay interesting.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <div className="skill-group" key={group.title}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </div>
            ))}
          </div>
          <div className="publication">
            <span className="publication-mark">↗</span>
            <div>
              <p className="eyebrow">CO-AUTHORED / ICT4S 2024</p>
              <h3>
                Energy Efficient Matrix Computations
                <br />
                Through Homomorphic Compression
              </h3>
              <p>Matthieu Martel · Célia Picard · Abdelmouhaimen Sarhane</p>
            </div>
            <External
              href="https://doi.org/10.1109/ICT4S64576.2024.00020"
              className="text-link"
            >
              Read the paper
            </External>
          </div>
          <div className="personal-note">
            <span className="eyebrow">AWAY FROM THE TERMINAL</span>
            <p>Travel, games, science, and the next thing to figure out.</p>
            <a href="/legacy/">
              Visit the original portfolio <Arrow diagonal />
            </a>
          </div>
        </section>

        <section
          className="contact-section section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-orbit" aria-hidden="true">
            <Mark />
          </div>
          <p className="eyebrow">HAVE AN INTERESTING PROBLEM?</p>
          <h2 id="contact-title">
            Let’s make
            <br />
            <em>something real.</em>
          </h2>
          <p>
            Perception, physical AI, agents, or an idea
            <br />
            that doesn’t quite fit into a category.
          </p>
          <a
            className="button button-white"
            href="mailto:abdo-sarhane@hotmail.com"
          >
            Start a conversation <Arrow diagonal />
          </a>
          <div className="contact-social">
            <External href="https://www.linkedin.com/in/Abdelmouhaimen">
              LinkedIn
            </External>
            <External href="https://github.com/Abdelmouhaimen">GitHub</External>
            <a
              href="/files/Abdelmouhaimen-Sarhane-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#intro">
          <Mark /> Abdelmouhaimen Sarhane
        </a>
        <span>PARIS, FRANCE · © {new Date().getFullYear()}</span>
        <a href="/legacy/">
          Original portfolio <Arrow diagonal />
        </a>
        <a href="#intro">Back to the top ↑</a>
      </footer>
      <ProjectDialog project={selected} onClose={closeProject} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
