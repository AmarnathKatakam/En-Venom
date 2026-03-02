import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cookies = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="legal-shell py-16 sm:py-20 lg:py-24"
    >
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-sm sm:text-base text-primary hover:opacity-80 transition-opacity"
      >
        {"<- Back to Home"}
      </button>

      <h1 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">Cookie Policy</h1>

      <p className="mb-6 max-w-4xl leading-relaxed text-muted-foreground">
        This Cookie Policy explains how BlackRoth Beverages uses cookies and
        similar technologies to recognize you when you visit our website.
        It describes what these technologies are, why we use them,
        and your rights to control their usage.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">What Are Cookies?</h2>
      <p className="max-w-4xl leading-relaxed text-muted-foreground">
        Cookies are small text files stored on your device when you visit a website.
        They help websites function efficiently, remember user preferences,
        and collect analytical data to improve user experience.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">How We Use Cookies</h2>
      <p className="max-w-4xl leading-relaxed text-muted-foreground">
        We use cookies to enhance website functionality, analyze traffic patterns,
        understand user behavior, and improve our services.
        Cookies may also help personalize your experience.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Types of Cookies We Use</h2>
      <p className="max-w-4xl leading-relaxed text-muted-foreground">
        <strong>Essential Cookies:</strong> Required for basic site functionality. <br />
        <strong>Performance Cookies:</strong> Help us understand how visitors interact with our site. <br />
        <strong>Functional Cookies:</strong> Remember preferences and enhance user experience.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Managing Cookies</h2>
      <p className="max-w-4xl leading-relaxed text-muted-foreground">
        You can control or disable cookies through your browser settings.
        Please note that disabling certain cookies may affect website functionality.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Updates to This Policy</h2>
      <p className="max-w-4xl leading-relaxed text-muted-foreground">
        We may update this Cookie Policy from time to time to reflect
        changes in legal requirements or operational practices.
      </p>

      <p className="mt-12 text-sm text-muted-foreground">Last updated: January 2026</p>
    </motion.section>
  );
};

export default Cookies;

