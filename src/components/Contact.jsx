import { useState } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const EMPTY = { name: "", email: "", message: "" };

const inputClass =
  "bg-primary border border-line py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-lg font-medium focus:border-copper focus:outline-none transition-colors";

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        "service_4e6bhi4",
        "template_pds3b8f",
        {
          from_name: form.name,
          to_name: "Henrique",
          from_email: form.email,
          to_email: "henriquetetilha@gmail.com",
          message: form.message,
        },
        "hWjd74_8HdPpu4js9"
      )
      .then(
        () => {
          setStatus("sent");
          setForm(EMPTY);
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      );
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <div className="flex-[0.75] bg-tertiary border border-line p-8 rounded-2xl">
        <h2 className={styles.sectionHeadText}>Contact</h2>
        <p className={`${styles.sectionSubText} mt-3`}>
          Have an internship, a project or a question? Send a message and I'll reply by email.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Message</span>
            <textarea
              rows="6"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              className={inputClass}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-copper text-primary py-3 px-8 w-fit font-bold rounded-lg hover:bg-[#EDB872] disabled:opacity-60 transition-colors"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" className="text-[15px]">
              {status === "sent" && <span className="text-led">Message sent. I'll get back to you soon.</span>}
              {status === "error" && (
                <span className="text-[#F28B82]">
                  The message couldn't be sent. Check your connection and try again.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>

      <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
