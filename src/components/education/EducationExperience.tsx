"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./education-experience.css";

type EducationPhase =
  | "school"
  | "transition"
  | "college";

type SchoolStage = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
};

type CollegeStage = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
};

const schoolStages: SchoolStage[] = [
  {
    id: "foundation",
    number: "01",
    eyebrow: "SCHOOL / FOUNDATION",
    title: "Where curiosity started.",
    description:
      "A foundation built around mathematics, computer science and an active curiosity for creating things beyond the classroom.",
  },
  {
    id: "computation",
    number: "02",
    eyebrow: "SCHOOL / COMPUTATION",
    title: "Mathematics met computation.",
    description:
      "Senior secondary education with a focus on Mathematics and Computer Science shaped the direction that would eventually lead toward engineering and AI.",
  },
  {
    id: "creative",
    number: "03",
    eyebrow: "SCHOOL / CREATIVE SIGNAL",
    title: "Logic wasn't the whole story.",
    description:
      "Creative writing certifications and active participation developed another side of the foundation — communication, imagination and the ability to approach problems from different angles.",
  },
  {
    id: "departure",
    number: "04",
    eyebrow: "SCHOOL / 2023",
    title: "Ready for the next system.",
    description:
      "Three years of mathematics, computing and creative exploration became the launchpad for a much deeper technical journey.",
  },
];

const collegeStages: CollegeStage[] = [
  {
    id: "arrival",
    number: "01",
    eyebrow: "COLLEGE / ARRIVAL",
    title: "The direction became AI.",
    description:
      "A Bachelor of Technology in Artificial Intelligence & Machine Learning turned curiosity into a structured engineering discipline.",
  },
  {
    id: "systems",
    number: "02",
    eyebrow: "COLLEGE / SYSTEMS",
    title: "Learning how systems work.",
    description:
      "Programming, data structures, databases, operating systems and computer networks became the foundations beneath larger software systems.",
  },
  {
    id: "intelligence",
    number: "03",
    eyebrow: "COLLEGE / INTELLIGENCE",
    title: "Machines became the subject.",
    description:
      "Artificial intelligence, machine learning, deep learning, natural language processing and computer vision expanded the technical direction.",
  },
  {
    id: "engineering",
    number: "04",
    eyebrow: "COLLEGE / ENGINEERING",
    title: "Theory became software.",
    description:
      "Software engineering and practical development connected academic concepts with real applications, backend systems and AI-powered projects.",
  },
  {
    id: "building",
    number: "05",
    eyebrow: "COLLEGE / BUILDING",
    title: "Learning became building.",
    description:
      "Projects became the real laboratory — turning concepts into working systems and gradually pushing beyond coursework.",
  },
  {
    id: "current",
    number: "06",
    eyebrow: "COLLEGE / CURRENT",
    title: "Still learning. Building faster.",
    description:
      "The fourth year is less about simply completing a degree and more about becoming capable of designing and building increasingly ambitious systems.",
  },
];

const collegeSubjects = [
  {
    name: "ARTIFICIAL INTELLIGENCE",
    short: "AI",
    orbit: 0,
  },
  {
    name: "MACHINE LEARNING",
    short: "ML",
    orbit: 1,
  },
  {
    name: "DEEP LEARNING",
    short: "DL",
    orbit: 2,
  },
  {
    name: "DATA STRUCTURES",
    short: "DSA",
    orbit: 0,
  },
  {
    name: "DATABASE SYSTEMS",
    short: "DB",
    orbit: 1,
  },
  {
    name: "NATURAL LANGUAGE PROCESSING",
    short: "NLP",
    orbit: 2,
  },
  {
    name: "COMPUTER VISION",
    short: "CV",
    orbit: 0,
  },
  {
    name: "COMPUTER NETWORKS",
    short: "NET",
    orbit: 1,
  },
  {
    name: "OPERATING SYSTEMS",
    short: "OS",
    orbit: 2,
  },
  {
    name: "SOFTWARE ENGINEERING",
    short: "SE",
    orbit: 0,
  },
  {
    name: "PROGRAMMING",
    short: "CODE",
    orbit: 1,
  },
  {
    name: "ALGORITHMS",
    short: "ALG",
    orbit: 2,
  },
];

const schoolSignals = [
  "MATHEMATICS",
  "COMPUTER SCIENCE",
  "CREATIVITY",
  "COMMUNICATION",
];

const collegeSignals = [
  "PROGRAMMING",
  "SYSTEMS",
  "AI",
  "MACHINE LEARNING",
  "ENGINEERING",
  "BUILDING",
];

function clamp(
  value: number,
  min = 0,
  max = 1,
) {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

function smoothstep(value: number) {
  const x = clamp(value);

  return x * x * (3 - 2 * x);
}

function lerp(
  start: number,
  end: number,
  amount: number,
) {
  return start + (end - start) * amount;
}

function getSchoolStage(
  progress: number,
) {
  const scaled =
    progress *
    (schoolStages.length - 1);

  const index = Math.min(
    schoolStages.length - 1,
    Math.floor(scaled),
  );

  return {
    index,
    local: scaled - index,
  };
}

function getCollegeStage(
  progress: number,
) {
  const scaled =
    progress *
    (collegeStages.length - 1);

  const index = Math.min(
    collegeStages.length - 1,
    Math.floor(scaled),
  );

  return {
    index,
    local: scaled - index,
  };
}

/* -------------------------------------------------
   SCHOOL VISUAL
------------------------------------------------- */

function SchoolVisual({
  progress,
  stageIndex,
}: {
  progress: number;
  stageIndex: number;
}) {
  const rotation =
    progress * 180;

  const schoolProgress =
    clamp(progress);

  const subjects = [
    {
      label: "MATHEMATICS",
      short: "MATH",
      angle: -48,
      radius: 170,
    },
    {
      label: "COMPUTER SCIENCE",
      short: "CS",
      angle: 42,
      radius: 185,
    },
    {
      label: "CREATIVE WRITING",
      short: "WRITE",
      angle: 132,
      radius: 165,
    },
    {
      label: "PARTICIPATION",
      short: "ACTIVE",
      angle: 222,
      radius: 180,
    },
  ];

  return (
    <div className="education-school-visual">
      <div className="education-school-frame">
        <div className="education-school-grid" />

        <div className="education-school-year">
          <span>ACADEMIC PERIOD</span>

          <strong>2020 → 2023</strong>
        </div>

        <div
          className="education-school-orbit"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {subjects.map(
            (
              subject,
              index,
            ) => {
              const reveal =
                clamp(
                  schoolProgress *
                    2.2 -
                    index * 0.22,
                );

              return (
                <div
                  key={
                    subject.label
                  }
                  className="education-school-node"
                  style={{
                    transform: `
                      rotate(${subject.angle}deg)
                      translateY(-${subject.radius}px)
                      rotate(-${subject.angle}deg)
                    `,
                    opacity: reveal,
                  }}
                >
                  <i />

                  <strong>
                    {subject.label}
                  </strong>

                  <small>
                    {subject.short}
                  </small>
                </div>
              );
            },
          )}
        </div>

        <div className="education-school-core">
          <div className="education-school-core-ring" />

          <div className="education-school-core-inner">
            <span>
              {stageIndex === 0
                ? "ORIGIN"
                : stageIndex === 1
                  ? "DISCOVERY"
                  : stageIndex === 2
                    ? "CREATE"
                    : "READY"}
            </span>

            <strong>2023</strong>

            <small>
              SCHOOL YEARS
            </small>
          </div>
        </div>

        <div className="education-school-corner">
          <span>01</span>
          <span>FOUNDATION</span>
        </div>

        <div className="education-school-corner-bottom">
          <span>
            KANPUR / INDIA
          </span>

          <span>03 YEARS</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   TRANSITION
------------------------------------------------- */

function TransitionVisual({
  progress,
}: {
  progress: number;
}) {
  const reveal =
    smoothstep(progress);

  return (
    <div
      className="education-transition"
      style={{
        opacity: reveal,
      }}
    >
      <div className="education-transition-line" />

      <div className="education-transition-year">
        <span>2023</span>

        <strong>
          THE DIRECTION CHANGED.
        </strong>
      </div>

      <div className="education-transition-path">
        <div>
          <small>SCHOOL</small>

          <strong>
            MATHEMATICS
            <br />
            COMPUTER SCIENCE
            <br />
            CREATIVITY
          </strong>
        </div>

        <i />

        <div>
          <small>COLLEGE</small>

          <strong>
            ARTIFICIAL
            <br />
            INTELLIGENCE
            <br />
            ENGINEERING
          </strong>
        </div>
      </div>

      <div className="education-transition-caption">
        FROM CURIOSITY
        <span>→</span>
        TO ENGINEERING
      </div>
    </div>
  );
}

/* -------------------------------------------------
   COLLEGE ORBIT
------------------------------------------------- */

function CollegeOrbit({
  progress,
  stageIndex,
}: {
  progress: number;
  stageIndex: number;
}) {
  const rotation =
    progress * 720;

  const academicProgress =
    clamp(
      (progress - 0.05) /
        0.9,
    );

  const visibleSubjects =
    Math.min(
      collegeSubjects.length,
      Math.floor(
        academicProgress *
          (collegeSubjects.length +
            3),
      ),
    );

  const coreScale = lerp(
    0.78,
    1.08,
    smoothstep(
      academicProgress,
    ),
  );

  return (
    <div className="education-college-visual">
      <div className="education-college-header">
        <span>
          B.TECH / AI & ML
        </span>

        <strong>
          2023 → 2027
        </strong>
      </div>

      <div
        className="education-college-orbit-system"
        style={
          {
            "--education-rotation": `${rotation}deg`,
          } as React.CSSProperties
        }
      >
        <div className="education-college-orbit education-college-orbit-one" />

        <div className="education-college-orbit education-college-orbit-two" />

        <div className="education-college-orbit education-college-orbit-three" />

        <div className="education-college-plane education-college-plane-one" />

        <div className="education-college-plane education-college-plane-two" />

        {collegeSubjects.map(
          (
            subject,
            index,
          ) => {
            const visible =
              index <
              visibleSubjects;

            const angle =
              index *
                30 +
              rotation *
                (subject.orbit ===
                1
                  ? -0.28
                  : 0.22);

            const radius =
              155 +
              subject.orbit *
                62;

            return (
              <div
                key={
                  subject.name
                }
                className={`education-college-subject education-college-subject-${subject.orbit}`}
                style={{
                  opacity: visible
                    ? 1
                    : 0,
                  transform: `
                    rotate(${angle}deg)
                    translateY(-${radius}px)
                    rotate(-${angle}deg)
                    scale(${visible ? 1 : 0.25})
                  `,
                  transitionDelay: `${
                    index * 70
                  }ms`,
                }}
              >
                <i />

                <strong>
                  {subject.name}
                </strong>

                <small>
                  {subject.short}
                </small>
              </div>
            );
          },
        )}

        <div
          className="education-college-core"
          style={{
            transform: `
              translate(-50%, -50%)
              scale(${coreScale})
              rotate(${-rotation * 0.35}deg)
            `,
          }}
        >
          <div className="education-college-core-glow" />

          <div className="education-college-core-ring education-college-core-ring-one" />

          <div className="education-college-core-ring education-college-core-ring-two" />

          <div className="education-college-core-inner">
            <span>MPGI</span>

            <strong>
              AI × ML
            </strong>

            <small>
              ENGINEERING CORE
            </small>
          </div>
        </div>

        <div className="education-college-stage">
          <span>STAGE</span>

          <strong>
            {String(
              stageIndex + 1,
            ).padStart(2, "0")}
          </strong>

          <small>/ 06</small>
        </div>
      </div>

      <div className="education-college-subject-count">
        <span>
          SUBJECTS REVEALED
        </span>

        <strong>
          {String(
            visibleSubjects,
          ).padStart(2, "0")}
          <small>
            / 12
          </small>
        </strong>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   CURRENT / END STATE
------------------------------------------------- */

function CollegeEndState({
  progress,
}: {
  progress: number;
}) {
  const reveal =
    clamp(
      (progress - 0.82) /
        0.18,
    );

  return (
    <div
      className="education-end-state"
      style={{
        opacity: reveal,
        transform: `translateY(${
          (1 - reveal) * 35
        }px)`,
      }}
    >
      <span>
        CURRENTLY BUILDING TOWARD
      </span>

      <strong>
        2027
      </strong>

      <div>
        B.TECH
        <i>×</i>
        ARTIFICIAL INTELLIGENCE
        <i>×</i>
        SOFTWARE ENGINEERING
      </div>

      <small>
        DEGREE AS CHECKPOINT.
        <br />
        BUILDING AS THE DIRECTION.
      </small>
    </div>
  );
}

/* -------------------------------------------------
   MAIN EXPERIENCE
------------------------------------------------- */

export default function EducationExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const section =
        sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollable =
        section.offsetHeight -
        window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const next = clamp(
        -rect.top /
          scrollable,
      );

      setProgress(next);
    };

    const handleScroll =
      () => {
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
        window.cancelAnimationFrame(
          frame,
        );
      }
    };
  }, []);

  /*
   * Three large visual chapters:
   *
   * 0.00 → 0.38  SCHOOL
   * 0.38 → 0.47  TRANSITION
   * 0.47 → 1.00  COLLEGE
   */

  const phase: EducationPhase =
    progress < 0.38
      ? "school"
      : progress < 0.47
        ? "transition"
        : "college";

  const schoolProgress =
    clamp(
      progress / 0.38,
    );

  const transitionProgress =
    clamp(
      (progress - 0.38) /
        0.09,
    );

  const collegeProgress =
    clamp(
      (progress - 0.47) /
        0.53,
    );

  const school =
    getSchoolStage(
      schoolProgress,
    );

  const college =
    getCollegeStage(
      collegeProgress,
    );

  const schoolStage =
    schoolStages[
      school.index
    ]!;

  const collegeStage =
    collegeStages[
      college.index
    ]!;

  const isSchool =
    phase === "school";

  const activeStage =
    isSchool
      ? schoolStage
      : collegeStage;

  const activeLocal =
    isSchool
      ? school.local
      : college.local;

  const signals =
    isSchool
      ? schoolSignals
      : collegeSignals;

  const signalProgress =
    isSchool
      ? schoolProgress
      : collegeProgress;

  const signalIndex =
    Math.min(
      signals.length - 1,
      Math.floor(
        signalProgress *
          signals.length,
      ),
    );

  return (
    <section
      ref={sectionRef}
      className={`education-experience education-phase-${phase}`}
    >
      <div className="education-sticky">

        {/* BACKGROUND */}

        <div className="education-background">
          <div className="education-noise" />

          <div className="education-grid" />

          <div className="education-glow education-glow-one" />

          <div className="education-glow education-glow-two" />
        </div>

        {/* HEADER */}

        <header className="education-header">
          <div className="education-brand">
            <span>
              EDUCATION
            </span>

            <small>
              THE SYSTEM BEHIND THE BUILDER
            </small>
          </div>

          <div className="education-live">
            <i />

            ACADEMIC SYSTEM / ACTIVE
          </div>

          <div className="education-index">
            {isSchool
              ? schoolStage.number
              : collegeStage.number}

            <span>/</span>

            {isSchool
              ? "04"
              : "06"}
          </div>
        </header>

        {/* SIDE MARKERS */}

        <div className="education-side-marker education-side-marker-left">
          <span>
            {isSchool
              ? "SCHOOL YEARS"
              : phase ===
                  "transition"
                ? "TRANSITION"
                : "ENGINEERING"}
          </span>

          <i />

          <strong>
            {isSchool
              ? "2020—2023"
              : phase ===
                  "transition"
                ? "2023"
                : "2023—2027"}
          </strong>
        </div>

        <div className="education-side-marker education-side-marker-right">
          <span>
            KANPUR / INDIA
          </span>

          <strong>
            {String(
              Math.round(
                progress * 100,
              ),
            ).padStart(3, "0")}
          </strong>
        </div>

        {/* MAIN */}

        <main className="education-main">

          {/* COPY */}

          <div className="education-copy">

            <div className="education-stage-meta">
              <span>
                {activeStage.number}
              </span>

              <i />

              <span>
                {isSchool
                  ? "2020 → 2023"
                  : phase ===
                      "transition"
                    ? "2023"
                    : "2023 → 2027"}
              </span>
            </div>

            <span className="education-eyebrow">
              {activeStage.eyebrow}
            </span>

            <h1>
              {activeStage.title}
            </h1>

            <p>
              {
                activeStage.description
              }
            </p>

            {/* SCHOOL INSTITUTION */}

            {isSchool && (
              <div className="education-institution">
                <strong>
                  Dr Virendra Swarup
                  Memorial Public
                  School
                </strong>

                <span>
                  Civil Lines,
                  Kanpur, India
                </span>
              </div>
            )}

            {/* COLLEGE INSTITUTION */}

            {!isSchool &&
              phase !==
                "transition" && (
                <div className="education-institution">
                  <strong>
                    Maharana Pratap
                    Group of
                    Institutions
                  </strong>

                  <span>
                    Kanpur, India
                  </span>
                </div>
              )}

            <div className="education-status">
              <i />

              <span>
                {isSchool
                  ? "SCHOOL / FOUNDATION"
                  : phase ===
                      "transition"
                    ? "DIRECTION SHIFT"
                    : "B.TECH / AI & ML"}
              </span>

              <strong>
                {String(
                  Math.round(
                    activeLocal * 100,
                  ),
                ).padStart(
                  3,
                  "0",
                )}
              </strong>
            </div>
          </div>

          {/* VISUAL */}

          <div className="education-visual">

  <div
    className="education-visual-layer education-visual-school"
    style={{
      opacity:
        phase === "school"
          ? 1
          : phase === "transition"
            ? 1 - transitionProgress
            : 0,
      transform: `
        translate3d(
          ${phase === "school" ? 0 : -18}px,
          0,
          0
        )
        scale(
          ${phase === "school"
            ? 1
            : 0.96 + transitionProgress * 0.04}
        )
      `,
      pointerEvents:
        phase === "school"
          ? "auto"
          : "none",
    }}
  >
    <SchoolVisual
      progress={schoolProgress}
      stageIndex={school.index}
    />
  </div>

  <div
    className="education-visual-layer education-visual-transition"
    style={{
      opacity:
        phase === "transition"
          ? 1
          : 0,
      transform: `
        translate3d(
          0,
          ${phase === "transition"
            ? 0
            : 10}px,
          0
        )
        scale(
          ${phase === "transition"
            ? 1
            : 0.97}
        )
      `,
      pointerEvents: "none",
    }}
  >
    <TransitionVisual
      progress={transitionProgress}
    />
  </div>

  <div
    className="education-visual-layer education-visual-college"
    style={{
      opacity:
        phase === "college"
          ? 1
          : phase === "transition"
            ? transitionProgress
            : 0,
      transform: `
        translate3d(
          ${phase === "college"
            ? 0
            : 18}px,
          0,
          0
        )
        scale(
          ${phase === "college"
            ? 1
            : 0.96}
        )
      `,
      pointerEvents:
        phase === "college"
          ? "auto"
          : "none",
    }}
  >
    <CollegeOrbit
      progress={collegeProgress}
      stageIndex={college.index}
    />
  </div>

</div>
          {/* DATA */}

          <aside className="education-data">

            {isSchool && (
              <>
                <div>
                  <span>
                    PERIOD
                  </span>

                  <strong>
                    2020—2023
                  </strong>
                </div>

                <div>
                  <span>
                    LEVEL
                  </span>

                  <strong>
                    SENIOR
                    SECONDARY
                  </strong>
                </div>

                <div>
                  <span>
                    FOCUS
                  </span>

                  <strong>
                    MATH × CS
                  </strong>
                </div>

                <div>
                  <span>
                    SIGNAL
                  </span>

                  <strong>
                    CREATIVE
                  </strong>
                </div>
              </>
            )}

            {!isSchool &&
              phase !==
                "transition" && (
                <>
                  <div>
                    <span>
                      PERIOD
                    </span>

                    <strong>
                      2023—2027
                    </strong>
                  </div>

                  <div>
                    <span>
                      DEGREE
                    </span>

                    <strong>
                      B.TECH
                    </strong>
                  </div>

                  <div>
                    <span>
                      DISCIPLINE
                    </span>

                    <strong>
                      AI / ML
                    </strong>
                  </div>

                  <div>
                    <span>
                      STATUS
                    </span>

                    <strong>
                      YEAR 04
                    </strong>
                  </div>
                </>
              )}
          </aside>
        </main>

        {/* TRANSITION LABEL */}

        <div
          className="education-chapter"
          style={{
            opacity:
              phase ===
              "transition"
                ? 1
                : 0,
          }}
        >
          <span>
            CHAPTER 02
          </span>

          <strong>
            FROM FOUNDATION
            <br />
            TO ENGINEERING
          </strong>
        </div>

        {/* COLLEGE END */}

        {phase ===
          "college" && (
          <CollegeEndState
            progress={
              collegeProgress
            }
          />
        )}

        {/* SIGNAL */}

        <div className="education-signal">
          <span>
            ACTIVE SIGNAL
          </span>

          <strong>
            {signals[
              signalIndex
            ]}
          </strong>

          <div>
            {signals.map(
              (
                signal,
                index,
              ) => (
                <i
                  key={signal}
                  className={
                    index <=
                    signalIndex
                      ? "active"
                      : ""
                  }
                />
              ),
            )}
          </div>
        </div>

        {/* TIMELINE */}

        <div className="education-timeline">

          <div className="education-timeline-track">
            <i
              style={{
                width: `${
                  progress * 100
                }%`,
              }}
            />
          </div>

          <div
            className={`education-timeline-chapter ${
              isSchool
                ? "active"
                : ""
            }`}
          >
            <span />

            <strong>
              SCHOOL
            </strong>

            <small>
              2020
            </small>
          </div>

          <div
            className={`education-timeline-transition ${
              phase ===
              "transition"
                ? "active"
                : ""
            }`}
          >
            <span />

            <strong>
              2023
            </strong>
          </div>

          <div
            className={`education-timeline-chapter education-timeline-college ${
              phase ===
                "college"
                ? "active"
                : ""
            }`}
          >
            <span />

            <strong>
              COLLEGE
            </strong>

            <small>
              2027
            </small>
          </div>
        </div>

        {/* FOOTER */}

        <footer className="education-footer">

          <span>
            2020 → 2027
          </span>

          <span>
            SCHOOL × AI × ENGINEERING
          </span>

          <span>
            {String(
              Math.round(
                progress * 100,
              ),
            ).padStart(
              3,
              "0",
            )}
          </span>
        </footer>
      </div>

      {/* SCROLL SPACE */}

      <div className="education-scroll-space" />
    </section>
  );
}