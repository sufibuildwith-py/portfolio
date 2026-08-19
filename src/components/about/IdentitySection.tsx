
"use client";

import { useEffect, useRef } from "react";
import "./Identity.css";

const TECH_ROWS = [
  [
    "Java",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Bootstrap",
    "HTML5",
    "CSS3",
  ],
  [
    "MongoDB",
    "PostgreSQL",
    "Python",
    "FastAPI",
    "Node.js",
    "Express.js",
  ],
  [
    "Google Gemini",
    "LangChain",
    "MCP",
    "Prompt Engineering",
    "AI",
    "LLMs",
  ],
  [
    "CI/CD",
    "Git",
    "GitHub",
    "Docker",
    "Postman",
    "VS Code",
  ],
];

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let animationFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      section.style.setProperty("--identity-mouse-x", `${x}`);
      section.style.setProperty("--identity-mouse-y", `${y}`);
      section.style.setProperty(
        "--identity-x",
        `${event.clientX - rect.left}px`
      );
      section.style.setProperty(
        "--identity-y",
        `${event.clientY - rect.top}px`
      );
    };

    const handlePointerLeave = () => {
      section.style.setProperty("--identity-mouse-x", "0");
      section.style.setProperty("--identity-mouse-y", "0");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        section.dataset.visible = entry.isIntersecting
          ? "true"
          : "false";
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(section);

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    const animate = () => {
      const time = performance.now();

      const driftX = Math.sin(time * 0.00018) * 18;
      const driftY = Math.cos(time * 0.00015) * 14;

      section.style.setProperty(
        "--identity-drift-x",
        `${driftX}px`
      );

      section.style.setProperty(
        "--identity-drift-y",
        `${driftY}px`
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();

      section.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="identity-section"
    >
      {/* Ambient atmosphere */}
      <div className="identity-atmosphere" />
      <div className="identity-particles" />
      <div className="identity-scanline" />

      <div className="identity-inner">

        {/* Section marker */}
        <div className="identity-label">
          <span>02</span>
          <span>ABOUT / SYSTEM</span>
        </div>

        <div className="identity-layout">

          {/* =========================================
              LEFT — TEXT
              ========================================= */}
          <div className="identity-copy">

            <p className="identity-kicker">
              AI & SOFTWARE ENGINEERING
            </p>

            <h2 className="identity-heading">
              <span>AT THE</span>
              <span>INTERSECTION</span>
              <span className="identity-heading-accent">
                OF AI & SOFTWARE.
              </span>
            </h2>

            <div className="identity-summary">
              <p>
                I&apos;m Sufiyan — an AI & ML engineer in the
                making, building at the intersection of
                intelligent systems and practical software.
              </p>

              <p>
                I enjoy turning ideas into things that actually
                work — from AI-powered applications and backend
                systems to automation tools that solve real
                problems.
              </p>

              <p className="identity-summary-small">
                Curious by nature. Backend at heart.
                Always building.
              </p>
            </div>

            <div className="identity-meta">
              <div>
                <span>BASED IN</span>
                <strong>KANPUR, INDIA</strong>
              </div>

              <div>
                <span>EDUCATION</span>
                <strong>B.TECH · AI & ML</strong>
              </div>

              <div>
                <span>GRADUATING</span>
                <strong>2027</strong>
              </div>
            </div>

          </div>

          {/* =========================================
              RIGHT — PORTRAIT
              ========================================= */}
          <div className="identity-portrait">

            <div className="identity-portrait-glow" />

            <div className="identity-portrait-frame">
              <img
                src="/images/profile.jpg"
                alt="Sufiyan"
                className="identity-photo"
              />
            </div>

            {/* =====================================
                TECH MARQUEE
                Positioned around abdomen
                ===================================== */}
            <div className="identity-tech-marquee">

              {TECH_ROWS.map((row, rowIndex) => (
                <div
                  className={`tech-marquee-row ${
                    rowIndex % 2 === 0
                      ? "marquee-right"
                      : "marquee-left"
                  }`}
                  key={rowIndex}
                >
                  <div className="tech-marquee-track">
                    {[...row, ...row].map(
                      (tech, index) => (
                        <span
                          className="tech-item"
                          key={`${tech}-${index}`}
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}