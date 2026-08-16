
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./guidein-experience.css";

type Scene = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

const scenes: Scene[] = [
  {
    id: "boot",
    eyebrow: "SYSTEM / 01",
    title: "An intelligence layer for career decisions.",
    description:
      "GuideIn began as a simple AI career guidance experiment. It evolved into a system designed around context, reasoning and structured guidance.",
  },
  {
    id: "problem",
    eyebrow: "PROBLEM / 02",
    title: "Career information is fragmented.",
    description:
      "Skills, interests, goals and opportunities exist independently. GuideIn brings those signals together into a single reasoning layer.",
  },
  {
    id: "intelligence",
    eyebrow: "INTELLIGENCE / 03",
    title: "Understand first. Guide second.",
    description:
      "The system processes user context before generating guidance, allowing recommendations to become more relevant and explainable.",
  },
  {
    id: "architecture",
    eyebrow: "ARCHITECTURE / 04",
    title: "From interface to intelligence.",
    description:
      "The project grew from a Java application into a full-stack system connecting interface, backend services and an AI reasoning layer.",
  },
  {
    id: "evolution",
    eyebrow: "EVOLUTION / 05",
    title: "2024 → 2026.",
    description:
      "What started as a console experiment became a much larger engineering exploration around AI, backend architecture and product design.",
  },
  {
    id: "stack",
    eyebrow: "STACK / 06",
    title: "Built across multiple layers.",
    description:
      "Java, Spring Boot, Gemini, TypeScript and modern frontend technologies form the current GuideIn ecosystem.",
  },
  {
    id: "loop",
    eyebrow: "SYSTEM LOOP / 07",
    title: "Context becomes guidance.",
    description:
      "Input enters the system, context is constructed, reasoning happens, and the resulting guidance returns to the user.",
  },
  {
    id: "final",
    eyebrow: "GUIDEIN / 08",
    title: "Still building what comes next.",
    description:
      "GuideIn is less about a finished product and more about building increasingly capable intelligent systems.",
  },
];

const stack = [
  "JAVA",
  "SPRING BOOT",
  "GEMINI API",
  "MAVEN",
  "JACKSON",
  "TYPESCRIPT",
  "REACT",
  "AI",
];

const orbitNodes = [
  {
    label: "SKILLS",
    x: "15%",
    y: "27%",
  },
  {
    label: "GOALS",
    x: "80%",
    y: "22%",
  },
  {
    label: "INTERESTS",
    x: "84%",
    y: "72%",
  },
  {
    label: "CONTEXT",
    x: "17%",
    y: "76%",
  },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(
  start: number,
  end: number,
  amount: number,
) {
  return start + (end - start) * amount;
}

function smoothstep(value: number) {
  const x = clamp(value);

  return x * x * (3 - 2 * x);
}

export default function GuideInExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [progress, setProgress] =
    useState(0);

  const [activeScene, setActiveScene] =
    useState(0);

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

      const viewport =
        window.innerHeight;

      const distance =
        section.offsetHeight - viewport;

      if (distance <= 0) {
        setProgress(0);
        frame = 0;
        return;
      }

      const raw =
        -rect.top / distance;

      const next = clamp(raw);

      setProgress(next);

      const sceneIndex = Math.min(
        scenes.length - 1,
        Math.floor(
          next * scenes.length,
        ),
      );

      setActiveScene(sceneIndex);

      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;

      frame =
        window.requestAnimationFrame(
          update,
        );
    };

    update();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
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

  const activeSceneData = scenes[activeScene];

if (!activeSceneData) {
  return null;
}

const sceneProgress =
  progress * scenes.length;

const localProgress =
  sceneProgress - activeScene;

  const orbitRotation =
    progress * 720;

  const orbitScale =
    lerp(
      0.72,
      1.18,
      smoothstep(progress),
    );

  const coreScale =
    lerp(
      0.82,
      1.12,
      smoothstep(progress),
    );

  const coreRotation =
    progress * -360;

  const signal =
    Math.round(progress * 100);

  return (
    <main
      ref={sectionRef}
      className="guidein-experience"
    >
      <div className="guidein-sticky">
        <div className="guidein-noise" />

        <div className="guidein-grid" />

        <div
          className="guidein-progress"
          style={{
            transform: `scaleY(${progress})`,
          }}
        />

        <header className="guidein-header">
          <div className="guidein-brand">
            <span>GUIDEIN</span>
            <small>AI CAREER INTELLIGENCE</small>
          </div>

          <div className="guidein-header-status">
            <span className="guidein-status-dot" />
            SYSTEM / ONLINE
          </div>

          <div className="guidein-header-index">
            {String(
              activeScene + 1,
            ).padStart(2, "0")}
            <span>/</span>
            {String(
              scenes.length,
            ).padStart(2, "0")}
          </div>
        </header>

        <div className="guidein-coordinate guidein-coordinate-a">
          X / 07.42
          <br />
          Y / 91.18
        </div>

        <div className="guidein-coordinate guidein-coordinate-b">
          GUIDEIN.SYS
          <br />
          {signal}%
        </div>

        <section className="guidein-content">
          <div className="guidein-copy">
            <span className="guidein-eyebrow">
              {activeSceneData.eyebrow}
            </span>

            <h1>
              {activeSceneData.title}
            </h1>

            <p>
              {
                activeSceneData
                  .description
              }
            </p>

            <div className="guidein-scroll-hint">
              <span />
              SCROLL TO EXPLORE
            </div>
          </div>

          <div className="guidein-system">
            <div
              className="guidein-orbit-field"
              style={{
                transform: `
                  scale(${orbitScale})
                  rotate(${orbitRotation}deg)
                `,
              }}
            >
              <div className="guidein-orbit guidein-orbit-one" />
              <div className="guidein-orbit guidein-orbit-two" />
              <div className="guidein-orbit guidein-orbit-three" />

              {orbitNodes.map(
                (node, index) => (
                  <div
                    key={node.label}
                    className={`guidein-orbit-node guidein-node-${index}`}
                    style={{
                      left: node.x,
                      top: node.y,
                      transform: `
                        translate(-50%, -50%)
                        rotate(-${orbitRotation}deg)
                      `,
                    }}
                  >
                    <i />
                    <span>
                      {node.label}
                    </span>
                  </div>
                ),
              )}

              <div className="guidein-satellite guidein-satellite-a" />
              <div className="guidein-satellite guidein-satellite-b" />

              <div
                className="guidein-core"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    scale(${coreScale})
                    rotate(${coreRotation}deg)
                  `,
                }}
              >
                <div className="guidein-core-ring guidein-core-ring-a" />
                <div className="guidein-core-ring guidein-core-ring-b" />

                <div className="guidein-core-inner">
                  <span>G</span>
                </div>
              </div>
            </div>

            <div className="guidein-signal">
              <span>PROCESS</span>

              <div>
                {Array.from(
                  { length: 12 },
                  (_, index) => (
                    <i
                      key={index}
                      className={
                        index <
                        Math.round(
                          progress * 12,
                        )
                          ? "active"
                          : ""
                      }
                    />
                  ),
                )}
              </div>

              <strong>
                {String(signal).padStart(
                  3,
                  "0",
                )}
              </strong>
            </div>
          </div>
        </section>

        <div
          className="guidein-scene-panel"
          style={{
            opacity: lerp(
              0.4,
              1,
              smoothstep(
                Math.min(
                  1,
                  localProgress * 2,
                ),
              ),
            ),
          }}
        >
          <span>
            SCROLL STATE
          </span>

          <strong>
            {activeSceneData
            .id.toUpperCase()}
          </strong>

          <div>
            <i
              style={{
                width: `${localProgress * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="guidein-stack">
          {stack.map(
            (technology, index) => {
              const technologyProgress =
                clamp(
                  progress * 3 -
                    index * 0.12,
                );

              return (
                <span
                  key={technology}
                  style={{
                    opacity:
                      technologyProgress,
                    transform: `
                      translateY(
                        ${(1 -
                          technologyProgress) *
                          20}px
                      )
                    `,
                  }}
                >
                  {technology}
                </span>
              );
            },
          )}
        </div>

        <div className="guidein-timeline">
          <div className="guidein-timeline-track">
            <i
              style={{
                width: `${progress * 100}%`,
              }}
            />
          </div>

          {scenes.map(
            (scene, index) => (
              <span
                key={scene.id}
                className={
                  index === activeScene
                    ? "active"
                    : ""
                }
                style={{
                  left: `${
                    (index /
                      (scenes.length -
                        1)) *
                    100
                  }%`,
                }}
              />
            ),
          )}
        </div>

        <footer className="guidein-footer">
          <span>
            2024 → 2026
          </span>

          <span>
            JAVA × AI × SOFTWARE ENGINEERING
          </span>

          <span>
            {String(
              Math.round(progress * 100),
            ).padStart(3, "0")}
          </span>
        </footer>
      </div>
    </main>
  );
}