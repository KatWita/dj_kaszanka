import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import MainButton from "./MainButton";

// Demo form: validates like a real one, then pretends to send (no data leaves the browser).
const FAKE_SEND_MS = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = ({ name, email, message }) => ({
  name: name.trim().length < 2 ? "Please enter your name." : "",
  email: !email.trim()
    ? "Please enter your e-mail."
    : !EMAIL_RE.test(email.trim())
      ? "That e-mail doesn't look right."
      : "",
  message: message.trim().length < 10 ? "Your message should be at least 10 characters." : "",
});

const fieldClass =
  "w-full border border-main-b bg-[#0f0a26] px-5 py-3 text-[0.875rem] text-main-r outline-none duration-300 placeholder:text-[0.875rem] placeholder:text-main-r/80 focus:border-main-p aria-[invalid=true]:border-main-r";

const Field = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-2 text-xs text-main-r">
        {error}
      </p>
    )}
  </div>
);

const EMPTY = { name: "", email: "", message: "" };

const ContactForm = () => {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [sentTo, setSentTo] = useState("");

  const errors = validate(values);
  const shown = (field) => (touched[field] ? errors[field] : "");

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = ["name", "email", "message"].find((f) => errors[f]);
    if (firstInvalid) {
      // jump to the first field that needs fixing
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setSentTo(values.name.trim().split(" ")[0]);
      setStatus("sent");
      setValues(EMPTY);
      setTouched({});
    }, FAKE_SEND_MS);
  };

  const inputProps = (field) => ({
    id: `contact-${field}`,
    value: values[field],
    onChange: update(field),
    onBlur: blur(field),
    disabled: status === "sending",
    "aria-invalid": Boolean(shown(field)),
    "aria-describedby": shown(field) ? `contact-${field}-error` : undefined,
    className: fieldClass,
  });

  return (
    <div className="mt-10 lg:mt-12">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            role="status"
            className="flex flex-col items-start gap-6 border border-main-b bg-[#0f0a26] px-6 py-8"
          >
            <p className="font-bruno-ace text-xl">
              Thanks{sentTo ? `, ${sentTo}` : ""}<span className="text-main-r">!</span>
            </p>
            <p className="text-[0.938rem] text-white/80">
              Your message is on its way. I&apos;ll get back to you as soon as I can.
            </p>
            <MainButton content="SEND ANOTHER" onClick={() => setStatus("idle")} classnames="whitespace-nowrap" />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            noValidate
            onSubmit={handleSubmit}
            aria-label="Contact form"
            className="flex flex-col gap-6"
          >
            <Field id="contact-name" label="Name" error={shown("name")}>
              <input type="text" name="name" autoComplete="name" placeholder="Name" {...inputProps("name")} />
            </Field>
            <Field id="contact-email" label="E-mail" error={shown("email")}>
              <input type="email" name="email" autoComplete="email" placeholder="E-mail" {...inputProps("email")} />
            </Field>
            <Field id="contact-message" label="Message" error={shown("message")}>
              <textarea name="message" rows={10} placeholder="Message" {...inputProps("message")} className={`${fieldClass} block resize-none`} />
            </Field>
            <MainButton
              type="submit"
              content={status === "sending" ? "SENDING…" : "SEND"}
              disabled={status === "sending"}
              aria-busy={status === "sending"}
              classnames="lg:w-[174px] disabled:opacity-60"
            />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ContactForm;
