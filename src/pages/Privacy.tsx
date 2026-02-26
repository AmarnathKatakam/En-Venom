import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-24"
    >
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-sm sm:text-base text-primary hover:opacity-80 transition-opacity"
      >
        {"<- Back to Home"}
      </button>

      <h1 className="mb-6 text-3xl sm:text-4xl font-bold">Privacy Policy</h1>

      <p className="mb-6 leading-relaxed text-muted-foreground">
        At BlackRoth Beverages, we respect your privacy and are committed to protecting
        your personal information. This Privacy Policy outlines how we collect, use,
        disclose, and safeguard your data when you interact with our website and services.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Information We Collect</h2>
      <p className="leading-relaxed text-muted-foreground">
        We may collect personal information such as your name, phone number,
        email address, delivery details, and order history. Additionally,
        we may gather anonymous browsing data to enhance user experience.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">How We Use Information</h2>
      <p className="leading-relaxed text-muted-foreground">
        Your information is used to process orders, provide customer support,
        improve our services, communicate updates, and ensure secure transactions.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Data Protection & Security</h2>
      <p className="leading-relaxed text-muted-foreground">
        We implement industry-standard technical and organizational safeguards
        to protect your data from unauthorized access, misuse, or disclosure.
        Sensitive information is handled with strict confidentiality.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Third-Party Services</h2>
      <p className="leading-relaxed text-muted-foreground">
        We may use trusted third-party service providers for payment processing,
        analytics, and logistics. These partners are required to maintain the
        confidentiality and security of your information.
      </p>

      <h2 className="mt-10 mb-3 text-xl sm:text-2xl font-semibold">Your Rights</h2>
      <p className="leading-relaxed text-muted-foreground">
        You have the right to access, update, or request deletion of your
        personal data. For inquiries regarding your privacy rights,
        please contact our support team.
      </p>

      <p className="mt-12 text-sm text-muted-foreground">Last updated: January 2026</p>
    </motion.section>
  );
};

export default Privacy;
