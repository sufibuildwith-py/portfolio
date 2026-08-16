"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
};

export function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const createPoints = () => {
      points = [];

      const spacing = window.innerWidth < 700 ? 42 : 55;

      for (let y = -spacing; y < height + spacing; y += spacing) {
        for (let x = -spacing; x < width + spacing; x += spacing) {
          points.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.3,
          });
        }
      }
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createPoints();
    };

    const pointerMove = (event: PointerEvent) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };

    const pointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      for (const point of points) {
        const distanceX = mouse.x - point.baseX;
        const distanceY = mouse.y - point.baseY;

        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        const influenceRadius = 190;

        let offsetX = 0;
        let offsetY = 0;

        if (distance < influenceRadius) {
          const strength = 1 - distance / influenceRadius;
          const force = strength * strength;

          offsetX = -distanceX * force * 0.18;
          offsetY = -distanceY * force * 0.18;
        }

        const driftX =
          Math.sin(time * 0.0002 * point.speed + point.phase) * 3;

        const driftY =
          Math.cos(time * 0.00015 * point.speed + point.phase) * 3;

        point.x +=
          point.baseX +
          offsetX +
          driftX -
          point.x;

        point.y +=
          point.baseY +
          offsetY +
          driftY -
          point.y;

        const edgeX = Math.min(point.x, width - point.x);
        const edgeY = Math.min(point.y, height - point.y);

        const edgeFade = Math.min(
          1,
          Math.max(0, Math.min(edgeX, edgeY) / 180),
        );

        const cursorDistance = Math.sqrt(
          (mouse.x - point.x) ** 2 +
            (mouse.y - point.y) ** 2,
        );

        const cursorGlow = Math.max(
          0,
          1 - cursorDistance / 260,
        );

        const opacity =
          (0.06 + cursorGlow * 0.22) * edgeFade;

        context.beginPath();

        context.arc(
          point.x,
          point.y,
          0.7 + cursorGlow * 1.2,
          0,
          Math.PI * 2,
        );

        context.fillStyle = `rgba(220, 220, 220, ${opacity})`;

        context.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerleave", pointerLeave);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-field" />;
}