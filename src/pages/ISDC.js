import { useEffect, useRef, useState } from "react";
import "./ISDC.css";

import sporsImg from "../assets/isdc_page/spros-logo.png";
import valkyrieImg from "../assets/projects/valkyrie_1.png";

function ISDC() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="isdc"
      className={`isdc ${active ? "reveal" : ""}`}
    >
      <div className="spros-section">
        <div className="spros-logo">
          <img
            src={sporsImg}
            alt="Space Robotics Society"
          />
        </div>

        <div className="spros-content">
          <span className="spros-tag">ABOUT SPoRS</span>
          <h1 className="spros-title">Space Robotics Society</h1>

          <p>
            <strong>Space Robotics Society (SPROS)</strong> is a leading international organisation dedicated to advancing space technology and allied fields for a better, open, limitless and developed future. Through initiatives like the International Rover Challenge (IRC) and the International Space Drone Challenge (ISDC), SPROS brings together student teams, researchers and professionals who are building the next generation of space robots and autonomous systems.
          </p>
        </div>
      </div>

      <div className="isdc-block">
        <span className="isdc-tag">ISDC 2026</span>
        <h2 className="isdc-title">
          International Space Drone Challenge
        </h2>
        <p className="isdc-subtitle">
          A global competition pushing the limits of fully autonomous aerial
          systems in space-inspired environments.
        </p>
      </div>

      <div className="isdc-info">
        <span className="info-tag">ABOUT ISDC</span>
        <p>
          ISDC 2026 is a space robotics engineering competition that challenges university teams to conceptualise, design, develop and operate autonomous flying systems for space-inspired missions. Teams are scored on how well their drone can interpret the mission profile, navigate complex environments, avoid hazards and complete tasks with minimal human intervention. The challenge focuses on guidance, navigation and control, perception, systems engineering and mission reliability. It is a realistic testbed for the kind of aerial platforms that could one day support planetary exploration, infrastructure inspection or logistics in off-world environments.
        </p>
      </div>

      <div className="isdc-main">
        <div className="valkyrie-grid">
          <div className="valkyrie-text">
            <span className="valkyrie-label">Introducing</span>
            <h2 className="valkyrie-heading">Valkyrie</h2>
            <div className="valkyrie-underline" />

            <p>
              <strong>Valkyrie</strong> is UGV-DTU’s aerial platform developed for the International Space Drone Challenge (ISDC), designed to operate in space-inspired, GPS-denied environments. The system emphasizes robust perception and situational awareness through a combination of environmental sensors and vision systems, enabling real-time monitoring and data transmission during flight.
              <p>
              While currently manually operated for reliability and precise human control, Valkyrie’s architecture is built with future autonomy in mind. Its perception stack lays the foundation for intelligent decision-making, advanced analytics, and machine learning integration required for next-generation autonomous aerial missions.
              </p>
            </p>
          </div>

          <div className="valkyrie-visual">
            <img
              src={valkyrieImg}
              alt="Valkyrie Drone"
            />
            <div className="valkyrie-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ISDC;