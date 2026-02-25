import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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

      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        At BlackRoth Beverages, we respect your privacy and are committed to protecting
        your personal information. This Privacy Policy outlines how we collect, use,
        disclose, and safeguard your data when you interact with our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Information We Collect</h2>
      <p className="text-muted-foreground leading-relaxed">
        We may collect personal information such as your name, phone number,
        email address, delivery details, and order history. Additionally,
        we may gather anonymous browsing data to enhance user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">How We Use Information</h2>
      <p className="text-muted-foreground leading-relaxed">
        Your information is used to process orders, provide customer support,
        improve our services, communicate updates, and ensure secure transactions.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Data Protection & Security</h2>
      <p className="text-muted-foreground leading-relaxed">
        We implement industry-standard technical and organizational safeguards
        to protect your data from unauthorized access, misuse, or disclosure.
        Sensitive information is handled with strict confidentiality.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Third-Party Services</h2>
      <p className="text-muted-foreground leading-relaxed">
        We may use trusted third-party service providers for payment processing,
        analytics, and logistics. These partners are required to maintain the
        confidentiality and security of your information.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Your Rights</h2>
      <p className="text-muted-foreground leading-relaxed">
        You have the right to access, update, or request deletion of your
        personal data. For inquiries regarding your privacy rights,
        please contact our support team.
      </p>

      <p className="text-muted-foreground mt-12 text-sm">
        Last updated: January 2026
      </p>
    </motion.section>
  );
};

export default Privacy;