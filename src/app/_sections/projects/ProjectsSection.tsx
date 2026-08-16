
"use client";

import "./projects.css";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  status: string;
  statusType: "live" | "development" | "archive";
  type: string;
  metric: string;
  metricLabel: string;
  href?: string;
  external?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "GUIDEIN",
    category: "AI CAREER INTELLIGENCE",
    year: "2026",
    description:
      "An AI-powered career guidance system designed to help users understand their skills, explore career paths and interact with an intelligent guidance layer , developed in 2024 later I updated it and turned it into a full stack project by making a UI for.",
    stack: ["JAVA", "GEMINI API", "MAVEN", "JACKSON" , "SPRING BOOT" , "TYPESCRIPT"],
    status: "ACTIVE DEVELOPMENT",
    statusType: "development",
    type: "PERSONAL PROJECT",
    metric: "AI",
    metricLabel: "CORE SYSTEM",
  },
  {
    number: "02",
    title: "SENTINEL",
    category: "INCIDENT INTELLIGENCE",
    year: "2026",
    description:
      "An intelligent software engineering platform focused on understanding incidents, retrieving contextual information and assisting developers during diagnosis.",
    stack: ["AI", "RAG", "LLM", "NLP" , "POSTMAN" , "GEMINI API"],
    status: "IN DEVELOPMENT",
    statusType: "development",
    type: "AI SYSTEM",
    metric: "RAG",
    metricLabel: "INTELLIGENCE",
  },
  {
    number: "03",
    title: "IDENTITY",
    category: "AI × SOFTWARE ENGINEERING × FRONTEND",
    year: "2026",
    description:
      "The portfolio system you're currently viewing built from scratch bit by bit (Replaced the original vercel files). A deliberately engineered digital identity combining interaction design, frontend architecture, animation and software engineering.",
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "CSS"],
    status: "LIVE",
    statusType: "live",
    type: "CURRENT WEBSITE",
    metric: "LIVE",
    metricLabel: "SYSTEM",
  },
  {
    number: "04",
    title: "OCR AUTOMATION",
    category: "DOCUMENT INTELLIGENCE",
    year: "2026",
    description:
      "A privacy-focused document processing workflow built around local OCR, structured extraction and automation for identity-document processing, to keep the customer's data private I Implemented it as an ELECTRON offline application.",
    stack: ["TYPESCRIPT", "TESSERACT.JS", "OCR", "NODE.JS" , "ELECTRON"],
    status: "PROTOTYPE",
    statusType: "development",
    type: "INTERNSHIP PROJECT",
    metric: "LOCAL",
    metricLabel: "PROCESSING",
  },
  {
    number: "05",
    title: "DSA LAB",
    category: "ALGORITHMIC ENGINEERING",
    year: "2026",
    description:
      "A growing collection of algorithmic implementations and problem-solving experiments used to strengthen data structures and competitive programming fundamentals.",
    stack: ["C++", "PYTHON", "JAVA", "ALGORITHMS"],
    status: "CONTINUOUS",
    statusType: "archive",
    type: "LEARNING SYSTEM",
    metric: "100+",
    metricLabel: "PROBLEMS",
  },
];

function ProjectVisual({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className={`project-visual ${
        active ? "project-visual-active" : ""
      }`}
      aria-hidden="true"
    >
      <div className="project-visual-noise" />
      <div className="project-visual-grid" />

      <div className="project-visual-orbit project-visual-orbit-one" />
      <div className="project-visual-orbit project-visual-orbit-two" />
      <div className="project-visual-orbit project-visual-orbit-three" />

      <div className="project-visual-core">
        <span>{project.number}</span>
      </div>

      <div className="project-visual-lines">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="project-visual-coordinates">
        <span>
          SYS.{String(index + 1).padStart(2, "0")}
        </span>

        <span>{project.year}</span>
      </div>

      <div className="project-visual-title">
        {project.title}
      </div>
    </div>
  );
}

function StatusIndicator({
  type,
}: {
  type: Project["statusType"];
}) {
  return (
    <span
      className={`project-status-indicator project-status-${type}`}
    >
      <i />
    </span>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(
    null,
  );

  /*
   * Pointer animation refs.
   *
   * These deliberately live outside React state.
   * Updating React on every pointer event was one of
   * the main causes of the low-FPS feeling.
   */
  const pointerFrame = useRef<number | null>(null);
  const pointerTarget = useRef<HTMLElement | null>(null);

 const active = projects[activeProject]!;
  /*
   * SECTION VISIBILITY
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
  if (!entry) return;

  if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /*
   * SCROLL PROGRESS
   *
   * requestAnimationFrame prevents multiple expensive
   * state updates from happening during one browser frame.
   */
  useEffect(() => {
    let frame: number | null = null;

    const updateScroll = () => {
      frame = null;

      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const total = rect.height + viewportHeight;

      const progress =
        (viewportHeight - rect.top) / total;

      const clamped = Math.max(
        0,
        Math.min(1, progress),
      );

      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(
        updateScroll,
      );
    };

    updateScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  /*
   * ACTIVE PROJECT
   */
  const activateProject = useCallback(
    (index: number) => {
      setActiveProject((current) =>
        current === index ? current : index,
      );
    },
    [],
  );

  /*
   * GPU-FRIENDLY POINTER TILT
   *
   * No React state is changed here.
   *
   * The browser only receives transform variables once
   * per animation frame.
   */
  const handleProjectPointerMove = (
    event: React.PointerEvent<HTMLElement>,
    index: number,
  ) => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    const element = event.currentTarget;

    pointerTarget.current = element;

    const rect = element.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width -
        0.5) *
      2;

    const y =
      ((event.clientY - rect.top) /
        rect.height -
        0.5) *
      2;

    const rotateX = y * -1.5;
    const rotateY = x * 1.5;

    if (pointerFrame.current !== null) {
      return;
    }

    pointerFrame.current =
      window.requestAnimationFrame(() => {
        pointerFrame.current = null;

        const target = pointerTarget.current;

        if (!target) return;

        target.style.setProperty(
          "--project-tilt-x",
          `${rotateX}deg`,
        );

        target.style.setProperty(
          "--project-tilt-y",
          `${rotateY}deg`,
        );
      });

    setHoveredProject((current) =>
      current === index ? current : index,
    );
  };

  const resetProjectPointer = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    const element = event.currentTarget;

    if (pointerFrame.current !== null) {
      window.cancelAnimationFrame(
        pointerFrame.current,
      );

      pointerFrame.current = null;
    }

    pointerTarget.current = null;

    element.style.setProperty(
      "--project-tilt-x",
      "0deg",
    );

    element.style.setProperty(
      "--project-tilt-y",
      "0deg",
    );

    setHoveredProject(null);
  };

  /*
   * KEYBOARD NAVIGATION
   */
  const handleKeyboardNavigation = (
    event: React.KeyboardEvent,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      activateProject(
        (index + 1) % projects.length,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      activateProject(
        (index - 1 + projects.length) %
          projects.length,
      );
    }
  };

  /*
   * CLEAN UP POINTER FRAME
   */
  useEffect(() => {
    return () => {
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(
          pointerFrame.current,
        );
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={
        visible
          ? "projects-section projects-section-visible"
          : "projects-section"
      }
      style={
        {
          "--projects-scroll-progress":
            scrollProgress,
        } as React.CSSProperties
      }
    >
      <div className="projects-atmosphere" />
      <div className="projects-grid" />

      <div
        className="projects-scan"
        style={{
          transform: `translate3d(0, ${
            scrollProgress * 100
          }%, 0)`,
        }}
      />

      <div className="projects-inner">
        <header className="projects-header">
          <div className="projects-index">
            <span>04</span>
            <span>SELECTED WORK</span>
          </div>

          <div className="projects-header-line">
            <span />
          </div>

          <p className="projects-header-description">
            Systems built around artificial
            intelligence, software engineering
            and real-world problem solving.
          </p>
        </header>

        <div className="projects-introduction">
          <span className="projects-kicker">
            PROJECT ARCHIVE / 2024—2026
          </span>

          <h2>
            Things I&apos;ve
            <br />
            <span>built.</span>
          </h2>

          <div className="projects-introduction-bottom">
            <p>
              A collection of systems,
              experiments and products developed
              while exploring the intersection of
              AI and software engineering.
            </p>

            <div className="projects-counter">
              <span>
                {String(activeProject + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <i />

              <span>
                {String(projects.length).padStart(
                  2,
                  "0",
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="projects-workspace">
          <div
            className="projects-list"
            role="list"
            aria-label="Projects"
          >
            {projects.map((project, index) => {
              const isActive =
                activeProject === index;

              const isHovered =
                hoveredProject === index;

              return (
                <article
                  key={project.number}
                  role="listitem"
                  tabIndex={0}
                  className={`project-card ${
                    isActive
                      ? "project-card-active"
                      : ""
                  } ${
                    isHovered
                      ? "project-card-hovered"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    activateProject(index)
                  }
                  onFocus={() =>
                    activateProject(index)
                  }
                  onPointerMove={(event) =>
                    handleProjectPointerMove(
                      event,
                      index,
                    )
                  }
                  onPointerLeave={
                    resetProjectPointer
                  }
                  onKeyDown={(event) =>
                    handleKeyboardNavigation(
                      event,
                      index,
                    )
                  }
                >
                  <button
                    type="button"
                    className="project-card-trigger"
                    onClick={() =>
                      activateProject(index)
                    }
                    aria-expanded={isActive}
                  >
                    <span className="project-number">
                      {project.number}
                    </span>

                    <span className="project-main">
                      <span className="project-title-row">
                        <span className="project-title">
                          {project.title}
                        </span>

                        <span className="project-arrow">
                          ↗
                        </span>
                      </span>

                      <span className="project-category">
                        {project.category}
                      </span>
                    </span>

                    <span className="project-year">
                      {project.year}
                    </span>

                    <span className="project-expand">
                      <span />
                      <span />
                    </span>
                  </button>

                  <div
                    className={`project-details ${
                      isActive
                        ? "project-details-active"
                        : ""
                    }`}
                  >
                    <div className="project-details-inner">
                      <div className="project-detail-description">
                        <span className="project-detail-label">
                          OVERVIEW
                        </span>

                        <p>
                          {project.description}
                        </p>
                      </div>

                      <div className="project-stack">
                        <span className="project-detail-label">
                          TECHNOLOGY
                        </span>

                        <div className="project-tags">
                          {project.stack.map(
                            (technology) => (
                              <span
                                key={technology}
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="project-status">
                        <span className="project-detail-label">
                          STATUS
                        </span>

                        <span className="project-status-value">
                          <StatusIndicator
                            type={
                              project.statusType
                            }
                          />

                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="project-preview">
            <div className="project-preview-top">
              <span>LIVE PREVIEW</span>

              <span>{active.number}</span>
            </div>

            <ProjectVisual
              project={active}
              index={activeProject}
              active
            />

            <div className="project-preview-bottom">
              <div>
                <span className="project-preview-label">
                  TYPE
                </span>

                <strong>
                  {active.type}
                </strong>
              </div>

              <div>
                <span className="project-preview-label">
                  {active.metricLabel}
                </span>

                <strong>
                  {active.metric}
                </strong>
              </div>
            </div>

            {active.href ? (
              <Link
                href={active.href}
                className="project-preview-link"
                target={
                  active.external
                    ? "_blank"
                    : undefined
                }
                rel={
                  active.external
                    ? "noreferrer"
                    : undefined
                }
              >
                VIEW PROJECT
                <span>↗</span>
              </Link>
            ) : (
              <div className="project-preview-link project-preview-link-disabled">
                PROJECT IN DEVELOPMENT
                <span>—</span>
              </div>
            )}
          </aside>
        </div>

        <div className="projects-progress">
          <div className="projects-progress-track">
            <span
              style={{
                width: `${
                  ((activeProject + 1) /
                    projects.length) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="projects-progress-meta">
            <span>
              {String(activeProject + 1).padStart(
                2,
                "0",
              )}{" "}
              /{" "}
              {String(projects.length).padStart(
                2,
                "0",
              )}
            </span>

            <span>PROJECT INDEX</span>
          </div>
        </div>

        <footer className="projects-footer">
          <div className="projects-footer-line" />

          <div className="projects-footer-content">
            <span>
              MORE SYSTEMS IN DEVELOPMENT
            </span>

            <span>
              AI × SOFTWARE ENGINEERING
            </span>

            <span>2026</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
