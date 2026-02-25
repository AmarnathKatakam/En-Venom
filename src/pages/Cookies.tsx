import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cookies = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-6 py-24 max-w-4xl"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="text-primary mb-8 hover:opacity-80 transition-opacity"
      >
        ← Back to Home
      </button>

      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        This Cookie Policy explains how BlackRoth Beverages uses cookies and
        similar technologies to recognize you when you visit our website.
        It describes what these technologies are, why we use them,
        and your rights to control their usage.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        What Are Cookies?
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Cookies are small text files stored on your device when you visit a website.
        They help websites function efficiently, remember user preferences,
        and collect analytical data to improve user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        How We Use Cookies
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We use cookies to enhance website functionality, analyze traffic patterns,
        understand user behavior, and improve our services.
        Cookies may also help personalize your experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Types of Cookies We Use
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        <strong>Essential Cookies:</strong> Required for basic site functionality. <br />
        <strong>Performance Cookies:</strong> Help us understand how visitors interact with our site. <br />
        <strong>Functional Cookies:</strong> Remember preferences and enhance user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Managing Cookies
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        You can control or disable cookies through your browser settings.
        Please note that disabling certain cookies may affect website functionality.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Updates to This Policy
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We may update this Cookie Policy from time to time to reflect
        changes in legal requirements or operational practices.
      </p>

      <p className="text-muted-foreground mt-12 text-sm">
        Last updated: January 2026
      </p>
    </motion.section>
  );
};

export default Cookies;