import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "@/lib/api";

const emptyContact = {
  fullName: "",
  email: "",
  message: "",
};

const Contact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState(emptyContact);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = JSON.stringify(contact);
      let lastError = "We couldn't send your message right now. Please try again shortly.";
      try {
        const response = await fetch(apiUrl("/api/contact"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });

        if (!response.ok) {
          const responseText = await response.text();
          let responseError = "";
          try {
            const parsed = JSON.parse(responseText);
            responseError = parsed.error ?? "";
          } catch {
            responseError = responseText;
          }
          const routeMissing =
            response.status === 404 || /Cannot POST \/api\/contact/i.test(responseError);
          if (routeMissing) {
            lastError = "Contact service is temporarily unavailable. Please refresh and try again.";
            setError(lastError);
            return;
          }
          lastError = responseError
            ? "We couldn't process your message. Please review your details and try again."
            : "We couldn't send your message right now. Please try again shortly.";
          setError(lastError);
          return;
        }

        setSubmitted(true);
        setContact(emptyContact);
        return;
      } catch {
        lastError =
          "Unable to reach contact server. Please ensure backend is running and try again.";
      }

      setError(lastError);
    } catch (submitError) {
      console.error(submitError);
      setError("Unable to send your message right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="legal-shell py-16 sm:py-20 lg:py-24"
    >
      <button
        onClick={() => navigate("/")}
        className="mb-5 text-sm sm:text-base text-primary hover:opacity-80 transition-opacity"
      >
        {"<- Back to Home"}
      </button>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground">
            Reach our support team for orders, delivery updates, or general inquiries.
          </p>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Email</p>
            <p className="text-muted-foreground">support@blackroth.com</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Address</p>
            <p className="text-muted-foreground">BlackRoth Beverages, Hyderabad, India</p>
          </div>
        </div>

        {submitted ? (
          <div className="space-y-4 rounded-xl border border-border/60 bg-card/30 p-4 sm:p-5 lg:p-6">
            <h2 className="text-xl font-semibold text-gold-gradient">Message Received</h2>
            <p className="leading-relaxed text-muted-foreground">
              Thank you for contacting us. We have received your message, and our support team
              will review it and get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto bg-gold-gradient px-6 py-3 text-xs tracking-[0.12em] uppercase text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="space-y-4 rounded-xl border border-border/60 bg-card/30 p-4 sm:p-5 lg:p-6" onSubmit={submitContact}>
            <input
              className="order-input"
              placeholder="Full Name"
              value={contact.fullName}
              onChange={(e) => setContact((prev) => ({ ...prev, fullName: e.target.value }))}
              required
            />
            <input
              className="order-input"
              type="email"
              placeholder="Email Address"
              value={contact.email}
              onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
            <textarea
              className="order-input min-h-32 resize-none"
              placeholder="Your message"
              value={contact.message}
              onChange={(e) => setContact((prev) => ({ ...prev, message: e.target.value }))}
              required
            />
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              disabled={submitting}
              className="w-full sm:w-auto bg-gold-gradient px-6 py-3 text-xs tracking-[0.12em] uppercase text-primary-foreground hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
};

export default Contact;

