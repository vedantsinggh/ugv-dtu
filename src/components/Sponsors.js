import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Sponsors.css";

import solidworksImg from "../assets/sponsors/solidworks.png";
import mathworksImg from "../assets/sponsors/mathworks.png";
import ansysImg from "../assets/sponsors/ansys.png";

gsap.registerPlugin(ScrollTrigger);

const SPONSORS = [
  { name: "SolidWorks", logo: solidworksImg },
  { name: "Mathworks", logo: mathworksImg },
  { name: "Ansys", logo: ansysImg },
];

SPONSORS.forEach((s) => {
  const img = new Image();
  img.src = s.logo;
});

const smoothScrollTo = (targetY) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;

  const distance = Math.abs(diff);
  const duration = Math.min(4200, Math.max(1600, distance * 1.1));

  const ease = (t) =>
    t < 0.5
      ? 8 * Math.pow(t, 4)
      : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const step = (time) => {
    if (!start) start = time;
    const p = Math.min((time - start) / duration, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

function Sponsors() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".sponsors-heading", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".sponsors-underline",
          { width: "72px", duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
        .from(
          ".sponsors-sub",
          { opacity: 0, y: 14, duration: 0.4, ease: "power2.out" },
          "-=0.15"
        );

      gsap.fromTo(
        ".sponsor-logo",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sponsors-logos",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".sponsors-logos", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".sponsors",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".sponsors-cta",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sponsors-cta",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const handleSponsorClick = () => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    window.dispatchEvent(
      new CustomEvent("prefill-subject", {
        detail: "Sponsorship Inquiry – UGV-DTU",
      })
    );

    const y = contact.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(y);
  };

  return (
    <section id="sponsors" className="sponsors" ref={sectionRef}>
      <div className="sponsors-glass-bg" />

      <div className="sponsors-container">
        <div className="sponsors-header">
          <h2 className="sponsors-heading">
            Sponsors
            <span className="sponsors-underline" />
          </h2>

          <p className="sponsors-sub">
            Organizations supporting innovation and research
          </p>
        </div>

        <div className="sponsors-logos">
          {SPONSORS.map((s) => (
            <div key={s.name} className="sponsor-logo">
              <img src={s.logo} alt={s.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="sponsors-cta">
        <p>Interested in supporting innovation and research?</p>
        <button onClick={handleSponsorClick}>
          Become a Sponsor →
        </button>
      </div>
    </section>
  );
}

export default Sponsors;