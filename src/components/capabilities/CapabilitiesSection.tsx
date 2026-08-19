"use client";

import { useEffect, useRef } from "react";
import "./Capabilities.css";

const capabilities = [
  {
    index: "01",
    category: "AI SYSTEMS",
    title: "INTELLIGENCE",
    description:
      "Building practical AI systems around language models, retrieval, automation, and intelligent decision-making.",
    technologies: ["LLMs", "RAG", "NLP", "GEN AI", "PROMPT ENGINEERING", "AUTOMATION"],
    level: "ACTIVE",
    signal: "AI",
  },
  {
    index: "02",
    category: "BACKEND",
    title: "INFRASTRUCTURE",
    description:
      "Designing backend services and APIs that connect applications, data, external services, and intelligent systems.",
    technologies: ["JAVA", "REST API", "SPRING", "MAVEN", "LLM API Integration"],
    level: "ACTIVE",
    signal: "API",
  },
  {
    index: "03",
    category: "SOFTWARE",
    title: "ENGINEERING",
    description:
      "Turning ideas into maintainable software through structured development, debugging, version control, and system thinking.",
technologies: ["GIT", "C++", "PYTHON", "JAVA", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXTJS"],
    level: "BUILDING",
    signal: "CODE",
  },
  {
    index: "04",
    category: "DATA",
    title: "SYSTEMS",
    description:
      "Working with application data, APIs, structured information, and persistence layers to keep systems reliable.",
    technologies: ["MONGODB", "JSON", "DATABASES", "DATA","Postman" ,"OCR", "OFFLINE APPLICATIONS"],
    level: "ACTIVE",
    signal: "DATA",
  },
];

const metrics = [
  {
    label: "AI MODELS",
    value: 86,
    detail: "",
  },
  {
    label: "API SERVICES",
    value: 78,
    detail: "",
  },
  {
    label: "DATA SYSTEMS",
    value: 72,
    detail: "",
  },
  {
    label: "CODE ENGINEERING",
    value: 91,
    detail: "",
  },
];

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let animationFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        section.dataset.visible = entry.isIntersecting
          ? "true"
          : "false";
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    /*
     * Ambient system motion.
     * Deliberately does not react to the cursor.
     */
    const animate = () => {
      const time = performance.now();

      const driftX =
        Math.sin(time * 0.00016) * 18;

      const driftY =
        Math.cos(time * 0.00013) * 14;

      const rotation =
        Math.sin(time * 0.00009) * 0.35;

      section.style.setProperty(
        "--capability-drift-x",
        `${driftX}px`
      );

      section.style.setProperty(
        "--capability-drift-y",
        `${driftY}px`
      );

      section.style.setProperty(
        "--capability-rotation",
        `${rotation}deg`
      );

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="capabilities-section"
    >
      {/* =====================================================
          ATMOSPHERIC SYSTEM LAYERS
          ===================================================== */}

      <div className="capabilities-noise" />

      <div className="capabilities-grid" />

      <div className="capabilities-orbit" />

      <div className="capabilities-scanline" />

      <div className="capabilities-vignette" />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="capabilities-inner">

        {/* ---------------------------------------------------
            SECTION HEADER
            --------------------------------------------------- */}

        <header className="capabilities-header">

          <div className="capabilities-label">
            <span className="capabilities-number">
              03
            </span>

            <span>
              CAPABILITIES / SYSTEMS
            </span>

            <span className="capabilities-header-line" />

            <span className="capabilities-live">
              <i />
              SYSTEMS ONLINE
            </span>
          </div>

          <div className="capabilities-intro">

            <p className="capabilities-kicker">
              ENGINEERING PROFILE
            </p>

            <h2>
              <span className="capabilities-title-line">
                WHAT I
              </span>

              <span className="capabilities-title-line capabilities-title-accent">
                BUILD.
              </span>
            </h2>

            <p className="capabilities-intro-copy">
              AI-driven software, backend systems & Frontend systems,
              intelligent automation, and the
              infrastructure connecting them, from working with APIs, data, and models to building maintainable software that turns complexity into something useful even offline applications.
            </p>

          </div>

        </header>

        {/* ---------------------------------------------------
            CAPABILITY MATRIX
            --------------------------------------------------- */}

        <div className="capabilities-matrix">

          <div className="capabilities-matrix-header">

            <span>
              CAPABILITY MATRIX
            </span>

            <span>
              04 MODULES DETECTED
            </span>

          </div>

          <div className="capabilities-list">

            {capabilities.map((capability) => (
              <article
                className="capability-card"
                key={capability.index}
              >
                <div className="capability-card-top">

                  <span className="capability-index">
                    {capability.index}
                  </span>

                  <span className="capability-category">
                    {capability.category}
                  </span>

                  <span className="capability-signal">
                    {capability.signal}
                  </span>

                </div>

                <div className="capability-card-main">

                  <h3>
                    {capability.title}
                  </h3>

                  <p>
                    {capability.description}
                  </p>

                </div>

                <div className="capability-card-bottom">

                  <div className="capability-tech-stack">
                    {capability.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}
                  </div>

                  <div className="capability-state">
                    <i />
                    {capability.level}
                  </div>

                </div>

                <div className="capability-card-corner capability-card-corner-tl" />
                <div className="capability-card-corner capability-card-corner-tr" />
                <div className="capability-card-corner capability-card-corner-bl" />
                <div className="capability-card-corner capability-card-corner-br" />

              </article>
            ))}

          </div>

        </div>

        {/* ---------------------------------------------------
            SYSTEM READOUT
            --------------------------------------------------- */}

        <section className="capabilities-readout">

          <div className="readout-header">

            <div>
              <span className="readout-index">
                SYS / 03
              </span>

              <span className="readout-title">
                SYSTEM READOUT
              </span>
            </div>

            <div className="readout-status">
              <i />
              OPERATIONAL
            </div>

          </div>
<div className="readout-body">

  <div className="readout-description">
    {/* your existing IDEA → IMPLEMENTATION content */}
  </div>

</div>

            {/* -----------------------------------------------
                LEFT SIDE
                ----------------------------------------------- */}

            <div className="readout-description">

              <span className="readout-eyebrow">
                ENGINEERING APPROACH
              </span>

              <h3>
                FROM
                <br />
                <span>IDEA</span>
                <br />
                TO IMPLEMENTATION.
              </h3>

              <p>
                I create Ideas for real worlds problems create several roadmaps to solve it then merge them into useful software connecting
                models, APIs, backend logic, data, and
                real-world workflows.
              </p>

              <div className="readout-terminal">

                <div className="terminal-top">

                  <span>
                    SYSTEM.LOG
                  </span>

                  <span>
                    LIVE
                  </span>

                </div>

                <div className="terminal-content">

                  <p>
                    <span>&gt;</span>
                    creating roadmaps based on the problem statement and requirements...
                  </p>

                  <p>
                    <span>&gt;</span>
                    creating a solution architecture and implementation plan...
                  </p>

                  <p>
                    <span>&gt;</span>
                    bringing the solution to life, that's how I work...
                  </p>

                  <p className="terminal-success">
                    <span>&gt;</span>
                    then system ready to deploy, increasing efficiency.
                  </p>

                </div>

              </div>

            </div>

            {/* -----------------------------------------------
                RIGHT SIDE
                ----------------------------------------------- */}
          {/* -----------------------------------------------
              METRICS
              ----------------------------------------------- */}

          <div className="readout-metrics">

            {metrics.map((metric) => (
              <div
                className="readout-metric"
                key={metric.label}
              >
                <div className="metric-header">

                  <span>
                    {metric.label}
                  </span>

                  <span>
                    {metric.detail}
                  </span>

                </div>

                <div className="metric-bar">

                  <span
                    style={{
                      "--metric-value":
                        `${metric.value}%`,
                    } as React.CSSProperties}
                  />

                </div>

                <div className="metric-footer">

                  <strong>
                    {metric.value}
                  </strong>

                  <span>
                    %
                  </span>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* ---------------------------------------------------
            BOTTOM STATEMENT
            --------------------------------------------------- */}

        <footer className="capabilities-footer">

          <div className="capabilities-footer-line" />

          <p>
            <span>
              03
            </span>

            BUILDING SYSTEMS
            THAT TURN COMPLEXITY
            INTO SOMETHING USEFUL.
          </p>

          <div className="capabilities-footer-meta">

            <span>
              AI
            </span>

            <i />

            <span>
              BACKEND
            </span>

            <i />

            <span>
              SOFTWARE
            </span>

            <i />

            <span>
              2027
            </span>

          </div>

        </footer>

      </div>
    </section>
  );
}