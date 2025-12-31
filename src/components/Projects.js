import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

import agniImg from "../assets/projects/agni.jpg";
import ashwini_1_Img from "../assets/projects/ashwini_1.jpeg";
import centaur_1_Img from "../assets/projects/centaur_1.png";
import kurmImg from "../assets/projects/KURM.JPEG";
import valkyrieImg from "../assets/projects/valkyrie_2.jpg";
import airawatImg from "../assets/projects/airawat.jpg";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "ASHWINI",
    desc: "A fully autonomous unmanned ground vehicle capable of navigation, obstacle avoidance, and real-world terrain traversal using sensor fusion.",
    image: ashwini_1_Img,
    focus: "center bottom"
  },
  {
    title: "Valkyrie",
    desc: "Valkyrie is an indigenously developed UAV focused on real-time perception, environmental sensing, and data-driven aerial operations, built for advanced robotics competitions and research applications.",
    image: valkyrieImg,
  },
  {
    title: "CENTAUR",
    desc: "CENTAUR, our first autonomous rover, marked UGV-DTU’s beginning — a bold step into the world of self-driving robotics and mechanical innovation.",
    image: centaur_1_Img,
    focus: "center bottom"
  },
  {
    title: "AIRAWAT",
    desc: "AIRAWAT followed, introducing advanced vision and localization, turning stability and reliability into our new engineering standards.",
    image: airawatImg,
  },
  {
    title: "KURM",
    desc: "KURM carried forward the legacy, refining path planning, perception, and RTK-GPS precision to conquer complex terrains with confidence.",
    image: kurmImg,
  },
  {
    title: "AGNI",
    desc: "AGNI became the foundation of our modern autonomy stack — a blend of intelligence, control, and design that paved the way for Ashwini.",
    image: agniImg,
  },
];

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
        },
      });

      gsap.utils.toArray(".project-row").forEach((row, i) => {
        const text = row.querySelector(".project-text");
        const image = row.querySelector(".project-image");
        const underline = row.querySelector(".title-underline");

        const fromX = i % 2 === 0 ? -140 : 140;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(text, {
          opacity: 0,
          x: fromX,
          scale: 0.96,
          duration: 1.1,
          ease: "power4.out",
        })
          .from(
            image,
            {
              opacity: 0,
              x: -fromX,
              scale: 1.08,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.8"
          )
          .to(
            underline,
            {
              width: "70%",
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.6"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-glass-bg" />

      <div className="projects-container">
        <h2 className="projects-heading">Projects</h2>

        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`project-row ${i % 2 ? "reverse" : ""}`}
          >
            <div className="project-text">
              <h3>
                <span className="title-text">
                  {p.title}
                  <span className="title-underline" />
                </span>
              </h3>
              <p>{p.desc}</p>
            </div>

            <div className="project-image">
              <img
                src={p.image}
                alt={p.title}
                style={{ objectPosition: p.focus || "center"}}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;