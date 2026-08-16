
"use client";

import "./experience.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ExperienceType =
  | "current"
  | "independent"
  | "education"
  | "simulation";

type Experience = {
  id: string;
  number: string;
  period: string;
  year: string;
  organization: string;
  role: string;
  type: ExperienceType;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  signal: string;
  signalLabel: string;
  status: string;
  statusLabel: string;
};

const experiences: Experience[] = [
  {
    id: "idealtravel",
    number: "01",
    period: "2026 — PRESENT",
    year: "2026",
    organization: "Ideal Web Solutions",
    role: "BACKEND / AI AUTOMATION",
    type: "current",
    location: "REMOTE / INDIA",
    description:
      "Building privacy-focused document intelligence and workflow automation systems designed to reduce repetitive operational work through local processing, OCR and structured extraction.",
    technologies: [
      "TYPESCRIPT",
      "NODE.JS",
      "ELECTRON",
      "TESSERACT.JS",
      "OCR",
      "GOOGLE SHEETS",
    ],
    achievements: [
      "Local document processing",
      "OCR extraction pipeline",
      "Structured identity-data parsing",
      "Workflow automation",
    ],
    signal: "ACTIVE",
    signalLabel: "CURRENT ROLE",
    status: "ONLINE",
    statusLabel: "ACTIVE",
  },
  {
    id: "independent-systems",
    number: "02",
    period: "2024 — PRESENT",
    year: "2026",
    organization: "Personal Projects",
    role: "AI × SOFTWARE ENGINEERING",
    type: "independent",
    location: "KANPUR / INDIA",
    description:
      "Designing and engineering independent software systems around artificial intelligence, backend development, intelligent retrieval and interaction design.",
    technologies: [
      "JAVA",
      "PYTHON",
      "AI",
      "LLM",
      "RAG",
      "NLP",
      "NEXT.JS",
      "REACT",
    ],
    achievements: [
      "GuideIn AI career intelligence",
      "Sentinel incident intelligence",
      "Identity portfolio system",
      "AI-assisted engineering experiments",
    ],
    signal: "BUILD",
    signalLabel: "SYSTEMS",
    status: "EVOLVING",
    statusLabel: "IN PROGRESS",
  },
  {
    id: "education",
    number: "03",
    period: "2023 — 2027",
    year: "2027",
organization: "Maharana Pratap Group of Institutions",
    role: "B.TECH — ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    type: "education",
    location: "KANPUR / INDIA",
    description:
      "Formal engineering education focused on artificial intelligence and machine learning alongside independent development in software engineering, backend systems and applied AI.",
    technologies: [
      "MACHINE LEARNING",
      "PYTHON",
      "JAVA",
      "C++",
      "TENSORFLOW",
      "PYTORCH",
      "NLP",
      "ALGORITHMS",
    ],
    achievements: [
      "Artificial intelligence & machine learning",
      "Data structures & algorithms",
      "Software engineering fundamentals",
      "Applied AI experimentation",
    ],
    signal: "2027",
    signalLabel: "GRADUATION",
    status: "CURRENT",
    statusLabel: "STUDENT",
  },
  {
    id: "professional-simulations",
    number: "04",
    period: "2025 — 2026",
    year: "2026",
    organization: "Virtual Job Simulations",
    role: "AI / DATA / SOFTWARE",
    type: "simulation",
    location: "REMOTE",
    description:
      "Applied professional problem-solving through structured industry simulations covering analytics, business intelligence, software workflows and AI-oriented technical reasoning.",
    technologies: [
      "PYTHON",
      "TABLEAU",
      "DATA ANALYSIS",
      "AI",
      "Git",
      "OpenAI",
      "REACT",
      "Git Version Control",
      "PROBLEM SOLVING",
      "BUSINESS INTELLIGENCE",
    ],
    achievements: [
      "Tata iQ job simulation",
      "Deloitte technology simulation",
      "Data analysis workflows",
      "Business intelligence dashboarding",
    ],
    signal: "FIELD",
    signalLabel: "EXPOSURE",
    status: "ARCHIVED",
    statusLabel: "COMPLETED",
  },
];

const trajectoryPoints = [
  {
    label: "AI",
    value: "01",
  },
  {
    label: "SOFTWARE",
    value: "02",
  },
  {
    label: "BACKEND",
    value: "03",
  },
  {
    label: "SYSTEMS",
    value: "04",
  },
];

const orbitNodes = [
  {
    label: "AI",
    x: "18%",
    y: "28%",
  },
  {
    label: "BACKEND",
    x: "76%",
    y: "22%",
  },
  {
    label: "RAG",
    x: "84%",
    y: "67%",
  },
  {
    label: "SYSTEMS",
    x: "22%",
    y: "78%",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function formatProgress(value: number) {
  return `${Math.round(clamp(value) * 100)
    .toString()
    .padStart(3, "0")}%`;
}

function StatusLight({
  type,
}: {
  type: ExperienceType;
}) {
  return (
    <span
      className={`experience-status-light experience-status-light-${type}`}
      aria-hidden="true"
    >
      <i />
    </span>
  );
}

function SignalBars({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className={`experience-signal-bars ${
        active ? "experience-signal-bars-active" : ""
      }`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function OrbitField({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="experience-orbit-field" aria-hidden="true">
      <div className="experience-orbit experience-orbit-a" />
      <div className="experience-orbit experience-orbit-b" />
      <div className="experience-orbit experience-orbit-c" />

      <div className="experience-orbit-core">
        <span>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
      </div>

      {orbitNodes.map((node, index) => (
        <div
          key={node.label}
          className={`experience-orbit-node experience-orbit-node-${index + 1}`}
          style={
            {
              "--node-x": node.x,
              "--node-y": node.y,
            } as React.CSSProperties
          }
        >
          <span />
          <strong>{node.label}</strong>
        </div>
      ))}

      <div className="experience-orbit-satellite experience-orbit-satellite-one" />
      <div className="experience-orbit-satellite experience-orbit-satellite-two" />
    </div>
  );
}

function ExperienceSignal({
  experience,
  index,
  active,
}: {
  experience: Experience;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className={`experience-signal-panel ${
        active ? "experience-signal-panel-active" : ""
      }`}
    >
      <div className="experience-signal-top">
        <span>SIGNAL / {experience.number}</span>

        <StatusLight type={experience.type} />
      </div>

      <div className="experience-signal-main">
        <strong>{experience.signal}</strong>

        <span>{experience.signalLabel}</span>
      </div>

      <div className="experience-signal-bars-wrap">
        <SignalBars active={active} />

        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(experiences.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function ExperienceCard({
  experience,
  index,
  active,
  onActivate,
}: {
  experience: Experience;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const normalizedX =
      (event.clientX - rect.left) / rect.width - 0.5;

    const normalizedY =
      (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty(
      "--experience-tilt-x",
      `${normalizedY * -1.5}deg`,
    );

    card.style.setProperty(
      "--experience-tilt-y",
      `${normalizedX * 1.5}deg`,
    );

    card.style.setProperty(
      "--experience-pointer-x",
      `${(normalizedX + 0.5) * 100}%`,
    );

    card.style.setProperty(
      "--experience-pointer-y",
      `${(normalizedY + 0.5) * 100}%`,
    );
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty(
      "--experience-tilt-x",
      "0deg",
    );

    card.style.setProperty(
      "--experience-tilt-y",
      "0deg",
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onActivate(index);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`experience-card ${
        active ? "experience-card-active" : ""
      }`}
      data-index={experience.number}
      tabIndex={0}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-current={active ? "true" : undefined}
    >
      <div className="experience-card-glow" />

      <div className="experience-card-header">
        <div className="experience-card-number">
          <span>{experience.number}</span>

          <i />
        </div>

        <div className="experience-card-period">
          {experience.period}
        </div>

        <div className="experience-card-status">
          <StatusLight type={experience.type} />

          <span>{experience.status}</span>
        </div>
      </div>

      <div className="experience-card-body">
        <div className="experience-card-primary">
          <span className="experience-card-kicker">
            {experience.type.toUpperCase()} /{" "}
            {experience.year}
          </span>

          <h3>{experience.organization}</h3>

          <div className="experience-card-role">
            {experience.role}
          </div>

          <div className="experience-card-location">
            <span>LOC.</span>

            <span>{experience.location}</span>
          </div>
        </div>

        <div className="experience-card-description">
          <span className="experience-micro-label">
            SYSTEM OVERVIEW
          </span>

          <p>{experience.description}</p>
        </div>
      </div>

      <div className="experience-card-footer">
        <div className="experience-card-stack">
          <span className="experience-micro-label">
            TECHNOLOGY
          </span>

          <div className="experience-card-tags">
            {experience.technologies.map(
              (technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="experience-card-achievements">
          <span className="experience-micro-label">
            SIGNALS
          </span>

          <div>
            {experience.achievements
              .slice(0, 3)
              .map((achievement) => (
                <span key={achievement}>
                  <i />
                  {achievement}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="experience-card-corner experience-card-corner-tl" />
      <div className="experience-card-corner experience-card-corner-tr" />
      <div className="experience-card-corner experience-card-corner-bl" />
      <div className="experience-card-corner experience-card-corner-br" />
    </article>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({
    x: 50,
    y: 50,
  });

  const activeExperience =
    experiences[activeIndex];

  const currentYear = useMemo(
    () => new Date().getFullYear(),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;

      if (!section) {
        frame = 0;
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const distance =
        rect.height - viewportHeight;

      const raw =
        distance <= 0
          ? rect.top <= 0
            ? 1
            : 0
          : -rect.top / distance;

      setScrollProgress(clamp(raw));

      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(
        update,
      );
    };

    update();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
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

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const timeline =
      timelineRef.current;

    if (!timeline) return;

    const cards = Array.from(
      timeline.querySelectorAll<HTMLElement>(
        ".experience-card",
      ),
    );

    if (!cards.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleCards =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio,
              );

          if (!visibleCards.length) return;

          const index =
            cards.indexOf(
              visibleCards[0]
                .target as HTMLElement,
            );

          if (index >= 0) {
            setActiveIndex(index);
          }
        },
        {
          threshold: [
            0.2,
            0.4,
            0.6,
            0.8,
        ],
          rootMargin:
            "-18% 0px -35% 0px",
        },
      );

    cards.forEach((card) =>
      observer.observe(card),
    );

    return () => observer.disconnect();
  }, []);

  const activateExperience =
    useCallback((index: number) => {
      if (
        index < 0 ||
        index >= experiences.length
      ) {
        return;
      }

      setActiveIndex(index);
    }, []);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    const section =
      sectionRef.current;

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    setPointer({
      x:
        ((event.clientX - rect.left) /
          rect.width) *
        100,
      y:
        ((event.clientY - rect.top) /
          rect.height) *
        100,
    });
  };

  const handlePointerLeave = () => {
    setPointer({
      x: 50,
      y: 50,
    });
  };

  const scrollToExperience =
    useCallback((index: number) => {
      const timeline =
        timelineRef.current;

      if (!timeline) return;

      const cards =
        timeline.querySelectorAll<HTMLElement>(
          ".experience-card",
        );

      const target = cards[index];

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, []);

  const handleKeyboardNavigation =
    useCallback(
      (
        event: React.KeyboardEvent,
      ) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();

          const next =
            (activeIndex + 1) %
            experiences.length;

          activateExperience(next);
          scrollToExperience(next);
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();

          const previous =
            (activeIndex -
              1 +
              experiences.length) %
            experiences.length;

          activateExperience(previous);
          scrollToExperience(previous);
        }

        if (event.key === "Home") {
          event.preventDefault();

          activateExperience(0);
          scrollToExperience(0);
        }

        if (event.key === "End") {
          event.preventDefault();

          const last =
            experiences.length - 1;

          activateExperience(last);
          scrollToExperience(last);
        }
      },
      [
        activeIndex,
        activateExperience,
        scrollToExperience,
      ],
    );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`experience-section ${
        visible
          ? "experience-section-visible"
          : ""
      }`}
      style={
        {
          "--experience-scroll":
            scrollProgress,
          "--experience-pointer-x":
            `${pointer.x}%`,
          "--experience-pointer-y":
            `${pointer.y}%`,
        } as React.CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyboardNavigation}
      tabIndex={-1}
    >
      <div className="experience-background">
        <div className="experience-stars experience-stars-one" />
        <div className="experience-stars experience-stars-two" />

        <div className="experience-background-glow" />

        <div className="experience-horizontal-line experience-horizontal-line-one" />
        <div className="experience-horizontal-line experience-horizontal-line-two" />

        <div className="experience-coordinate experience-coordinate-top">
          X / {Math.round(pointer.x)}
          <br />
          Y / {Math.round(pointer.y)}
        </div>

        <div className="experience-coordinate experience-coordinate-bottom">
          SYS.EXP
          <br />
          {currentYear}
        </div>
      </div>

      <div className="experience-inner">
        <header className="experience-header">
          <div className="experience-header-index">
            <span>05</span>

            <span>EXPERIENCE</span>
          </div>

          <div className="experience-header-line">
            <span />
          </div>

          <div className="experience-header-status">
            <StatusLight type="current" />

            <span>
              CAREER SYSTEM / ONLINE
            </span>
          </div>
        </header>

        <div className="experience-hero">
          <div className="experience-hero-left">
            <span className="experience-eyebrow">
              ENGINEERING TRAJECTORY /{" "}
              2023—{currentYear}
            </span>

            <h2>
              Engineering
              <br />
              <span>in motion.</span>
            </h2>

            <p>
              A record of the systems,
              environments and problems
              shaping how I build software.
            </p>
          </div>

          <div className="experience-hero-right">
            <div className="experience-hero-metric">
              <span>
                CURRENT SIGNAL
              </span>

              <strong>
                {activeExperience.signal}
              </strong>

              <small>
                {activeExperience.signalLabel}
              </small>
            </div>

            <div className="experience-hero-progress">
              <span>
                TRAJECTORY
              </span>

              <div>
                <i
                  style={{
                    transform: `scaleX(${scrollProgress})`,
                  }}
                />
              </div>

              <strong>
                {formatProgress(
                  scrollProgress,
                )}
              </strong>
            </div>
          </div>
        </div>

        <div className="experience-command-bar">
          <span>
            EXPERIENCE INDEX
          </span>

          <div className="experience-command-center">
            <span>
              {String(activeIndex + 1).padStart(
                2,
                "0",
              )}
            </span>

            <i />

            <span>
              {String(
                experiences.length,
              ).padStart(2, "0")}
            </span>
          </div>

          <span>
            SCROLL / SELECT
          </span>
        </div>

        <div className="experience-stage">
          <div className="experience-stage-copy">
            <span>
              CAREER
              <br />
              TELEMETRY
            </span>

            <i />
          </div>

          <OrbitField
            activeIndex={activeIndex}
          />

          <ExperienceSignal
            experience={
              activeExperience
            }
            index={activeIndex}
            active
          />
        </div>

        <div
          ref={timelineRef}
          className="experience-timeline"
          role="list"
          aria-label="Professional experience and education"
        >
          <div className="experience-timeline-rail">
            <span
              style={{
                height: `${
                  scrollProgress * 100
                }%`,
              }}
            />
          </div>

          <div className="experience-timeline-marker">
            <span />
          </div>

          {experiences.map(
            (experience, index) => {
              const active =
                activeIndex === index;

              return (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                  active={active}
                  onActivate={
                    activateExperience
                  }
                />
              );
            },
          )}
        </div>

        <section className="experience-trajectory">
          <div className="experience-trajectory-header">
            <div>
              <span>
                CURRENT TRAJECTORY
              </span>

              <h3>
                From intelligence
                <br />
                to infrastructure.
              </h3>
            </div>

            <p>
              The direction is deliberate:
              understand intelligent systems,
              engineer reliable software, and
              turn both into products that solve
              real problems.
            </p>
          </div>

          <div className="experience-trajectory-map">
            <div className="experience-trajectory-line">
              <span />
            </div>

            {trajectoryPoints.map(
              (point, index) => (
                <div
                  key={point.label}
                  className={`experience-trajectory-node ${
                    index ===
                    trajectoryPoints.length -
                      1
                      ? "experience-trajectory-node-final"
                      : ""
                  }`}
                  style={
                    {
                      "--trajectory-index":
                        index,
                    } as React.CSSProperties
                  }
                >
                  <div className="experience-trajectory-dot">
                    <span />
                  </div>

                  <span className="experience-trajectory-number">
                    {point.value}
                  </span>

                  <strong>
                    {point.label}
                  </strong>
                </div>
              ),
            )}
          </div>

          <div className="experience-trajectory-footer">
            <span>
              KANPUR / INDIA
            </span>

            <span>
              AI × SOFTWARE ENGINEERING
            </span>

            <span>
              {currentYear}
            </span>
          </div>
        </section>

        <div className="experience-final-signal">
          <div className="experience-final-signal-line" />

          <div className="experience-final-signal-content">
            <span>
              NEXT TRANSMISSION
            </span>

            <strong>
              BUILDING WHAT
              <br />
              COMES NEXT.
            </strong>

            <div>
              <StatusLight type="current" />

              <span>
                SYSTEM STATUS:
              </span>

              <b>ONLINE</b>
            </div>
          </div>

          <div className="experience-final-signal-meta">
            <span>05 / 05</span>

            <span>
              EXPERIENCE SYSTEM
            </span>

            <span>
              {currentYear}
            </span>
          </div>
        </div>

        <footer className="experience-footer">
          <div className="experience-footer-line" />

          <div className="experience-footer-content">
            <span>
              MORE TO BUILD
            </span>

            <span>
              SOFTWARE × INTELLIGENCE
            </span>

            <span>
              05
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default ExperienceSection;
