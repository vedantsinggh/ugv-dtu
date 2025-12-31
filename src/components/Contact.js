import { useEffect, useRef, useState } from "react";
import "./Contact.css";

function Contact() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      setForm((prev) => ({
        ...prev,
        subject: e.detail || "Sponsorship Inquiry – UGV-DTU",
      }));
    };

    window.addEventListener("prefill-subject", handler);
    return () => window.removeEventListener("prefill-subject", handler);
  }, []);

  useEffect(() => {
    if (!bgRef.current) return;

    let rafId;
    let targetX = 70;
    let targetY = 30;
    let currentX = 70;
    let currentY = 30;

    const randomizeTarget = () => {
      targetX = 60 + Math.random() * 20;
      targetY = 20 + Math.random() * 20;
    };

    randomizeTarget();
    const interval = setInterval(randomizeTarget, 2000);

    const animate = () => {
      currentX += (targetX - currentX) * 0.01;
      currentY += (targetY - currentY) * 0.01;

      bgRef.current.style.setProperty("--gx", `${currentX}%`);
      bgRef.current.style.setProperty("--gy", `${currentY}%`);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(""), 6500);
    return () => clearTimeout(t);
  }, [status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mregwqjz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact ${active ? "reveal" : ""}`}
    >
      <div ref={bgRef} className="contact-bg" />

      <div className="contact-wrapper">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Collaborations, sponsorships, research ideas, or just a hello.
            We’d love to hear from you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Message →"}
          </button>

          {status === "success" && (
            <p style={{ color: "#8bffb0", fontSize: "14px" }}>
              Message sent successfully. We’ll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p style={{ color: "#ff8b8b", fontSize: "14px" }}>
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;