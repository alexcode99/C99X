import React, { useEffect, useState } from "react";
import "./PrivacyPolicy.css";

const sections = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "sharing", label: "Data Sharing" },
  { id: "security", label: "Data Security" },
  { id: "retention", label: "Data Retention" },
  { id: "rights", label: "Your Data Rights" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "updates", label: "Policy Updates" },
  { id: "contact", label: "Contact & Grievance" },
];

function PolicySection({ number, id, title, children }) {
  return (
    <section className="privacy-policy__section" id={id}>
      <div className="privacy-policy__section-number" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </div>
      <div className="privacy-policy__section-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <main className="privacy-policy">
      <header className="privacy-policy__hero">
        <div className="privacy-policy__glow" aria-hidden="true" />
        <div className="privacy-policy__hero-content">
          <span className="privacy-policy__eyebrow">Legal & Privacy</span>
          <h1>Privacy Policy</h1>
          <p>
            Learn how C99X collects, uses, protects, and respects your personal
            information when you use our website and services.
          </p>
          {/* <div className="privacy-policy__meta">
            <span>Effective: 4 August 2026</span>
            <span aria-hidden="true">•</span>
            <span>Chennai, Tamil Nadu, India</span>
          </div> */}
        </div>
      </header>

      <div className="privacy-policy__layout">
        <article className="privacy-policy__article">
          <div className="privacy-policy__intro">
            <p>
              At <strong>C99X</strong> ("we," "our," or "us"), operated from
              Chennai, Tamil Nadu, India and accessible at{" "}
              <a href="https://c99x.com" target="_blank" rel="noreferrer">
                c99x.com
              </a>
              , protecting your personal information and maintaining transparent
              data practices is one of our highest priorities.
            </p>
            <p>
              This Privacy Policy explains how C99X collects, uses, processes,
              stores, and protects personal and technical data when you visit our
              website, interact with our services, submit inquiries, engage our
              digital marketing retainers, or use our web and software development
              services.
            </p>
            <p>
              By accessing our website or using our services, you acknowledge the
              data collection and usage practices described in this policy.
            </p>
          </div>

          <PolicySection number={1} id="information-we-collect" title="Information We Collect">
            <p>
              We collect several categories of information to provide better
              services, fulfil client contracts, and optimise user experience.
            </p>
            <h3>A. Personal information you actively provide</h3>
            <p>
              When you fill out contact forms, request a quote, subscribe to our
              newsletter, use live support, or enter into a service agreement, we
              may collect:
            </p>
            <ul>
              <li><strong>Contact data:</strong> Full name, business email address, phone number, and physical business address.</li>
              <li><strong>Business details:</strong> Company name, job title, industry niche, website URL, and project requirements.</li>
              <li><strong>Communication data:</strong> Messages, inquiries, service tickets, and feedback sent through our forms or email channels.</li>
              <li><strong>Billing and payment data:</strong> Invoicing details, tax identification numbers, and payment verification details. Transactions are processed through the selected payment provider.</li>
            </ul>
            <h3>B. Automatically collected technical data</h3>
            <ul>
              <li><strong>Device and network data:</strong> IP address, browser type and version, operating system, device resolution, and ISP.</li>
              <li><strong>Usage and behaviour data:</strong> Pages visited, time spent, click paths, entry and exit pages, referral URLs, and interactions.</li>
              <li><strong>Approximate location data:</strong> City or country-level information derived from your IP address.</li>
            </ul>
          </PolicySection>

          <PolicySection number={2} id="how-we-use-information" title="How We Use Your Information">
            <p>C99X uses collected data for legitimate business purposes, including:</p>
            <ul>
              <li><strong>Service delivery:</strong> Building, deploying, and maintaining web applications, e-commerce stores, UI/UX designs, software solutions, and digital marketing campaigns.</li>
              <li><strong>Customer support:</strong> Responding to inquiries, consultations, support tickets, and providing project updates.</li>
              <li><strong>Marketing communications:</strong> Sending newsletters, service updates, offers, and industry insights, subject to your communication preferences.</li>
              <li><strong>Website optimisation:</strong> Analysing navigation trends, improving performance and UX, and refining conversion funnels.</li>
              <li><strong>Legal and security compliance:</strong> Preventing fraud, protecting against cyber threats, enforcing terms, and complying with applicable laws.</li>
            </ul>
          </PolicySection>

          <PolicySection number={3} id="cookies" title="Cookies and Tracking Technologies">
            <p>
              C99X may use cookies, web beacons, tracking pixels, and analytics
              tags, including Google Tag Manager, Google Analytics 4, and Meta
              Pixel, to enhance and measure your browsing experience.
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for website operation and security.</li>
              <li><strong>Analytics and performance cookies:</strong> Help measure sessions, performance, and popular content.</li>
              <li><strong>Marketing and targeting cookies:</strong> Help deliver relevant advertising and measure campaign conversions.</li>
            </ul>
            <div className="privacy-policy__notice">
              You can control or disable cookies through your browser settings.
              Disabling certain cookies may affect website functionality.
            </div>
          </PolicySection>

          <PolicySection number={4} id="sharing" title="How We Share and Disclose Data">
            <p>
              C99X does not sell, rent, or trade your personal information to
              third-party marketers. We may share necessary data only in limited
              circumstances:
            </p>
            <ul>
              <li><strong>Service providers:</strong> Trusted hosting, CRM, email delivery, analytics, and payment processing vendors used to operate our services.</li>
              <li><strong>Legal requirements:</strong> Where disclosure is required by law, court order, government regulation, or another valid legal process.</li>
              <li><strong>Business operations and NDAs:</strong> Project information is shared only with authorised C99X personnel and is governed by applicable contractual confidentiality obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection number={5} id="security" title="Data Security and Confidentiality">
            <p>
              We use physical, administrative, and technical safeguards designed
              to protect information from unauthorised access, alteration,
              disclosure, or destruction.
            </p>
            <div className="privacy-policy__security-grid">
              <div><span>01</span><strong>Encryption</strong><p>Website data is transmitted using SSL/TLS protocols.</p></div>
              <div><span>02</span><strong>Access Control</strong><p>Client information and credentials are restricted to authorised personnel.</p></div>
              <div><span>03</span><strong>Infrastructure</strong><p>Modern cloud-security practices include firewalls, assessments, and database isolation.</p></div>
            </div>
            <div className="privacy-policy__notice privacy-policy__notice--warning">
              No transmission or storage method is completely secure. Although we
              take reasonable precautions, absolute security cannot be guaranteed.
            </div>
          </PolicySection>

          <PolicySection number={6} id="retention" title="Data Retention">
            <p>
              We retain personal information only for as long as necessary to
              provide services, complete contractual obligations, resolve disputes,
              maintain financial records, and meet applicable legal requirements.
              When information is no longer required, it is securely deleted or
              anonymised according to our operational practices.
            </p>
          </PolicySection>

          <PolicySection number={7} id="rights" title="Your Data Rights">
            <p>
              Subject to applicable law and your jurisdiction, you may have the
              following rights regarding your personal information:
            </p>
            <ul className="privacy-policy__rights">
              <li><strong>Right to access</strong><span>Request a copy of personal information held about you.</span></li>
              <li><strong>Right to rectification</strong><span>Request correction of inaccurate or incomplete details.</span></li>
              <li><strong>Right to erasure</strong><span>Request deletion, subject to legal and contractual retention requirements.</span></li>
              <li><strong>Right to opt out</strong><span>Unsubscribe from promotional email using the link in the message.</span></li>
            </ul>
            <p>To exercise an applicable right, contact our privacy team using the details below.</p>
          </PolicySection>

          <PolicySection number={8} id="third-party-links" title="Third-Party Web Links">
            <p>
              Our website and blog may link to external websites, tools, or
              resources. C99X is not responsible for their content, security, or
              privacy practices. Review the privacy policy of any third-party site
              before providing personal information.
            </p>
          </PolicySection>

          <PolicySection number={9} id="updates" title="Updates to This Privacy Policy">
            <p>
              C99X may update this Privacy Policy to reflect changes in services,
              technology, or legal requirements. Changes become effective when the
              revised policy is posted with an updated effective date. We encourage
              you to review this page periodically.
            </p>
          </PolicySection>

          <PolicySection number={10} id="contact" title="Contact Us and Grievance Officer">
            <p>
              For questions, concerns, or grievances about this policy or our data
              practices, contact us:
            </p>
            <address className="privacy-policy__contact-card">
              <div><span>Company</span><strong>C99X</strong></div>
              <div><span>Office</span><strong>First Floor, 16, Sarathy Nagar, Velachery, Chennai, Tamil Nadu 600042, India</strong></div>
              <div><span>Email</span><a href="mailto:c99x.digital@gmail.com">c99x.digital@gmail.com</a></div>
              <div><span>Support</span><strong>Monday to Saturday, standard business hours (IST)</strong></div>
            </address>
          </PolicySection>
        </article>

        <aside className="privacy-policy__sidebar" aria-label="Privacy policy sections">
          <div className="privacy-policy__sidebar-inner">
            <span className="privacy-policy__sidebar-title">On this page</span>
            <nav>
              {sections.map(({ id, label }, index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={activeSection === id ? "is-active" : ""}
                  onClick={(event) => scrollToSection(event, id)}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="privacy-policy__help">
              <span>Privacy question?</span>
              <a href="mailto:c99x.digital@gmail.com">Contact our privacy team →</a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}