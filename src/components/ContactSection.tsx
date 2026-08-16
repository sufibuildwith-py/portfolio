"use client";
import React, { FormEvent, useState } from "react";
import "./contact.css";

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-background">
        <div className="contact-grid" />
        <div className="contact-stars contact-stars-one" />
        <div className="contact-stars contact-stars-two" />
      </div>

      <div className="contact-coordinate contact-coordinate-top">
        26°27′N / 80°20′E
      </div>

      <div className="contact-coordinate contact-coordinate-bottom">
        CHANNEL / 06
      </div>

      <div className="contact-inner">

        {/* HEADER */}
        <header className="contact-header">
          <div className="contact-header-index">
            <span>06</span>
            <span>CONTACT</span>
          </div>

          <div className="contact-header-line">
            <span />
          </div>

          <div className="contact-header-status">
            <i />
            OPEN TO OPPORTUNITIES
          </div>
        </header>

        {/* HERO */}
        <div className="contact-hero">
          <div className="contact-hero-main">
            <span className="contact-eyebrow">
              ESTABLISH CONNECTION
            </span>

            <h2>
              LET'S
              <span>TALK.</span>
            </h2>

            <p>
              Have a project, opportunity, internship, or just want to
              talk tech? I'm always open to meaningful conversations.
            </p>
          </div>

          <div className="contact-hero-side">
            <span>RESPONSE TIME</span>
            <strong>&lt; 24H</strong>
            <small>USUALLY FASTER</small>
          </div>
        </div>

        {/* COMMAND BAR */}
        <div className="contact-command-bar">
          <span>SECURE CHANNEL</span>

          <div className="contact-command-center">
            <i />
            AVAILABLE
            <i />
          </div>

          <span>INDIA / IST</span>
        </div>

        {/* MAIN CONTENT */}
        <div className="contact-main">

          {/* CONTACT DETAILS */}
          <div className="contact-details">

            <div className="contact-detail">
              <span className="contact-detail-label">
                EMAIL
              </span>

              <a href="mailto:sufiyan.builds.py@gmail.com">
                sufiyan.builds.py@gmail.com
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">
                GITHUB
              </span>

              <a
                href="https://github.com/sufibuildwith-py"
                target="_blank"
                rel="noreferrer"
              >
                github.com/sufibuildwith-py
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">
                LINKEDIN
              </span>

              <a
                href="https://www.linkedin.com/in/sufi-builds"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN / PROFILE
              </a>
            </div>

          </div>

          {/* FORM */}
          <div className="contact-form-wrapper">

            <div className="contact-form-heading">
              <span>TRANSMISSION</span>
              <small>01 / 03</small>
            </div>

            {submitted ? (
              <div className="contact-success">
                <span>TRANSMISSION RECEIVED</span>
                <strong>THANK YOU.</strong>
                <p>
                  Your message has been received.
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <label>
                  <span>YOUR NAME</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="ENTER NAME"
                    required
                  />
                </label>

                <label>
                  <span>EMAIL ADDRESS</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="ENTER EMAIL"
                    required
                  />
                </label>

                <label>
                  <span>MESSAGE</span>

                  <textarea
                    name="message"
                    placeholder="TELL ME ABOUT IT..."
                    rows={5}
                    required
                  />
                </label>

                <button type="submit">
                  <span>SEND MESSAGE</span>
                  <strong>→</strong>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* FINAL SIGNAL */}
        <div className="contact-final">

          <div className="contact-final-line" />

          <div className="contact-final-content">
            <span>ENDPOINT</span>

            <strong>
              BUILD
              <br />
              SOMETHING.
            </strong>

            <div>
              <i />
              <span>CHANNEL READY</span>
            </div>
          </div>

          <div className="contact-final-meta">
            <span>GUIDEIN / PORTFOLIO</span>
            <span>2026</span>
            <span>END OF TRANSMISSION</span>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="contact-footer">
          <div className="contact-footer-line" />

          <div className="contact-footer-content">
            <span>SUFIYAN KHAN</span>
            <span>AI / ML × BACKEND</span>
            <span>CONTACT / 06</span>
          </div>
        </footer>

      </div>
    </section>
  );
};

export default ContactSection;