import { useState, useEffect } from "react";
import ServicesData from "../../../pages/services/data/ServicesData";
import { useParams, useLocation, Link } from "react-router-dom";
import "./Faq.css";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { slug } = useParams();
  const { pathname } = useLocation();

  /* ---------------- HOME FAQ DATA ---------------- */
  const homeFaq = [
    {
      question:
        "What services does a Digital Marketing Agency in Chennai provide in 2026?",
      answer:
        "A leading Digital Marketing Agency in Chennai provides SEO, PPC, content marketing, automation, social media campaigns, web development, and analytics tracking.",
    },
    {
      question:
        "Why is choosing the Best Digital Marketing Company in Chennai important?",
      answer:
        "Choosing the right company ensures strategy clarity, better optimization, and measurable results.",
    },
    {
      question:
        "How does an Online Marketing Agency Chennai improve search rankings?",
      answer:
        "They use SEO strategies like keyword optimization, technical audits, and backlink building.",
    },
    {
      question:
        "How much does hiring a Digital Marketing Agency in Chennai cost?",
      answer:
        "Costs depend on project scope, goals, and competition.",
    },
    {
      question:
        "When can businesses expect measurable digital marketing results?",
      answer:
        "SEO takes 3–6 months, while paid ads deliver faster results.",
    },
  ];

  /* ---------------- FIND SERVICE ---------------- */
  const service = ServicesData.find(
    (item) => item.slug === slug || item.id === slug
  );

  /* ---------------- FINAL FAQ DATA ---------------- */
  const faqdata = service?.faq || homeFaq;

  /* ---------------- RESET ACCORDION ---------------- */
  useEffect(() => {
    setActiveIndex(null);
  }, [slug]);

  /* ---------------- SCROLL TO TOP ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  /* ---------------- TOGGLE ACCORDION ---------------- */
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  /* ---------------- CONTACT CLICK ---------------- */
  const handleContactClick = () => {
    console.log("Function work");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="faq_section section_gap">
      <div className="faq_section_box">

        {/* LEFT CONTENT */}
        <div className="faq_content_box">
          <h2 className="faq_tittle service-com-tittle">
            Frequently Asked <br /> Questions
          </h2>

          <p className="faq_content service-com-content">
            Not found the answer you’re looking <br />

            <Link
              to="/contact"
              onClick={handleContactClick}
              className="faq_content2"
            >
              Contact Us
            </Link>
          </p>
        </div>

        {/* ACCORDION */}
        <div className="accordion">
          {faqdata.map((item, index) => (
            <div className="accordion-item" key={index}>

              <button
                className="accordion-header"
                aria-expanded={activeIndex === index}
                onClick={() => toggleAccordion(index)}
              >
                <p className="accordion-title service-com-content">
                  {item.question}
                </p>

                <span className="icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`accordion-content ${activeIndex === index ? "open" : ""
                  }`}
              >
                <p className="service-com-content">
                  {item.answer}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}