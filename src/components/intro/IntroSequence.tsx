
"use client";

import { useEffect, useState } from "react";
import "./IntroSequence.css";

const WORDS = [
  "INNOVATOR",
  "DEVELOPER",
  "ARCHITECT",
  "AUTOMATOR",
  "ENGINEERS",
  "PORTFOLIO",
] as const;

const IDENTITY_WORDS = WORDS.slice(0, 5);

type Phase = "identity" | "portfolio" | "exit";

export default function IntroSequence() {
  const [visible, setVisible] = useState(true);
  const [word, setWord] = useState<string>(WORDS[0]);
  const [phase, setPhase] = useState<Phase>("identity");
  const [index, setIndex] = useState(0);

 useEffect(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    setWord("PORTFOLIO");
    setPhase("portfolio");

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }

  let wordIndex = 0;
  let animationFrame = 0;
  let startTime = performance.now();

  const WORD_DURATION = 1050;
  const PORTFOLIO_DURATION = 1700;

  const animate = (time: number) => {
    const elapsed = time - startTime;

    if (wordIndex < IDENTITY_WORDS.length) {
      if (elapsed >= WORD_DURATION) {
        wordIndex += 1;
        startTime = time;

        if (wordIndex < IDENTITY_WORDS.length) {
          setIndex(wordIndex);
          setWord(IDENTITY_WORDS[wordIndex]!);

          animationFrame =
            requestAnimationFrame(animate);

          return;
        }

        setWord("PORTFOLIO");
        setPhase("portfolio");

        startTime = time;

        animationFrame =
          requestAnimationFrame(animate);

        return;
      }

      animationFrame =
        requestAnimationFrame(animate);

      return;
    }

    if (phase === "portfolio") {
      if (elapsed >= PORTFOLIO_DURATION) {
        setPhase("exit");

        window.setTimeout(() => {
          setVisible(false);
        }, 900);

        return;
      }

      animationFrame =
        requestAnimationFrame(animate);
    }
  };

  setWord(IDENTITY_WORDS[0]!);
  setIndex(0);

  animationFrame =
    requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}, [phase]);

  const skipIntro = () => {
    sessionStorage.setItem(
      "portfolio-intro-seen",
      "true"
    );

    setPhase("exit");

    window.setTimeout(() => {
      setVisible(false);
    }, 350);
  };

  if (!visible) {
    return null;
  }

  const isPortfolio =
    phase === "portfolio";

  return (
    <div
      className={`intro-sequence ${
        isPortfolio ? "intro-portfolio" : ""
      } ${
        phase === "exit" ? "intro-exit" : ""
      }`}
      aria-hidden="true"
    >
      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}

      <div className="intro-stars intro-stars-one" />
      <div className="intro-stars intro-stars-two" />
      <div className="intro-stars intro-stars-three" />

      <div className="intro-orbit intro-orbit-one" />
      <div className="intro-orbit intro-orbit-two" />
      <div className="intro-orbit intro-orbit-three" />

      <div className="intro-orbit-dot intro-orbit-dot-one" />
      <div className="intro-orbit-dot intro-orbit-dot-two" />
      <div className="intro-orbit-dot intro-orbit-dot-three" />

      <div className="intro-vignette" />

      {/* =====================================================
          MAIN INTERFACE
          ===================================================== */}

      <div className="intro-interface">

        {/* ---------------------------------------------------
            TOP SYSTEM MARKER
            --------------------------------------------------- */}

        <div className="intro-topline">
          <span>SYS / 001</span>

          <span>
            PERSONAL SYSTEM
          </span>

          <span>2027</span>
        </div>

        {/* ---------------------------------------------------
            CENTER
            --------------------------------------------------- */}

        <div className="intro-center">

          <div className="intro-status">
            <span className="intro-status-dot" />

            <span>
              {isPortfolio
                ? "SYSTEM READY"
                : "IDENTITY / SCANNING"}
            </span>
          </div>

          <div className="intro-word-wrapper">

            <div
              key={word}
              className={`intro-word ${
                isPortfolio
                  ? "intro-word-final"
                  : ""
              }`}
            >
              {word}
            </div>

            <div className="intro-word-line" />

          </div>

          <div className="intro-subtitle">
            {isPortfolio
              ? "ACCESS GRANTED"
              : `IDENTITY / ${String(
                  index + 1
                ).padStart(2, "0")} — 05`}
          </div>

        </div>

        {/* ---------------------------------------------------
            BOTTOM
            --------------------------------------------------- */}

        <div className="intro-bottom">

          <div className="intro-progress">
            <span
              className="intro-progress-fill"
              style={{
                width: isPortfolio
                  ? "100%"
                  : `${((index + 1) / 5) * 100}%`,
              }}
            />
          </div>

          <div className="intro-footer-meta">

            <span>
              AI / BACKEND / SOFTWARE
            </span>

            <span>
              BUILDING SYSTEMS
            </span>

            <button
              className="intro-skip"
              onClick={skipIntro}
              aria-label="Skip introduction"
            >
              SKIP →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}