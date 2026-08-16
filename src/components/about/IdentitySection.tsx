"use client";

import { useEffect, useRef } from "react";
import "./Identity.css";
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

      section.style.setProperty(
        "--identity-mouse-x",
        `${x}`
      );

      section.style.setProperty(
        "--identity-mouse-y",
        `${y}`
      );

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
      section.style.setProperty(
        "--identity-mouse-x",
        "0"
      );

      section.style.setProperty(
        "--identity-mouse-y",
        "0"
      );
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

    section.addEventListener(
      "pointermove",
      handlePointerMove
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    /*
     * Slow ambient movement
     */
    const animate = () => {
      const time = performance.now();

      const driftX =
        Math.sin(time * 0.00018) * 18;

      const driftY =
        Math.cos(time * 0.00015) * 14;

      section.style.setProperty(
        "--identity-drift-x",
        `${driftX}px`
      );

      section.style.setProperty(
        "--identity-drift-y",
        `${driftY}px`
      );

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

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

      {/* Ambient system layers */}

      <div className="identity-atmosphere" />

      <div className="identity-grid" />

      <div className="identity-particles" />

      <div className="identity-scanline" />

      <div className="identity-inner">

        <div className="identity-label">
          <span>02</span>
          <span>ABOUT / SYSTEM</span>
        </div>

        <div className="identity-heading">

          <p className="identity-kicker">
            AI & SOFTWARE ENGINEERING
          </p>

          <h2>

            <span className="heading-line">
              AT THE INTERSECTION
            </span>

            <span className="heading-line heading-accent">
              OF AI & SOFTWARE.
            </span>

          </h2>

        </div>

        <div className="identity-bottom">

          <div className="identity-statement">

            <p>
              I'm Sufiyan — a B.Tech student specializing
              in Artificial Intelligence & Machine Learning,
              focused on backend engineering, AI applications,
              and practical software systems.
            </p>

            <p>
              I like understanding how systems behave,
              breaking difficult problems apart, and turning
              ideas into software that actually works.
            </p>

          </div>

          <div className="identity-status">

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

            <div>
              <span>FOCUS</span>
              <strong>AI × BACKEND</strong>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}