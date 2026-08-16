"use client";

import { useEffect, useState } from "react";
import "./portfolio-header.css";

const sections = [
  { id: "home", number: "01", label: "HOME" },
  { id: "about", number: "02", label: "ABOUT" },
  { id: "capabilities", number: "03", label: "CAPABILITIES" },
  { id: "projects", number: "04", label: "PROJECTS" },
  { id: "experience", number: "05", label: "EXPERIENCE" },
  { id: "contact", number: "06", label: "CONTACT" },
];

export function PortfolioHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const viewportPoint = window.innerHeight * 0.32;
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportPoint && rect.bottom >= viewportPoint) {
          current = section.id;
          break;
        }
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigation = (id: string) => {
    setMobileOpen(false);

    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    const headerOffset = 70;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={[
        "portfolio-header",
        scrolled ? "portfolio-header-scrolled" : "",
        mobileOpen ? "portfolio-header-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="portfolio-header-inner">
        <button
          type="button"
          className="portfolio-brand"
          onClick={() => handleNavigation("home")}
          aria-label="Go to home"
        >
          <span className="portfolio-brand-name">SUFIYAN</span>

          <span className="portfolio-brand-dot">.</span>

          <span className="portfolio-brand-name">KHAN</span>

          <span className="portfolio-brand-mark">/AI</span>
        </button>

        <nav
          className="portfolio-navigation"
          aria-label="Primary navigation"
        >
          {sections.map((section) => {
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={[
                  "portfolio-nav-item",
                  active ? "portfolio-nav-item-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleNavigation(section.id)}
              >
                <span className="portfolio-nav-number">
                  {section.number}
                </span>

                <span className="portfolio-nav-label">
                  {section.label}
                </span>

                <span className="portfolio-nav-line" />
              </button>
            );
          })}
        </nav>

        <div className="portfolio-system-status">
          <span className="portfolio-status-dot" />

          <span className="portfolio-status-label">
            SYSTEM ONLINE
          </span>
        </div>

        <button
          type="button"
          className={[
            "portfolio-menu-toggle",
            mobileOpen ? "portfolio-menu-toggle-open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={[
          "portfolio-mobile-panel",
          mobileOpen ? "portfolio-mobile-panel-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="portfolio-mobile-panel-inner">
          <div className="portfolio-mobile-meta">
            <span>NAVIGATION / INDEX</span>
            <span>2026</span>
          </div>

          <nav
            className="portfolio-mobile-navigation"
            aria-label="Mobile navigation"
          >
            {sections.map((section) => {
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={[
                    "portfolio-mobile-item",
                    active ? "portfolio-mobile-item-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleNavigation(section.id)}
                >
                  <span className="portfolio-mobile-number">
                    {section.number}
                  </span>

                  <span className="portfolio-mobile-label">
                    {section.label}
                  </span>

                  <span className="portfolio-mobile-arrow">↗</span>
                </button>
              );
            })}
          </nav>

          <div className="portfolio-mobile-footer">
            <span>AI × SOFTWARE ENGINEERING</span>
            <span>KANPUR / INDIA</span>
          </div>
        </div>
      </div>

      <div className="portfolio-header-scanline" />
    </header>
  );
}