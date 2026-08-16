"use client";

import { useEffect, useRef } from "react";

type SentinelFieldProps = {
  progress: number;
};

type Node = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  depth: number;
  phase: number;
};

export function SentinelField({
  progress,
}: SentinelFieldProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;

    let animationFrame = 0;

    const pointer = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    const nodes: Node[] = [];

    const nodeCount = 85;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        angle:
          (i / nodeCount) *
          Math.PI *
          2,

        radius:
          0.18 +
          Math.random() *
            0.42,

        speed:
          0.00004 +
          Math.random() *
            0.00012,

        size:
          0.5 +
          Math.random() * 1.5,

        depth:
          0.2 +
          Math.random() * 0.8,

        phase:
          Math.random() *
          Math.PI *
          2,
      });
    }

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const handlePointer = (
      event: PointerEvent
    ) => {
      pointer.targetX =
        event.clientX / width;

      pointer.targetY =
        event.clientY / height;
    };

    const render = (
      time: number
    ) => {
      const progress =
        progressRef.current;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * Smooth pointer
       */

      pointer.x +=
        (pointer.targetX -
          pointer.x) *
        0.035;

      pointer.y +=
        (pointer.targetY -
          pointer.y) *
        0.035;


      /*
       * FIELD CENTER
       */

      const cx =
        width *
        (0.5 +
          (pointer.x - 0.5) *
            0.025);

      const cy =
        height *
        (0.5 +
          (pointer.y - 0.5) *
            0.025);


      /*
       * CENTRAL ENERGY
       */

      const pulse =
        1 +
        Math.sin(
          time * 0.0012
        ) *
          0.08;

      const coreRadius =
        Math.min(
          width,
          height
        ) *
        (0.075 +
          progress * 0.08) *
        pulse;

      const core =
        ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          coreRadius * 5
        );

      core.addColorStop(
        0,
        "rgba(255,255,255,0.075)"
      );

      core.addColorStop(
        0.18,
        "rgba(255,255,255,0.035)"
      );

      core.addColorStop(
        0.55,
        "rgba(255,255,255,0.008)"
      );

      core.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = core;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );


      /*
       * ORBITAL NODES
       */

      const positions: {
        x: number;
        y: number;
        size: number;
        opacity: number;
      }[] = [];

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        const node = nodes[i];

        /*
         * Progress causes the network
         * to collapse toward the center.
         */

        const convergence =
          Math.max(
            0,
            progress - 0.35
          ) * 0.85;

        const radius =
          node.radius *
          Math.min(
            width,
            height
          ) *
          (1 -
            convergence);

        const rotation =
          node.angle +
          time *
            node.speed +
          progress *
            Math.PI *
            2;

        const wobble =
          Math.sin(
            time * 0.0006 +
              node.phase
          ) *
          4;

        const x =
          cx +
          Math.cos(rotation) *
            radius +
          wobble;

        const y =
          cy +
          Math.sin(rotation) *
            radius *
            0.68;

        const pointerDistance =
          Math.hypot(
            x -
              pointer.x *
                width,
            y -
              pointer.y *
                height
          );

        const influence =
          Math.max(
            0,
            1 -
              pointerDistance /
                260
          );

        const size =
          node.size +
          influence * 2;

        const opacity =
          0.06 +
          node.depth * 0.1 +
          influence * 0.35 +
          progress * 0.08;

        positions.push({
          x,
          y,
          size,
          opacity,
        });

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(255,255,255,${opacity})`;

        ctx.fill();
      }


      /*
       * CONNECTION NETWORK
       */

      const maxDistance =
        Math.min(
          width,
          height
        ) * 0.16;

      for (
        let i = 0;
        i < positions.length;
        i++
      ) {
        for (
          let j = i + 1;
          j <
            positions.length;
          j++
        ) {
          const a =
            positions[i];

          const b =
            positions[j];

          const distance =
            Math.hypot(
              a.x - b.x,
              a.y - b.y
            );

          if (
            distance >
            maxDistance
          )
            continue;

          const alpha =
            (1 -
              distance /
                maxDistance) *
            0.055;

          ctx.beginPath();

          ctx.moveTo(
            a.x,
            a.y
          );

          ctx.lineTo(
            b.x,
            b.y
          );

          ctx.strokeStyle =
            `rgba(255,255,255,${alpha})`;

          ctx.lineWidth =
            0.5;

          ctx.stroke();
        }
      }


      /*
       * ORBIT RINGS
       */

      for (
        let i = 0;
        i < 4;
        i++
      ) {
        const ring =
          coreRadius *
          (1.5 + i * 0.75);

        const rotation =
          time *
            0.00008 *
            (i % 2 === 0
              ? 1
              : -1);

        ctx.save();

        ctx.translate(
          cx,
          cy
        );

        ctx.rotate(
          rotation
        );

        ctx.beginPath();

        ctx.ellipse(
          0,
          0,
          ring,
          ring * 0.38,
          0,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          `rgba(255,255,255,${
            0.025 +
            progress * 0.025
          })`;

        ctx.lineWidth =
          1;

        ctx.stroke();

        ctx.restore();
      }


      /*
       * SCANNING BEAM
       */

      const scan =
        ((time *
          0.00012) %
          1) *
        Math.PI *
        2;

      const scanLength =
        Math.max(
          width,
          height
        );

      const scanX =
        cx +
        Math.cos(scan) *
          scanLength;

      const scanY =
        cy +
        Math.sin(scan) *
          scanLength;

      const gradient =
        ctx.createLinearGradient(
          cx,
          cy,
          scanX,
          scanY
        );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,0)"
      );

      gradient.addColorStop(
        0.45,
        "rgba(255,255,255,0.025)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(255,255,255,0.08)"
      );

      gradient.addColorStop(
        0.55,
        "rgba(255,255,255,0.025)"
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.beginPath();

      ctx.moveTo(
        cx,
        cy
      );

      ctx.lineTo(
        scanX,
        scanY
      );

      ctx.strokeStyle =
        gradient;

      ctx.lineWidth = 1;

      ctx.stroke();


      /*
       * CENTER CORE
       */

      ctx.beginPath();

      ctx.arc(
        cx,
        cy,
        coreRadius * 0.12,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(255,255,255,${
          0.15 +
          Math.sin(
            time * 0.002
          ) *
            0.05
        })`;

      ctx.fill();


      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "pointermove",
      handlePointer
    );

    animationFrame =
      requestAnimationFrame(
        render
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handlePointer
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="sentinel-field"
      aria-hidden="true"
    />
  );
}