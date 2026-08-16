"use client";

import React, { useEffect, useRef, useState } from "react";

import "./Certification.css";

type Certification = {
  id: string;
  index: string;
  issuer: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  featured?: boolean;
};

const certifications: Certification[] = [
  {
    id: "docker",
    index: "01",
    issuer: "LINKEDIN LEARNING",
    title: "Learning Docker",
    category: "CONTAINERIZATION",
    description:
      "Practical foundation in containerization, Docker workflows, images, containers, and modern development environments.",
    skills: ["Docker", "Containers"],
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/d538eb2c2b85f4f38469f9aef23e8b359171dc333d66151a11ce728ec03ca83f/",
  },
  {
    id: "genai",
    index: "02",
    issuer: "MICROSOFT",
    title: "Build Your Generative AI Productivity Skills",
    category: "GENERATIVE AI",
    description:
      "Exploration of generative AI concepts and practical productivity workflows using modern AI tools.",
    skills: ["Generative AI", "AI for Business", "Prompting"],
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/60bea521f1b212b1365bb3714022dbc403416c9fb7894eef4b3b0555f8745513/",
    featured: true,
  },
  {
    id: "rest",
    index: "03",
    issuer: "LINKEDIN LEARNING",
    title: "Calling REST APIs with Java",
    category: "BACKEND ENGINEERING",
    description:
      "Working with RESTful services through Java, HTTP requests, responses, and API-driven application architecture.",
    skills: ["Java", "REST APIs"],
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/beecfd3f0d5505cc51d0c53a905d60784bc3cd42ee63ec7ba83599d24d20d4a4/",
  },
  {
    id: "llm",
    index: "04",
    issuer: "LINKEDIN LEARNING",
    title: "Introduction to Large Language Models",
    category: "ARTIFICIAL INTELLIGENCE",
    description:
      "Fundamentals of large language models, their capabilities, applications, and role in modern AI systems.",
    skills: ["LLMs", "Generative AI"],
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/e64160d65b340226d43105c74d039704e1f13f39a9e1f115241480d3ac3111b5/",
  },
  {
    id: "wells-fargo",
    index: "05",
    issuer: "WELLS FARGO × FORAGE",
    title: "Software Engineering Job Simulation",
    category: "SOFTWARE ENGINEERING",
    description:
      "Industry-oriented software engineering simulation focused on practical development workflows and engineering practices.",
    skills: ["GitHub", "Software Engineering"],
    credentialUrl:
      "https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/9Wvq4L2WCFQDyyPp3_nkmk7gJitYs4TBvoA_6a296e964de3917a921d35a5_1781110932249_completion_certificate.pdf",
    featured: true,
  },
  {
    id: "deloitte",
    index: "06",
    issuer: "DELOITTE",
    title: "Data Analytics Job Simulation",
    category: "DATA ANALYTICS",
    description:
      "A hands-on industry simulation designed around practical technical problem solving and professional workflows.",
    skills: [
      "Problem Solving",
      "Data Analytics",
      "Professional Workflows",
      "Dashboards",
      "Data Visualization",
    ],
    credentialUrl:
      "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a296e964de3917a921d35a5_1781102013510_completion_certificate.pdf",
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;

        if (scrollable <= 0) return;

        const rawProgress = -rect.top / scrollable;
        const nextProgress = clamp(rawProgress, 0, 1);

        setProgress(nextProgress);

        const index = Math.min(
          certifications.length - 1,
          Math.floor(nextProgress * certifications.length)
        );

        setActiveIndex(index);
      });
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const activeCertification = certifications[activeIndex]!;

  const scrollToCredential = (index: number) => {
    if (!sectionRef.current) return;

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top +
      window.scrollY;

    const scrollable =
      sectionRef.current.offsetHeight -
      window.innerHeight;

    const targetProgress =
      index / Math.max(certifications.length - 1, 1);

    window.scrollTo({
      top: sectionTop + scrollable * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section
  id="certifications"
  ref={sectionRef}
  className="certifications-experience"
>
      <div className="certifications-sticky">

        {/* BACKGROUND */}

        <div className="certifications-background">
          <div className="certifications-grid" />
          <div className="certifications-noise" />

          <div className="certifications-glow certifications-glow-one" />
          <div className="certifications-glow certifications-glow-two" />

          <div
            className="certifications-scanline"
            style={{
              transform: `translateY(${progress * 100}%)`,
            }}
          />
        </div>

        {/* HEADER */}

        <header className="certifications-header">
          <div className="certifications-brand">
            <span>CREDENTIALS</span>
            <small>TECHNICAL / PROFESSIONAL</small>
          </div>

          <div className="certifications-live">
            <i />
            VERIFIED LEARNING
          </div>

          <div className="certifications-index">
            <span>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            /
            {String(certifications.length).padStart(2, "0")}
          </div>
        </header>

        {/* SIDE MARKERS */}

        <div className="certifications-side-marker certifications-side-marker-left">
          <span>KNOWLEDGE SYSTEM</span>
          <i />
          <strong>
            {String(certifications.length).padStart(2, "0")} CREDENTIALS
          </strong>
        </div>

        <div className="certifications-side-marker certifications-side-marker-right">
          <strong>LEARN</strong>
          <span>APPLY</span>
          <span>VALIDATE</span>
        </div>

        {/* MAIN CONTENT */}

        <main className="certifications-main">

          {/* LEFT COPY */}

          <div className="certifications-copy">
            <div className="certifications-stage-meta">
              <span>
                {String(certifications.length).padStart(2, "0")}
              </span>

              <i />

              <span>VERIFIED CREDENTIALS</span>
            </div>

            <span className="certifications-eyebrow">
              CERTIFICATION / KNOWLEDGE
            </span>

            <h1>
              Learning
              <br />
              that became
              <br />
              <em>capability.</em>
            </h1>

            <p>
              A collection of technical certifications,
              AI learning programs, and industry simulations
              that strengthen the systems I build.
            </p>

            <div className="certifications-active-info">
              <span>CURRENT CREDENTIAL</span>

              <strong>
                {activeCertification.title}
              </strong>

              <small>
                {activeCertification.issuer}
              </small>
            </div>
          </div>

          {/* CENTER SYSTEM */}

          <div className="certifications-visual">
            <div className="certifications-orbit-system">

              <div className="certifications-orbit certifications-orbit-one" />
              <div className="certifications-orbit certifications-orbit-two" />
              <div className="certifications-orbit certifications-orbit-three" />

              <div className="certifications-crosshair certifications-crosshair-one" />
              <div className="certifications-crosshair certifications-crosshair-two" />

              {certifications.map((certification, index) => {
                const angle =
                  (index / certifications.length) * 360;

                const isActive = index === activeIndex;

                const distance =
                  Math.abs(index - activeIndex);

                return (
                  <button
                    key={certification.id}
                    className={`certifications-node ${
                      isActive ? "active" : ""
                    }`}
                    style={{
                      transform: `
                        rotate(${angle}deg)
                        translateY(-210px)
                        rotate(-${angle}deg)
                        scale(${isActive ? 1.08 : 0.92})
                      `,
                      opacity: distance > 2 ? 0.25 : 1,
                    }}
                    onClick={() =>
                      scrollToCredential(index)
                    }
                    aria-label={`View ${certification.title}`}
                  >
                    <i />
                    <span>{certification.index}</span>
                  </button>
                );
              })}

              {/* CORE */}

              <div className="certifications-core">
                <div className="certifications-core-glow" />

                <div className="certifications-core-ring certifications-core-ring-one" />
                <div className="certifications-core-ring certifications-core-ring-two" />

                <div className="certifications-core-inner">
                  <span>VERIFIED</span>

                  <strong>
                    {String(activeIndex + 1).padStart(2, "0")}
                  </strong>

                  <small>CREDENTIAL</small>
                </div>
              </div>

              {/* ACTIVE LABEL */}

              <div className="certifications-core-label">
                <span>
                  {activeCertification.category}
                </span>

                <strong>
                  {activeCertification.title}
                </strong>

                <small>
                  {activeCertification.issuer}
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT DATA PANEL */}

          <aside className="certifications-data">

            <div>
              <span>ISSUER</span>

              <strong>
                {activeCertification.issuer}
              </strong>
            </div>

            <div>
              <span>DOMAIN</span>

              <strong>
                {activeCertification.category}
              </strong>
            </div>

            <div>
              <span>SKILLS</span>

              <strong>
                {activeCertification.skills.join(" · ")}
              </strong>
            </div>

            <div>
              <span>STATUS</span>

              <strong className="certifications-status">
                <i />
                VERIFIED
              </strong>
            </div>

            <a
              href={activeCertification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certifications-credential-link"
            >
              VIEW CREDENTIAL
              <span>↗</span>
            </a>

          </aside>
        </main>

        {/* ACTIVE CERTIFICATE DETAIL */}

        <div className="certifications-detail">

          <div className="certifications-detail-number">
            {activeCertification.index}
          </div>

          <div className="certifications-detail-copy">

            <span>
              {activeCertification.category}
            </span>

            <h2>
              {activeCertification.title}
            </h2>

            <p>
              {activeCertification.description}
            </p>

            <div className="certifications-skills">
              {activeCertification.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>

          </div>

          <a
            href={activeCertification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="certifications-view"
          >
            <span>OPEN</span>
            <strong>CREDENTIAL ↗</strong>
          </a>

        </div>

        {/* SIGNAL */}

        <div className="certifications-signal">

          <span>KNOWLEDGE INDEX</span>

          <strong>
            {String(Math.round(progress * 100)).padStart(3, "0")}%
          </strong>

          <div>
            {certifications.map((_, index) => (
              <i
                key={index}
                className={
                  index <= activeIndex
                    ? "active"
                    : ""
                }
              />
            ))}
          </div>

        </div>

        {/* TIMELINE */}

        <div className="certifications-timeline">

          <div className="certifications-timeline-track">
            <i
              style={{
                width: `${progress * 100}%`,
              }}
            />
          </div>

          {certifications.map((certification, index) => (
            <button
              key={certification.id}
              className={`certifications-timeline-node ${
                index === activeIndex ? "active" : ""
              }`}
              style={{
                left: `${
                  (index /
                    Math.max(certifications.length - 1, 1)) *
                  100
                }%`,
              }}
              onClick={() =>
                scrollToCredential(index)
              }
              aria-label={`Jump to ${certification.title}`}
            >
              <span />
              <strong>
                {certification.index}
              </strong>
            </button>
          ))}

        </div>

        {/* FOOTER */}

        <footer className="certifications-footer">

          <span>
            SUFIYAN KHAN / PORTFOLIO
          </span>

          <span>
            CERTIFICATIONS
          </span>

          <span>
            LEARN → BUILD → VALIDATE
          </span>

        </footer>

      </div>

      <div className="certifications-scroll-space" />
    </section>
  );
}