"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  label: string;
  depth: number;
};

const nodes: Node[] = [
  {
    x: 32,
    y: 36,
    label: "INCIDENT",
    depth: 0.7,
  },
  {
    x: 68,
    y: 36,
    label: "LOGS",
    depth: 0.6,
  },
  {
    x: 50,
    y: 51,
    label: "EMBEDDING",
    depth: 1,
  },
  {
    x: 50,
    y: 67,
    label: "RETRIEVAL",
    depth: 1.1,
  },
  {
    x: 50,
    y: 84,
    label: "DIAGNOSIS",
    depth: 0.9,
  },
];

export function SentinelField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;

    if (!field) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width) * 100;

      const y =
        ((event.clientY - rect.top) / rect.height) * 100;

      field.style.setProperty(
        "--pointer-x",
        `${x}%`
      );

      field.style.setProperty(
        "--pointer-y",
        `${y}%`
      );

      field.style.setProperty(
        "--pointer-x-px",
        `${event.clientX - rect.left}px`
      );

      field.style.setProperty(
        "--pointer-y-px",
        `${event.clientY - rect.top}px`
      );
    };

    field.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      field.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className="sentinel-field"
      aria-hidden="true"
    >
      {/* Cursor environment */}

      <div className="sentinel-cursor-glow" />

      <div className="sentinel-grid" />

      {/* Atmospheric particles */}

      <div className="sentinel-particle particle-one" />
      <div className="sentinel-particle particle-two" />
      <div className="sentinel-particle particle-three" />
      <div className="sentinel-particle particle-four" />
      <div className="sentinel-particle particle-five" />

      {/* System connections */}

      <div className="sentinel-connections">
        <div className="connection connection-incident" />
        <div className="connection connection-logs" />
        <div className="connection connection-embedding" />
        <div className="connection connection-retrieval" />
      </div>

      {/* System nodes */}

      <div className="sentinel-nodes">
        {nodes.map((node) => (
          <div
            key={node.label}
            className="sentinel-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              opacity: node.depth,
            }}
          >
            <span className="node-dot" />

            <span className="node-label">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}