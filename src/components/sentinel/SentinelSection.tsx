"use client";

import { useEffect, useRef, useState } from "react";

export function SentinelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      /*
       * Progress starts when the section enters
       * the viewport and ends when it leaves.
       */
      const totalDistance =
        rect.height - viewportHeight;

      const traveled = -rect.top;

      const rawProgress =
        traveled / totalDistance;

      const nextProgress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setProgress(nextProgress);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);
  const investigationReveal =
  progress >= 0.88
    ? Math.min(
        1,
        (progress - 0.88) / 0.12
      )
    : 0;

  return (
    <section
      ref={sectionRef}
      className="sentinel-story"
    >
      <div className="sentinel-sticky">

        <div
          className="sentinel-progress"
          style={
            {
              "--sentinel-progress": progress,
            } as React.CSSProperties
          }
        />

        <div className="sentinel-stage">

          <div className="sentinel-stage-label">
            03 / SENTINEL
          </div>

          <div className="sentinel-stage-content">

            <div
  className="sentinel-handoff"
  style={{
    opacity: investigationReveal,
    transform: `
      scale(
        ${0.7 + investigationReveal * 0.3}
      )
    `,
  }}
>
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <span />
  <strong>
    ENTER INVESTIGATION
  </strong>
</div>
                transform: `
                  translateY(
                    ${progress * -80}px
                  )
                `,
              }}
            >
              <span className="sentinel-micro">
                PRODUCTION INCIDENT
              </span>

              <h2>
                API LATENCY
                <br />
                SPIKE
              </h2>

              <div className="incident-data">
                <span>
                  SERVICE
                  <strong>
                    payments-api
                  </strong>
                </span>

                <span>
                  SEVERITY
                  <strong>
                    HIGH
                  </strong>
                </span>

                <span>
                  DURATION
                  <strong>
                    14m 32s
                  </strong>
                </span>
              </div>

              <p>
                Requests to /checkout are
                experiencing elevated latency
                and intermittent timeouts.
              </p>
            </div>


            <div
              className="sentinel-transition-text"
              style={{
                opacity:
                  progress > 0.22 &&
                  progress < 0.42
                    ? 1
                    : 0,

                transform: `
                  scale(
                    ${
                      0.85 +
                      Math.min(
                        1,
                        Math.max(
                          0,
                          (progress - 0.22) /
                            0.2
                        )
                      ) *
                        0.15
                    }
                  )
                `,
              }}
            >
              INCIDENT
              <span>→</span>
              EMBEDDING
            </div>


            <div
              className="sentinel-embedding"
              style={{
                opacity:
                  progress >= 0.35 &&
                  progress < 0.58
                    ? 1
                    : 0,
              }}
            >
              <div className="embedding-field">

                {Array.from(
                  { length: 70 },
                  (_, index) => (
                    <span
                      key={index}
                      style={
                        {
                          "--i": index,
                        } as React.CSSProperties
                      }
                    />
                  )
                )}

              </div>

              <div className="embedding-label">
                EMBEDDING INCIDENT CONTEXT
              </div>
            </div>


            <div
              className="sentinel-retrieval"
              style={{
                opacity:
                  progress >= 0.52 &&
                  progress < 0.76
                    ? 1
                    : 0,
              }}
            >
              <span className="sentinel-micro">
                RETRIEVAL
              </span>

              <div className="retrieval-node current">
                CURRENT INCIDENT
              </div>

              <div className="retrieval-node node-one">
                INCIDENT #014
              </div>

              <div className="retrieval-node node-two">
                INCIDENT #031
              </div>

              <div className="retrieval-node match">
                INCIDENT #047

                <strong>
                  0.91 SIMILARITY
                </strong>
              </div>
            </div>


            <div
              className="sentinel-diagnosis"
              style={{
                opacity:
                  progress >= 0.72
                    ? Math.min(
                        1,
                        (progress - 0.72) /
                          0.12
                      )
                    : 0,

                transform: `
  translateY(
    ${
      progress >= 0.72
        ? Math.max(
            0,
            40 -
              (progress - 0.72) * 300
          )
        : 40
    }px
  )
  scale(
    ${1 + investigationReveal * 0.04}
  )
`,
              }}
            >
              <span className="sentinel-micro">
                GEMINI / GROUNDED DIAGNOSIS
              </span>

              <h2>
                DATABASE CONNECTION
                <br />
                POOL EXHAUSTION
              </h2>

              <p>
                Diagnosis grounded in
                retrieved historical evidence.
              </p>

              <div className="diagnosis-confidence">
                <span>CONFIDENCE</span>

                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <strong>
                  91%
                </strong>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}