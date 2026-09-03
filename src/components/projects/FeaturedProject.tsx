"use client";

import { useEffect, useRef, useState } from "react";
import "./featured-project.css";

export function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();

      const viewport = window.innerHeight;

      const progress = Math.min(
        Math.max(
          (viewport - rect.top) /
            (viewport + rect.height),
          0
        ),
        1
      );

      setScrollProgress(progress);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      section.style.setProperty(
        "--mouse-x",
        `${x * 30}px`
      );

      section.style.setProperty(
        "--mouse-y",
        `${y * 30}px`
      );
    };

    const resetPointer = () => {
      section.style.setProperty(
        "--mouse-x",
        "0px"
      );

      section.style.setProperty(
        "--mouse-y",
        "0px"
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    section.addEventListener(
      "pointermove",
      handlePointer
    );

    section.addEventListener(
      "pointerleave",
      resetPointer
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      section.removeEventListener(
        "pointermove",
        handlePointer
      );

      section.removeEventListener(
        "pointerleave",
        resetPointer
      );
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="featured-project"
      style={
        {
          "--scroll-progress":
            scrollProgress,
        } as React.CSSProperties
      }
    ><div className="sentinel-background" />
      {/* Ambient system field */}

      <div className="sentinel-grid" />

      <div className="sentinel-glow" />

      <div className="sentinel-orbit orbit-one" />
      <div className="sentinel-orbit orbit-two" />
      <div className="sentinel-orbit orbit-three" />

      {/* Background telemetry */}

      <div className="sentinel-telemetry telemetry-one">
  <span>INPUT</span>
  <strong>INCIDENT</strong>
</div>

<div className="sentinel-telemetry telemetry-two">
  <span>CONTEXT</span>
  <strong>RETRIEVED</strong>
</div>

<div className="sentinel-telemetry telemetry-three">
  <span>ANALYSIS</span>
  <strong>GROUNDED</strong>
</div>

      {/* Main */}

      <div className="sentinel-content">

        <div className="sentinel-topline">
          <span>01</span>

          <span>
            FEATURED SYSTEM
          </span>

          <span className="sentinel-status">
            CURRENTLY BUILDING
          </span>
        </div>

        <div className="sentinel-main">

          <div className="sentinel-title-block">

            <p className="sentinel-eyebrow">
              AUTONOMOUS AI INCIDENT INVESTIGATION
            </p>

            <h2>SENTINEL</h2>

            <div className="sentinel-title-line" />

            <p className="sentinel-description">
              Production incidents shouldn't
              require hours of investigation.
            </p>

            <div className="sentinel-stack">
              <span>JAVA</span>
              <span>SPRING BOOT</span>
              <span>RAG</span>
              <span>GEMINI</span>
            </div>

          </div>

          {/* Investigation interface */}

          <div className="sentinel-panel">

            <div className="sentinel-panel-header">
              <span>
                AI INCIDENT INTELLIGENCE
              </span>

              <span>
                LIVE
              </span>
            </div>

            <div className="sentinel-signal">

              <div className="signal-ring ring-one" />
              <div className="signal-ring ring-two" />
              <div className="signal-ring ring-three" />

              <div className="signal-core">
                <span>AI</span>
              </div>
<div className="signal-connection connection-a" />
<div className="signal-connection connection-b" />
<div className="signal-connection connection-c" />
<div className="signal-connection connection-d" />
              <div className="signal-node node-a">
                RAG
              </div>

              <div className="signal-node node-b">
                GEMINI
              </div>

              <div className="signal-node node-c">
                HISTORY
              </div>

              <div className="signal-node node-d">
                ROOT CAUSE
              </div>

              <div className="signal-pulse" />

            </div>

            <div className="sentinel-panel-footer">

  <div className="sentinel-analysis-state">
    <span className="analysis-dot" />
    <span>INCIDENT ANALYSIS</span>
  </div>

  <span className="sentinel-arrow">
    ↓
  </span>

  <div className="sentinel-analysis-result">
    <span>EVIDENCE-GROUNDED DIAGNOSIS</span>
    <span className="analysis-scan" />
  </div>

</div>

          </div>

        </div>

        <div className="sentinel-bottom">

          <span>
            AUTONOMOUS INCIDENT INTELLIGENCE
          </span>

          <span className="sentinel-scroll">
            EXPLORE SYSTEM ↓
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
    </section>
  );
}
