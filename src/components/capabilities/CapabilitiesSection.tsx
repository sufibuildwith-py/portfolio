"use client";

import { useEffect, useRef } from "react";
import "./Capabilities.css";

type Region = {
  id: string;
  number: string;
  biome: string;
  title: string;
  eyebrow: string;
  description: string;
  technologies: string[];
};

const regions: Region[] = [
  { id: "intelligence", number: "01", biome: "FOREST / COGNITION", title: "INTELLIGENCE", eyebrow: "AI SYSTEMS", description: "Building practical AI systems around language models, retrieval, NLP, prompt engineering, automation, and intelligent decision-making.", technologies: ["LLMs", "RAG", "NLP", "GENERATIVE AI", "PROMPT ENGINEERING", "AUTOMATION"] },
  { id: "ARCHITECTURE", number: "02", biome: "DESERT / ARCHITECTURE", title: "ARCHITECTURE", eyebrow: "BACKEND SYSTEMS", description: "Designing backend services and APIs that connect applications, data, external services, and intelligent systems.", technologies: ["JAVA", "REST APIs", "SPRING", "MAVEN", "POSTMAN", "LLM API INTEGRATION"] },
  { id: "engineering", number: "03", biome: "DEEP OCEAN / ENGINEERING", title: "ENGINEERING", eyebrow: "SOFTWARE", description: "Turning ideas into maintainable software through structured development, debugging, version control, and system thinking.", technologies: ["GIT", "PYTHON", "C++", "JAVA", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS"] },
  { id: "systems", number: "04", biome: "TERRAIN / DATA", title: "SYSTEMS", eyebrow: "DATA & AUTOMATION", description: "Working with application data, APIs, structured information, persistence layers, OCR pipelines, and offline workflows.", technologies: ["MONGODB", "JSON", "DATABASES", "OCR", "DATA", "POSTMAN", "OFFLINE APPLICATIONS"] },
];

type Star = { x: number; y: number; size: number; opacity: number; phase: number };
const random = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const stars: Star[] = Array.from({ length: 140 }, (_, index) => ({
  x: random(index + 1),
  y: random(index + 193),
  size: 0.25 + random(index + 387) * 1.35,
  opacity: 0.15 + random(index + 571) * 0.65,
  phase: random(index + 761) * Math.PI * 2,
}));
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const range = (value: number, start: number, end: number) => smooth((value - start) / (end - start));

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const diveRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const activeNumberRef = useRef<HTMLSpanElement>(null);
  const regionRefs = useRef<(HTMLElement | null)[]>([]);
  const biomeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRefs = useRef<(HTMLSpanElement | null)[]>([]);
const forestRef = useRef<HTMLDivElement>(null);
const desertRef = useRef<HTMLDivElement>(null);
const oceanRef = useRef<HTMLDivElement>(null);
const terrainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const forest = forestRef.current;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const planet = planetRef.current;
    const clouds = cloudsRef.current;
    const atmosphere = atmosphereRef.current;
    const dive = diveRef.current;
    const hud = hudRef.current;
    const intro = introRef.current;
    const progressFill = progressRef.current;
    const activeNumber = activeNumberRef.current;
   if (
  !section ||
  !canvas ||
  !planet ||
  !clouds ||
  !atmosphere ||
  !dive ||
  !hud ||
  !intro ||
  !progressFill ||
  !activeNumber ||
  !forest
) return;    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let destroyed = false;
    let targetProgress = 0;
    let currentProgress = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let width = 0;
    let height = 0;
    let previousTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      targetProgress = clamp(-rect.top / Math.max(section.offsetHeight - window.innerHeight, 1));
    };
    const move = (event: PointerEvent) => {
      targetMouseX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetMouseY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    const drawStars = (time: number, intensity: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const pulse = 0.72 + Math.sin(time * 0.001 + star.phase) * 0.28;
        context.beginPath();
        context.fillStyle = `rgba(235,240,255,${star.opacity * pulse * intensity})`;
        context.arc(star.x * width + mouseX * 10, star.y * height + mouseY * 7, star.size, 0, Math.PI * 2);
        context.fill();
      }
    };
    const animate = (time: number) => {
      if (destroyed) return;
      const delta = Math.min(32, time - previousTime);
      previousTime = time;
      currentProgress += (targetProgress - currentProgress) * (1 - Math.pow(0.0005, delta / 16.667));
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;
      const progress = currentProgress;

      // 00–.12 intro, .08–.25 orbital approach, .22–.35 atmospheric dive,
      // then four surface regions (.35–.50, .50–.65, .65–.80, .80–.95).
      const introExit = range(progress, 0.02, 0.12);
      const orbit = range(progress, 0.06, 0.25);
      const diveProgress = range(progress, 0.22, 0.35);
      /*
 * FOREST ENVIRONMENT
 *
 * Appears only after the planetary dive.
 *
 * 0.94 → 1.00
 */

// ============================================================
// 01 — FOREST ENVIRONMENT
// Appears immediately after the planetary dive.
// Forest is the environment belonging to capability 01.
// ============================================================

const forestEnter = range(progress, 0.325, 0.375);
const forestExit = range(progress, 0.475, 0.525);

const forestProgress = clamp(
  forestEnter * (1 - forestExit)
);

const forestEase = smooth(forestProgress);

const forestScale = 1.0 + forestEase * 0.005;

forest.style.opacity =
  `${forestProgress}`;

forest.style.transform = `
  translate3d(
    ${mouseX * -20}px,
    ${mouseY * -16}px,
    0
  )
  scale(${forestScale})
`;

const forestImage =
  forest.querySelector(
    ".forest-image",
  ) as HTMLDivElement | null;

const forestFog =
  forest.querySelector(
    ".forest-fog",
  ) as HTMLDivElement | null;

if (forestImage) {
  forestImage.style.transform = `
  translate3d(
    ${mouseX * -12}px,
    ${mouseY * -9}px,
    0
  )
  scale(${1 + forestEase * 0.45})
`;
}

if (forestFog) {
  forestFog.style.transform = `
    translate3d(
      ${mouseX * 20}px,
      ${-forestEase * 45 + mouseY * 14}px,
      0
    )
    scale(${1.08 + forestEase * 0.25})
  `;

  forestFog.style.opacity =
    `${0.45 + forestEase * 0.4}`;
}
// DESERT ENVIRONMENT
// Appears during the Architecture / Desert section.
// 0.50 → 0.65

const desert = desertRef.current;

if (desert) {
  const desertProgress = range(progress, 0.50, 0.65);
  const desertEase = smooth(desertProgress);

  const desertOpacity =
    smooth(range(progress, 0.48, 0.52)) *
    (1 - smooth(range(progress, 0.63, 0.67)));

  desert.style.opacity = `${desertOpacity}`;

  // KEEP THIS LOW — same principle as the forest fix
  desert.style.transform = `
    translate3d(
      ${mouseX * -18}px,
      ${mouseY * -14}px,
      0
    )
    scale(${1.0 + desertEase * 0.005})
  `;

  const desertImage =
    desert.querySelector(".desert-image") as HTMLDivElement | null;

  const desertFog =
    desert.querySelector(".desert-fog") as HTMLDivElement | null;

  if (desertImage) {
    desertImage.style.transform = `
      translate3d(
        ${mouseX * -12}px,
        ${mouseY * -9}px,
        0
      )
      scale(${1.0 + desertEase * 0.005})
    `;
  }

  if (desertFog) {
    desertFog.style.transform = `
      translate3d(
        ${mouseX * 14}px,
        ${mouseY * 10}px,
        0
      )
      scale(${1.02 + desertEase * 0.02})
    `;

    desertFog.style.opacity = `${0.35 + desertEase * 0.2}`;
  }
} //next 
const ocean = oceanRef.current;

if (ocean) {
  // DEEP OCEAN ENVIRONMENT
  // 0.65 → 0.80

  const oceanProgress = range(progress, 0.65, 0.80);
  const oceanEase = smooth(oceanProgress);

  const oceanOpacity =
    smooth(range(progress, 0.63, 0.67)) *
    (1 - smooth(range(progress, 0.78, 0.82)));

  ocean.style.opacity = `${oceanOpacity}`;

  ocean.style.transform = `
    translate3d(
      ${mouseX * -16}px,
      ${mouseY * -12}px,
      0
    )
    scale(${1.0 + oceanEase * 0.005})
  `;

  const oceanImage =
    ocean.querySelector(".ocean-image") as HTMLDivElement | null;

  const oceanFog =
    ocean.querySelector(".ocean-fog") as HTMLDivElement | null;

  if (oceanImage) {
    oceanImage.style.transform = `
      translate3d(
        ${mouseX * -10}px,
        ${mouseY * -8}px,
        0
      )
      scale(${1.0 + oceanEase * 0.005})
    `;
  }

  if (oceanFog) {
    oceanFog.style.transform = `
      translate3d(
        ${mouseX * 12}px,
        ${oceanEase * -18 + mouseY * 8}px,
        0
      )
      scale(${1.02 + oceanEase * 0.02})
    `;

    oceanFog.style.opacity = `${0.4 + oceanEase * 0.25}`;
  }
}//next idhr dalna
const terrain = terrainRef.current;

if (terrain) {
  // TERRAIN ENVIRONMENT
  // 0.80 → 0.95

  const terrainProgress = range(progress, 0.80, 0.95);
  const terrainEase = smooth(terrainProgress);

  const terrainOpacity =
    smooth(range(progress, 0.78, 0.82)) *
    (1 - smooth(range(progress, 0.93, 0.97)));

  terrain.style.opacity = `${terrainOpacity}`;

  terrain.style.transform = `
    translate3d(
      ${mouseX * -16}px,
      ${mouseY * -12}px,
      0
    )
    scale(${1.0 + terrainEase * 0.005})
  `;

  const terrainImage =
    terrain.querySelector(".terrain-image") as HTMLDivElement | null;

  const terrainFog =
    terrain.querySelector(".terrain-fog") as HTMLDivElement | null;

  if (terrainImage) {
    terrainImage.style.transform = `
      translate3d(
        ${mouseX * -10}px,
        ${mouseY * -8}px,
        0
      )
      scale(${1.0 + terrainEase * 0.005})
    `;
  }

  if (terrainFog) {
    terrainFog.style.transform = `
      translate3d(
        ${mouseX * 12}px,
        ${terrainEase * -15 + mouseY * 8}px,
        0
      )
      scale(${1.02 + terrainEase * 0.02})
    `;

    terrainFog.style.opacity = `${0.35 + terrainEase * 0.2}`;
  }
}
      const exit = range(progress, 0.95, 1);

      intro.style.opacity = `${(1 - introExit) * (1 - exit)}`;
      intro.style.visibility = introExit < 0.99 ? "visible" : "hidden";
      intro.style.transform = `translate3d(${mouseX * -8}px, ${-introExit * 80}px, 0) scale(${1 - introExit * 0.08})`;
      planet.style.opacity = `${(1 - diveProgress * 0.9) * (1 - exit)}`;
     planet.style.transform = `translate3d(
  calc(-50% + ${mouseX * 10}px),
  calc(-50% + ${mouseY * 8}px),
  0
) scale(${0.72 + orbit * 0.28 + diveProgress * 0.55})`;

clouds.style.transform = `translate3d(
  calc(-50% + ${mouseX * -10}px),
  calc(-50% + ${mouseY * -8}px),
  0
) rotateZ(${progress * 12}deg)
scale(${0.76 + orbit * 0.25 + diveProgress * 0.45})`;

dive.style.transform = `translate3d(0, 0, 0)
scale(${1 + diveProgress * 0.12})`;
      atmosphere.style.opacity = `${(0.25 + orbit * 0.45 + diveProgress * 0.3) * (1 - exit)}`;
      dive.style.opacity = `${diveProgress * (1 - range(progress, 0.34, 0.42))}`;
      dive.style.transform = `translate3d(${mouseX * -8}px, ${mouseY * -8}px, 0) scale(${0.75 + diveProgress * 2.25})`;

      let activeIndex = -1;
      regionRefs.current.forEach((region, index) => {
        const start = 0.35 + index * 0.15;
        const end = start + 0.15;
        const enter = range(progress, start - 0.035, start + 0.035);
        const leave = range(progress, end - 0.025, end + 0.04);
        const local = clamp((progress - start) / (end - start));
        const center = smooth(1 - Math.abs(local - 0.5) * 2);
        const opacity = clamp(enter * (1 - leave)) * (1 - exit);
        if (center > 0.62 && opacity > 0.3) activeIndex = index;
        if (region) {
          region.style.opacity = `${opacity}`;
          region.style.transform = `translate3d(calc(-50% + ${mouseX * 14}px), calc(-50% + ${(1 - center) * 55 + mouseY * 8}px), ${center * 18}px) rotateX(${mouseY * -1.1}deg) rotateY(${(0.5 - local) * 2 + mouseX * 1.5}deg) scale(${0.965 + center * 0.035})`;
          region.dataset.active = center > 0.68 ? "true" : "false";
        }
        const biome = biomeRefs.current[index];
        if (biome) {
          biome.style.opacity = `${clamp(enter * (1 - leave)) * (1 - exit)}`;
          biome.style.transform = `scale(${1.05 + local * 0.08}) translate3d(${mouseX * (index % 2 ? -16 : 16)}px, ${mouseY * 12}px, 0)`;
        }
      });
      indexRefs.current.forEach((item, index) => item?.classList.toggle("active", index === activeIndex));
     activeNumber.textContent =
  progress < 0.13 || activeIndex < 0
    ? "00"
    : regions[activeIndex]?.number ?? "00";
    const hudOpacity = 1 - exit;
      hud.style.opacity = `${hudOpacity}`;
      hud.style.visibility = hudOpacity > 0.01 ? "visible" : "hidden";
      progressFill.style.transform = `scaleX(${Math.max(progress, 0.003)})`;
      drawStars(time, 0.65 + orbit * 0.35);
      frame = requestAnimationFrame(animate);
    };
    resize(); updateScroll();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => { destroyed = true; cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("scroll", updateScroll); window.removeEventListener("pointermove", move); };
  }, []);

  return <section ref={sectionRef} id="capabilities" className="capabilities-section">
    <div className="capabilities-viewport">
      <canvas ref={canvasRef} className="capabilities-starfield" aria-hidden="true" />
      <div className="capabilities-space" aria-hidden="true" /><div className="capabilities-vignette" aria-hidden="true" />
      <div className="capabilities-stage" aria-hidden="true"><div ref={atmosphereRef} className="planet-atmosphere" /><div ref={planetRef} className="capabilities-planet"><div className="planet-surface" /><div className="planet-night" /><div className="planet-light" /><div className="planet-continent planet-continent-a" /><div className="planet-continent planet-continent-b" /><div className="planet-continent planet-continent-c" /><div className="planet-rim" /></div><div ref={cloudsRef} className="planet-clouds" /></div>
      <div
  ref={forestRef}
  className="capability-environment capability-forest"
  aria-hidden="true"
>
  <div className="forest-image" />
  <div className="forest-fog" />
  <div className="forest-vignette" />
</div>
<div
  ref={desertRef}
  className="capability-environment capability-desert"
  aria-hidden="true"
>
  <div className="desert-image" />
  <div className="desert-fog" />
  <div className="desert-vignette" />
</div>
<div
  ref={oceanRef}
  className="capability-environment capability-ocean"
  aria-hidden="true"
>
  <div className="ocean-image" />
  <div className="ocean-fog" />
  <div className="ocean-vignette" />
</div>
<div
  ref={terrainRef}
  className="capability-environment capability-terrain"
  aria-hidden="true"
>
  <div className="terrain-image" />
  <div className="terrain-fog" />
  <div className="terrain-vignette" />
</div>
      <div ref={diveRef} className="capabilities-dive" aria-hidden="true"><div className="dive-cloud dive-cloud-a" /><div className="dive-cloud dive-cloud-b" /><div className="dive-cloud dive-cloud-c" /><div className="dive-surface" /></div>
      <div className="capability-biomes" aria-hidden="true">{regions.map((region, index) => <div key={region.id} ref={(node) => { biomeRefs.current[index] = node; }} className={`capability-biome biome-${region.id}`} />)}</div>
      <div ref={hudRef} className="capabilities-interface">
        <header className="capabilities-topbar"><div className="topbar-brand"><span>03</span><i />CAPABILITIES</div><div className="topbar-state"><b />SYSTEM ONLINE</div></header>
        <div ref={introRef} className="capabilities-intro"><span className="intro-kicker">ENGINEERING PROFILE / 03</span><h2>CAPABILITIES</h2><p>SCROLL TO ENTER THE SYSTEM</p><div className="intro-line" /></div>
        <div className="capability-counter"><span ref={activeNumberRef}>00</span><i /><small>/ 04</small></div>
        <main className="capability-regions">{regions.map((region, index) => <article key={region.id} ref={(node) => { regionRefs.current[index] = node; }} className="capability-region"><div className="region-top"><div className="region-meta"><span>{region.number}</span><i /><small>{region.biome}</small></div><div className="region-status"><b />ACTIVE</div></div><div className="region-copy"><span>{region.eyebrow}</span><h3>{region.title}</h3><p>{region.description}</p></div><div className="region-tech">{region.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="region-footer"><span>SYSTEM / {region.number}</span><span>0{index + 1} / 04</span></div></article>)}</main>
        <aside className="capability-index">{regions.map((region, index) => <span key={region.id} ref={(node) => { indexRefs.current[index] = node; }}>{region.number}</span>)}</aside>
        <div className="capabilities-bottom"><span>SCROLL / EXPLORE</span><div className="bottom-track"><span ref={progressRef} /></div><span>AI · BACKEND · SOFTWARE · DATA</span></div>
      </div>
    </div>
  </section>;
}
