"use client";

import { useEffect, useRef } from "react";
import { InteractiveField } from "./InteractiveField";

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      hero.style.setProperty("--mouse-x", `${x}%`);
      hero.style.setProperty("--mouse-y", `${y}%`);
    };

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();

      const progress = Math.min(
        Math.max(-rect.top / rect.height, 0),
        1,
      );

      hero.style.setProperty(
        "--scroll-progress",
        progress.toString(),
      );
    };

    hero.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="cinematic-hero">
      <InteractiveField />

      <div className="hero-light" />

      <div className="hero-content">
        <p className="hero-eyebrow">SUFIYAN BUILDS</p>

        <h1>
          <span className="hero-line hero-line-one">
            I BUILD
          </span>

          <span className="hero-line hero-line-two">
            THINGS.
          </span>
        </h1>

        <p className="hero-description">
          AI · Backend · Software Engineering
        </p>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}