import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Team.css";
import {COUNCIL, DEPARTMENTS } from "../utils/teamData.js"

gsap.registerPlugin(ScrollTrigger);

function Team() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".team-card").forEach((card) => {
        const img = card.querySelector(".team-img");
        const text = card.querySelector(".team-info");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "transform",
        })
          .from(
            img,
            {
              opacity: 0,
              y: 20,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .from(
            text.children,
            {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCards = (list) =>
    list.map((m) => (
      <div className="team-card" key={m.name}>
        <div className="team-img">
          <img src={m.image} alt={m.name} />
        </div>

        <div className="team-info">
          <h3>{m.name}</h3>
          <p>{m.role}</p>

          <div className="team-socials">
            <a href={m.instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href={m.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    ));

  return (
    <section id="team" className="team" ref={sectionRef}>
      <div className="team-glass-bg" />

      <div className="team-container">
        <div className="team-council-block">
            <h2 className="team-section-title ">Team Council</h2>
            <div className="team-grid">{renderCards(COUNCIL)}</div>
        </div>

        {Object.entries(DEPARTMENTS).map(([dept, members]) => (
          <div key={dept} className="team-department">
            <h3 className="team-section-title">{dept} Team</h3>
            <div className="team-grid">{renderCards(members)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;