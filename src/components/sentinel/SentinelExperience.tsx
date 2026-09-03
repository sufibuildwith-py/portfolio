"use client";

import { useEffect, useRef, useState } from "react";
import { SentinelField } from "./SentinelField";
import "./sentinel.css";

const stages = [
  {
    number: "01",
    label: "INCIDENT",
    title: "PRODUCTION\nSIGNAL",
    description:
      "Sentinel detects an abnormal latency pattern across the payments API.",
  },
  {
    number: "02",
    label: "EMBEDDING",
    title: "CONTEXT\nBECOMES VECTOR",
    description:
      "The incident is converted into a semantic representation of its meaning.",
  },
  {
    number: "03",
    label: "RETRIEVAL",
    title: "SEARCHING\nMEMORY",
    description:
      "Historical incidents are searched for patterns that resemble the current failure.",
  },
  {
    number: "04",
    label: "EVIDENCE",
    title: "SIGNAL\nCONVERGENCE",
    description:
      "Multiple historical signals converge around the same underlying failure mode.",
  },
  {
    number: "05",
    label: "DIAGNOSIS",
    title: "ROOT CAUSE\nIDENTIFIED",
    description:
      "Gemini generates a diagnosis grounded in retrieved production evidence.",
  },
];

export function SentinelExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;

      if (total <= 0) return;

      const value = Math.min(
        1,
        Math.max(0, -rect.top / total)
      );

      setProgress(value);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const activeStage = Math.min(
    stages.length - 1,
    Math.floor(progress * stages.length)
  );

  const current = stages[activeStage];
if (!current) return null;
  return (
    <section
      ref={sectionRef}
      id="sentinel"
      className="sentinel-experience"
      style={
        {
          "--sentinel-progress": progress,
        } as React.CSSProperties
      }
    >
      <div className="sentinel-sticky">

        <SentinelField progress={progress} />

        <div className="sentinel-noise" />

        <div className="sentinel-vignette" />

        <div className="sentinel-interface">

          {/* TOP BAR */}

          <header className="sentinel-header">

            <div className="sentinel-header-left">
              <span className="sentinel-index">
                03
              </span>

              <span>
                SENTINEL
              </span>

              <span className="sentinel-slash">
                /
              </span>

              <span className="muted">
                INCIDENT INTELLIGENCE
              </span>
            </div>

            <div className="sentinel-live">
              <i />
              SYSTEM ONLINE
            </div>

          </header>


          {/* MAIN */}

          <div className="sentinel-main">

            {/* LEFT */}

            <div className="sentinel-copy">

              <div className="sentinel-stage-number">
                {current.number}
              </div>

              <p className="sentinel-eyebrow">
                {current.label}
              </p>

              <h2>
                {current.title
                  .split("\n")
                  .map((line) => (
                    <span key={line}>
                      {line}
                    </span>
                  ))}
              </h2>

              <p className="sentinel-description">
                {current.description}
              </p>


              {/* INCIDENT DATA */}

              {activeStage === 0 && (
                <div className="sentinel-card">
                  <div>
                    <span>SERVICE</span>
                    <strong>PAYMENTS-API</strong>
                  </div>

                  <div>
                    <span>SEVERITY</span>
                    <strong>SEV-1</strong>
                  </div>

                  <div>
                    <span>LATENCY</span>
                    <strong>2.84s</strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong>INVESTIGATING</strong>
                  </div>
                </div>
              )}


              {/* DIAGNOSIS */}

              {activeStage === 4 && (
                <div className="sentinel-diagnosis">

                  <div className="diagnosis-top">
                    <span>
                      ROOT CAUSE SIGNAL
                    </span>

                    <strong>
                      0.91
                    </strong>
                  </div>

                  <div className="diagnosis-line" />

                  <h3>
                    DATABASE CONNECTION
                    <br />
                    POOL EXHAUSTION
                  </h3>

                  <p>
                    Diagnosis grounded in
                    retrieved production evidence.
                  </p>

                </div>
              )}

            </div>


            {/* RIGHT PIPELINE */}

            <div className="sentinel-pipeline">

              <div className="pipeline-line" />

              {stages.map((stage, index) => {

                const distance =
                  Math.abs(index - activeStage);

                return (
                  <div
                    key={stage.number}
                    className={[
                      "pipeline-node",
                      index === activeStage
                        ? "active"
                        : "",
                      index < activeStage
                        ? "complete"
                        : "",
                    ].join(" ")}
                    style={{
                      "--distance": distance,
                    } as React.CSSProperties}
                  >

                    <div className="pipeline-marker">
                      <span>
                        {stage.number}
                      </span>
                    </div>

                    <div className="pipeline-content">
                      <span>
                        {stage.label}
                      </span>

                      <strong>
                        {stage.title.replace(
                          "\n",
                          " "
                        )}
                      </strong>
                    </div>

                  </div>
                );
              })}

            </div>

          </div>


          {/* BOTTOM */}

          <div className="sentinel-footer">

            <span>
              SEMANTIC INCIDENT INVESTIGATION
            </span>

            <div className="sentinel-progress">

              <div className="progress-label">
                INVESTIGATION
              </div>

              <div className="progress-track">
                <div className="progress-fill" />
              </div>

              <div className="progress-value">
                {Math.round(progress * 100)
                  .toString()
                  .padStart(3, "0")}
                %
              </div>

            </div>

            <span>
              SCROLL TO INVESTIGATE
            </span>

            <a
              className="sentinel-demo-button"
              href="https://www.youtube.com/watch?v=wjaczWAYyJc"
              target="_blank"
              rel="noreferrer"
              aria-label="Play Sentinel demo on YouTube"
            >
              PLAY DEMO ↗
            </a>

          </div>

        </div>


        {/* CENTER CROSSHAIR */}

        <div className="sentinel-crosshair">
          <span />
          <span />
        </div>

      </div>
    </section>
  );
}
