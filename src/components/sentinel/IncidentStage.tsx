"use client";

import { useEffect, useState } from "react";

type IncidentStageProps = {
  progress: number;
};

const stages = [
  {
    label: "INCIDENT CONTEXT",
    index: "01",
    title: "PRODUCTION INCIDENT",
  },
  {
    label: "EMBEDDING",
    index: "02",
    title: "VECTOR REPRESENTATION",
  },
  {
    label: "RETRIEVAL",
    index: "03",
    title: "SEMANTIC SEARCH",
  },
  {
    label: "EVIDENCE",
    index: "04",
    title: "RELEVANT HISTORY",
  },
  {
    label: "GEMINI DIAGNOSIS",
    index: "05",
    title: "EVIDENCE-GROUNDED ANALYSIS",
  },
];

export function IncidentStage({
  progress,
}: IncidentStageProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      setTime(now - start);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  const stageFloat =
    Math.sin(time * 0.0012) * 4;

  const stage = Math.min(
    Math.floor(progress * stages.length),
    stages.length - 1
  );

  const current = stages[stage];
if (!current) return null;
  return (
    <div className="incident-stage">

      <div
        className="incident-copy"
        style={{
          transform: `
            translate3d(
              ${Math.sin(time * 0.0007) * 3}px,
              ${stageFloat}px,
              0
            )
          `,
        }}
      >

        <p className="incident-eyebrow">
          {current.index} / {current.label}
        </p>

        <h2
          key={current.index}
          className="stage-title"
        >
          {current.title}
        </h2>

        {stage === 0 && (
          <div className="incident-card">

            <div>
              <span>SERVICE</span>
              <strong>PAYMENT-API</strong>
            </div>

            <div>
              <span>SEVERITY</span>
              <strong>SEV-1</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>INVESTIGATING</strong>
            </div>

            <div>
              <span>SYMPTOM</span>
              <strong>LATENCY SPIKE</strong>
            </div>

          </div>
        )}

        {stage === 1 && (
          <p className="incident-description">
            The incident is transformed into a semantic
            representation so Sentinel can reason about
            meaning rather than matching keywords alone.
          </p>
        )}

        {stage === 2 && (
          <p className="incident-description">
            The vector representation is compared against
            previously investigated incidents to find the
            strongest semantic match.
          </p>
        )}

        {stage === 3 && (
          <p className="incident-description">
            Relevant historical evidence is surfaced and
            connected to the current production incident.
          </p>
        )}

        {stage === 4 && (
          <div className="diagnosis">

            <div className="diagnosis-scan" />

            <span>
              ROOT CAUSE SIGNAL
            </span>

            <strong>
              DEPENDENCY REGRESSION
            </strong>

            <p>
              Diagnosis grounded in retrieved incident
              evidence rather than an unsupported LLM guess.
            </p>

            <div className="confidence-bar">
              <span />
            </div>

            <div className="confidence-meta">
              <span>MODEL CONFIDENCE</span>
              <strong>91%</strong>
            </div>

          </div>
        )}

      </div>

      <div
        className="incident-pipeline"
        style={{
          transform: `
            perspective(900px)
            rotateY(${
              Math.sin(time * 0.00045) * 3
            }deg)
            rotateX(${
              Math.cos(time * 0.0005) * 1.5
            }deg)
          `,
        }}
      >

        {stages.map((item, index) => {

          const distance =
            Math.abs(index - stage);

          return (
            <div
              key={item.index}
              className={`
                pipeline-node
                ${index === stage ? "active" : ""}
                ${index < stage ? "complete" : ""}
              `}
              style={{
                transform: `
                  translateX(
                    ${index === stage ? -10 : 0}px
                  )
                  translateZ(
                    ${Math.max(0, 3 - distance) * 10}px
                  )
                `,
              }}
            >

              <span>
                {item.index}
              </span>

              <div className="pipeline-line">
                {index < stages.length - 1 && (
                  <i />
                )}
              </div>

              <strong>
                {item.label}
              </strong>

              {index === stage && (
                <div className="pipeline-pulse" />
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}