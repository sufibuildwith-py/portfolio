"use client";

import { useEffect, useState } from "react";
import "./IntroSequence.css";

const WORDS = [
  "INNOVATOR",
  "DEVELOPER",
  "ARCHITECT",
  "AUTOMATOR",
  "ENGINEERS",
];

const FINAL_WORD = "PORTFOLIO";

const GLITCH_CHARS =
  "!@#$%^&*<>?/\\|[]{}01XZAI";

function randomChar() {
  return (
    GLITCH_CHARS[
      Math.floor(
        Math.random() * GLITCH_CHARS.length
      )
    ] ?? "X"
  );
}

function corruptWord(
  target: string,
  progress: number
) {
  return target
    .split("")
    .map((char, index) => {
      if (char === " ") {
        return " ";
      }

      const threshold =
        progress * target.length;

      if (index < threshold) {
        return char;
      }

      return Math.random() > 0.3
        ? randomChar()
        : char;
    })
    .join("");
}

export default function IntroSequence() {
  const [visible, setVisible] =
    useState(true);

  const [wordIndex, setWordIndex] =
    useState(0);

  const [displayWord, setDisplayWord] =
    useState(WORDS[0]);

  const [phase, setPhase] = useState<
    "identity" | "lock" | "exit"
  >("identity");

  useEffect(() => {
    /*
     * ---------------------------------------
     * ONLY SHOW ONCE PER SESSION
     * ---------------------------------------
     */

    const alreadyVisited =
      sessionStorage.getItem(
        "portfolio-intro-seen"
      );

    if (alreadyVisited) {
      setVisible(false);
      return;
    }

    /*
     * ---------------------------------------
     * REDUCED MOTION
     * ---------------------------------------
     */

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      setPhase("lock");
      setDisplayWord(FINAL_WORD);

      const timeout =
        window.setTimeout(() => {
          sessionStorage.setItem(
            "portfolio-intro-seen",
            "true"
          );

          setVisible(false);
        }, 1200);

      return () => {
        clearTimeout(timeout);
      };
    }

    /*
     * ---------------------------------------
     * TIMING
     * ---------------------------------------
     */

    const WORD_DURATION = 1100;
    const FINAL_DURATION = 1800;
    const EXIT_DURATION = 700;

    let animationFrame = 0;
    let finalTimeout = 0;
    let exitTimeout = 0;

    let currentWord = 0;

    let wordStart =
      performance.now();

    /*
     * ---------------------------------------
     * MAIN ANIMATION
     * ---------------------------------------
     */

    const animate = (time: number) => {
      const wordElapsed =
        time - wordStart;

      /*
       * -------------------------------------
       * MOVE TO NEXT WORD
       * -------------------------------------
       */

      if (
        wordElapsed >= WORD_DURATION &&
        currentWord <
          WORDS.length - 1
      ) {
        currentWord += 1;

        wordStart = time;

        setWordIndex(currentWord);
      }

      /*
       * -------------------------------------
       * FINAL IDENTITY WORD FINISHED
       * -------------------------------------
       */

      if (
        currentWord ===
          WORDS.length - 1 &&
        wordElapsed >= WORD_DURATION
      ) {
        setPhase("lock");
        setDisplayWord(FINAL_WORD);

        /*
         * Hold PORTFOLIO on screen
         */

        finalTimeout =
          window.setTimeout(() => {
            setPhase("exit");

            /*
             * Let the CSS exit animation play
             */

            exitTimeout =
              window.setTimeout(() => {
                sessionStorage.setItem(
                  "portfolio-intro-seen",
                  "true"
                );

                setVisible(false);
              }, EXIT_DURATION);
          }, FINAL_DURATION);

        return;
      }

      /*
       * -------------------------------------
       * GLITCH / WORD REVEAL
       * -------------------------------------
       */

      const progress = Math.min(
        wordElapsed /
          WORD_DURATION,
        1
      );

      /*
       * Keep the beginning heavily corrupted,
       * then progressively reveal the word.
       */

      const glitchProgress =
        Math.max(
          0,
          progress - 0.15
        ) / 0.85;

      const target =
        WORDS[currentWord];

      if (!target) {
        animationFrame =
          requestAnimationFrame(
            animate
          );

        return;
      }

      setDisplayWord(
        corruptWord(
          target,
          glitchProgress
        )
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    /*
     * ---------------------------------------
     * START
     * ---------------------------------------
     */

    animationFrame =
      requestAnimationFrame(
        animate
      );

    /*
     * ---------------------------------------
     * CLEANUP
     * ---------------------------------------
     */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      clearTimeout(
        finalTimeout
      );

      clearTimeout(
        exitTimeout
      );
    };
  }, []);

  /*
   * ---------------------------------------
   * SKIP INTRO
   * ---------------------------------------
   */

  const skipIntro = () => {
    sessionStorage.setItem(
      "portfolio-intro-seen",
      "true"
    );

    setPhase("exit");

    window.setTimeout(() => {
      setVisible(false);
    }, 250);
  };

  /*
   * ---------------------------------------
   * HIDDEN
   * ---------------------------------------
   */

  if (!visible) {
    return null;
  }

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <div
      className={`intro-sequence intro-${phase}`}
      aria-hidden="true"
    >

      {/* Atmospheric layers */}

      <div className="intro-noise" />

      <div className="intro-grid" />

      <div className="intro-scanlines" />

      <div className="intro-vignette" />

      {/* Glitch bars */}

      <div className="intro-glitch-bar intro-glitch-bar-1" />

      <div className="intro-glitch-bar intro-glitch-bar-2" />

      <div className="intro-glitch-bar intro-glitch-bar-3" />

      {/* Main interface */}

      <div className="intro-interface">

        {/* Top system information */}

        <div className="intro-topline">

          <span>
            SYS / 001
          </span>

          <span>
            PERSONAL SYSTEM
          </span>

          <span>
            2027
          </span>

        </div>

        {/* Center */}

        <div className="intro-center">

          <div className="intro-status">

            <i />

            <span>
              {phase === "lock"
                ? "IDENTITY LOCKED"
                : phase === "exit"
                ? "ACCESS GRANTED"
                : "IDENTITY SCAN"}
            </span>

          </div>

          {/* Word */}

          <div className="intro-word-wrapper">

            {/* Red glitch layer */}

            <span className="intro-word-glitch intro-word-red">
              {displayWord}
            </span>

            {/* Blue glitch layer */}

            <span className="intro-word-glitch intro-word-blue">
              {displayWord}
            </span>

            {/* Main word */}

            <h1
              className={`intro-word ${
                phase === "lock"
                  ? "intro-word-final"
                  : ""
              }`}
              data-text={displayWord}
            >
              {displayWord}
            </h1>

          </div>

          {/* Counter */}

          <div className="intro-subtitle">

            {phase === "lock"
              ? "SYSTEM READY"
              : phase === "exit"
              ? "ACCESS GRANTED"
              : `IDENTITY / ${String(
                  wordIndex + 1
                ).padStart(
                  2,
                  "0"
                )} — 05`}

          </div>

        </div>

        {/* Bottom */}

        <div className="intro-bottom">

          {/* Progress */}

          <div className="intro-progress">

            <span
              className="intro-progress-fill"
              style={{
                width:
                  phase === "lock"
                    ? "100%"
                    : `${Math.min(
                        ((wordIndex + 1) /
                          WORDS.length) *
                          100,
                        96
                      )}%`,
              }}
            />

          </div>

          {/* Metadata */}

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