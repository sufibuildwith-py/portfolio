
"use client";

import "./ocr-experience.css";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const stages = [
  {
    id: "ready",
    number: "01",
    eyebrow: "SYSTEM INITIALIZATION",
    title: "Document intelligence.",
    description:
      "A privacy-focused desktop workflow that turns identity documents into structured, verifiable data.",
    label: "SYSTEM READY",
  },
  {
    id: "select",
    number: "02",
    eyebrow: "DOCUMENT INGESTION",
    title: "Select a document.",
    description:
      "The employee begins by selecting the document directly from the local machine.",
    label: "DOCUMENT SELECTED",
  },
  {
    id: "loaded",
    number: "03",
    eyebrow: "DOCUMENT LOADED",
    title: "The document enters the pipeline.",
    description:
      "The file is loaded into the Electron application and prepared for local processing.",
    label: "READY FOR OCR",
  },
  {
    id: "scan",
    number: "04",
    eyebrow: "LOCAL OCR ENGINE",
    title: "The document is scanned.",
    description:
      "Tesseract.js processes the document locally, extracting text without sending customer documents to an external OCR service.",
    label: "OCR PROCESSING",
  },
  {
    id: "extract",
    number: "05",
    eyebrow: "STRUCTURED EXTRACTION",
    title: "Raw text becomes data.",
    description:
      "OCR output is normalized and transformed into meaningful identity fields.",
    label: "FIELDS DETECTED",
  },
  {
    id: "verify",
    number: "06",
    eyebrow: "HUMAN VERIFICATION",
    title: "An employee reviews the result.",
    description:
      "Extracted information is presented for verification before it enters the operational workflow.",
    label: "READY FOR REVIEW",
  },
  {
    id: "sync",
    number: "07",
    eyebrow: "WORKFLOW AUTOMATION",
    title: "Verified data moves forward.",
    description:
      "Once reviewed, the structured record can be synchronized into the existing operational data workflow.",
    label: "SYNCING RECORD",
  },
  {
    id: "complete",
    number: "08",
    eyebrow: "PROCESS COMPLETE",
    title: "Document → data.",
    description:
      "A repetitive document-processing task becomes a local, structured and traceable workflow.",
    label: "PROCESS COMPLETE",
  },
];

const extractedFields = [
  "NAME",
  "DATE OF BIRTH",
  "GENDER",
  "DOCUMENT ID",
];

const orbitNodes = [
  "ELECTRON",
  "TESSERACT.JS",
  "LOCAL",
  "OCR",
  "PARSER",
  "VERIFY",
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(
  start: number,
  end: number,
  amount: number,
) {
  return start + (end - start) * amount;
}

function getStage(progress: number) {
  const scaled = progress * (stages.length - 1);
  const index = Math.min(
    stages.length - 1,
    Math.floor(scaled),
  );

  return {
    index,
    local: scaled - index,
  };
}

function OrbitalCore({
  progress,
  stageIndex,
}: {
  progress: number;
  stageIndex: number;
}) {
  const rotation = progress * 720;

  return (
    <div
      className="ocr-orbital-system"
      style={
        {
          "--ocr-rotation": `${rotation}deg`,
          "--ocr-stage": stageIndex,
        } as React.CSSProperties
      }
    >
      <div className="ocr-orbit ocr-orbit-one" />
      <div className="ocr-orbit ocr-orbit-two" />
      <div className="ocr-orbit ocr-orbit-three" />

      <div className="ocr-orbit-ring ocr-orbit-ring-one">
        <span />
      </div>

      <div className="ocr-orbit-ring ocr-orbit-ring-two">
        <span />
      </div>

      <div className="ocr-orbit-ring ocr-orbit-ring-three">
        <span />
      </div>

      <div className="ocr-core">
        <div className="ocr-core-grid" />

        <div className="ocr-core-inner">
          <span className="ocr-core-number">
            {String(stageIndex + 1).padStart(
              2,
              "0",
            )}
          </span>

          <strong>OCR</strong>

          <span>ENGINE</span>
        </div>
      </div>

      {orbitNodes.map((node, index) => {
        const angle =
          index * 60 + rotation * 0.08;

        return (
          <div
            key={node}
            className={`ocr-orbit-node ocr-orbit-node-${index + 1}`}
            style={{
              transform: `rotate(${angle}deg) translateY(-190px) rotate(-${angle}deg)`,
            }}
          >
            <span />
            <strong>{node}</strong>
          </div>
        );
      })}
    </div>
  );
}

function DocumentCard({
  progress,
  stageIndex,
}: {
  progress: number;
  stageIndex: number;
}) {
  const scanProgress = clamp(
    (progress - 0.34) / 0.18,
  );

  const extractionProgress = clamp(
    (progress - 0.48) / 0.18,
  );

  const documentScale = lerp(
    0.72,
    1,
    clamp(progress * 2),
  );

  const documentRotation =
    stageIndex <= 2
      ? lerp(-8, 0, clamp(progress * 3))
      : lerp(0, 3, clamp(progress));

  return (
    <div
      className="ocr-document-wrapper"
      style={
        {
          "--ocr-document-scale": documentScale,
          "--ocr-document-rotation": `${documentRotation}deg`,
          "--ocr-scan-progress": scanProgress,
          "--ocr-extraction-progress":
            extractionProgress,
        } as React.CSSProperties
      }
    >
      <div className="ocr-document-shadow" />

      <div className="ocr-document">
        <div className="ocr-document-header">
          <span>IDENTITY DOCUMENT</span>

          <span>LOCAL FILE</span>
        </div>

        <div className="ocr-document-photo">
          <div className="ocr-photo-placeholder">
            <span />
          </div>
        </div>

        <div className="ocr-document-lines">
          <span className="ocr-line-long" />
          <span className="ocr-line-medium" />
          <span className="ocr-line-short" />
          <span className="ocr-line-long" />
          <span className="ocr-line-medium" />
        </div>

        <div className="ocr-document-number">
          XXXX XXXX XXXX
        </div>

        <div className="ocr-document-footer">
          <span>GOVERNMENT ID</span>
          <span>VERIFICATION DATA</span>
        </div>

        <div className="ocr-scan-beam" />

        <div className="ocr-detection-box ocr-box-one">
          <span>NAME</span>
        </div>

        <div className="ocr-detection-box ocr-box-two">
          <span>DOB</span>
        </div>

        <div className="ocr-detection-box ocr-box-three">
          <span>ID</span>
        </div>
      </div>
    </div>
  );
}

function RawOCRPanel({
  progress,
}: {
  progress: number;
}) {
  const visible = clamp(
    (progress - 0.43) / 0.2,
  );

  return (
    <div
      className="ocr-raw-panel"
      style={{
        opacity: visible,
        transform: `translateY(${(1 - visible) * 30}px)`,
      }}
    >
      <div className="ocr-panel-header">
        <span>RAW OCR OUTPUT</span>
        <span>TEXT STREAM</span>
      </div>

      <div className="ocr-raw-lines">
        <span>SUFIYAN KHAN</span>
        <span>DATE OF BIRTH</span>
        <span>MALE</span>
        <span>XXXX XXXX XXXX</span>
        <span>IDENTITY DOCUMENT</span>
      </div>

      <div className="ocr-panel-status">
        <i />
        TESSERACT.JS / LOCAL
      </div>
    </div>
  );
}

function StructuredDataPanel({
  progress,
}: {
  progress: number;
}) {
  const visible = clamp(
    (progress - 0.56) / 0.18,
  );

  return (
    <div
      className="ocr-structured-panel"
      style={{
        opacity: visible,
        transform: `translateY(${(1 - visible) * 40}px)`,
      }}
    >
      <div className="ocr-panel-header">
        <span>STRUCTURED RECORD</span>
        <span>PARSED</span>
      </div>

      <div className="ocr-fields">
        {extractedFields.map(
          (field, index) => (
            <div
              key={field}
              className="ocr-field"
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <span>{field}</span>

              <strong>
                {index === 0
                  ? "SUFIYAN KHAN"
                  : index === 1
                    ? "XX / XX / XXXX"
                    : index === 2
                      ? "MALE"
                      : "XXXX XXXX XXXX"}
              </strong>

              <i>✓</i>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function VerificationPanel({
  progress,
}: {
  progress: number;
}) {
  const visible = clamp(
    (progress - 0.7) / 0.14,
  );

  return (
    <div
      className="ocr-verification-panel"
      style={{
        opacity: visible,
        transform: `translateY(${(1 - visible) * 30}px)`,
      }}
    >
      <span className="ocr-verification-eyebrow">
        HUMAN VERIFICATION
      </span>

      <strong>RECORD READY</strong>

      <div className="ocr-checks">
        <span>
          <i>✓</i>
          OCR COMPLETE
        </span>

        <span>
          <i>✓</i>
          FIELDS DETECTED
        </span>

        <span>
          <i>✓</i>
          DATA STRUCTURED
        </span>
      </div>

      <div className="ocr-confirm-button">
        CONFIRM RECORD
        <span>↗</span>
      </div>
    </div>
  );
}

function SyncPanel({
  progress,
}: {
  progress: number;
}) {
  const visible = clamp(
    (progress - 0.82) / 0.12,
  );

  return (
    <div
      className="ocr-sync-panel"
      style={{
        opacity: visible,
        transform: `translateY(${(1 - visible) * 30}px)`,
      }}
    >
      <div className="ocr-sync-route">
        <div>
          <span>01</span>
          LOCAL PROCESSOR
        </div>

        <i />

        <div>
          <span>02</span>
          STRUCTURED DATA
        </div>

        <i />

        <div>
          <span>03</span>
          GOOGLE SHEETS
        </div>
      </div>

      <div className="ocr-sheet">
        <div className="ocr-sheet-header">
          <span>NAME</span>
          <span>DOCUMENT</span>
          <span>STATUS</span>
        </div>

        <div className="ocr-sheet-row">
          <span>SUFIYAN KHAN</span>
          <span>AADHAAR</span>
          <span>VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

export function OCRExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const section = sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollable =
        rect.height - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const value =
        -rect.top / scrollable;

      setProgress(clamp(value));
    };

    const handleScroll = () => {
      if (frame) return;

      frame =
        window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const {
    index: stageIndex,
    local: stageLocal,
  } = getStage(progress);

  const stage = stages[stageIndex]!; 

  const ocrProgress = clamp(
    (progress - 0.3) / 0.22,
  );

  const documentOpacity =
    progress < 0.05
      ? 0.4
      : 1;

  return (
    <section
  id="ocr"
  ref={sectionRef}
  className="ocr-experience"
>
      <div className="ocr-sticky">
        <div className="ocr-background">
          <div className="ocr-grid" />
          <div className="ocr-glow ocr-glow-one" />
          <div className="ocr-glow ocr-glow-two" />
          <div className="ocr-scanline" />
        </div>

        <header className="ocr-topbar">
          <div className="ocr-brand">
            <span>07</span>
            <strong>DOCUMENT INTELLIGENCE</strong>
          </div>

          <div className="ocr-live">
            <i />
            LOCAL SYSTEM / ONLINE
          </div>

          <div className="ocr-progress">
            {String(
              Math.round(progress * 100),
            ).padStart(3, "0")}
            %
          </div>
        </header>

        <main className="ocr-main">
          <div className="ocr-copy">
            <div className="ocr-stage-index">
              <span>{stage.number}</span>

              <i />

              <span>
                {String(
                  stages.length,
                ).padStart(2, "0")}
              </span>
            </div>

            <span className="ocr-eyebrow">
              {stage.eyebrow}
            </span>

            <h2>{stage.title}</h2>

            <p>{stage.description}</p>

            <div className="ocr-stage-status">
              <i />
              {stage.label}
            </div>
          </div>

          <div
            className="ocr-machine"
            style={{
              opacity: documentOpacity,
            }}
          >
            <OrbitalCore
              progress={progress}
              stageIndex={stageIndex}
            />

            <DocumentCard
              progress={progress}
              stageIndex={stageIndex}
            />

            <RawOCRPanel
              progress={progress}
            />

            <StructuredDataPanel
              progress={progress}
            />

            <VerificationPanel
              progress={progress}
            />

            <SyncPanel
              progress={progress}
            />

            <div
              className="ocr-processing"
              style={{
                opacity:
                  stageIndex === 3
                    ? 1
                    : 0,
              }}
            >
              <span>
                OCR PROCESSING
              </span>

              <div>
                <i
                  style={{
                    width: `${
                      ocrProgress * 100
                    }%`,
                  }}
                />
              </div>

              <strong>
                {Math.round(
                  ocrProgress * 100,
                )}
                %
              </strong>
            </div>
          </div>

          <div className="ocr-side-data">
            <div>
              <span>ENGINE</span>
              <strong>TESSERACT.JS</strong>
            </div>

            <div>
              <span>RUNTIME</span>
              <strong>ELECTRON</strong>
            </div>

            <div>
              <span>PROCESSING</span>
              <strong>LOCAL</strong>
            </div>

            <div>
              <span>PIPELINE</span>
              <strong>OCR → PARSE → VERIFY</strong>
            </div>
          </div>
        </main>

        <footer className="ocr-bottom">
          <div>
            <span>
              DOCUMENT WORKFLOW
            </span>

            <strong>
              {stageIndex + 1} /{" "}
              {stages.length}
            </strong>
          </div>

          <div className="ocr-scroll-indicator">
            <span>SCROLL TO OPERATE</span>

            <i
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>

          <div>
            <span>
              IDEAL WEB SOLUTIONS
            </span>

            <span>
              {Math.round(
                stageLocal * 100,
              )
                .toString()
                .padStart(3, "0")}
            </span>
          </div>
        </footer>
      </div>

      <div className="ocr-scroll-space" />
    </section>
  );
}

export default OCRExperience;