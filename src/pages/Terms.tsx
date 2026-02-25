import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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

      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        These Terms of Service govern your use of the BlackRoth Beverages website,
        products, and services. By accessing or placing an order through our platform,
        you agree to comply with the terms outlined below.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Orders & Payments</h2>
      <p className="text-muted-foreground leading-relaxed">
        All orders are subject to product availability and confirmation.
        Payments must be successfully processed prior to order fulfillment.
        We reserve the right to cancel or refuse any order at our discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Delivery & Fulfillment</h2>
      <p className="text-muted-foreground leading-relaxed">
        Delivery timelines are estimates and may vary depending on location,
        inventory levels, and external factors. BlackRoth Beverages is not responsible
        for delays caused by unforeseen circumstances.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Product Usage</h2>
      <p className="text-muted-foreground leading-relaxed">
        Our products are intended for personal consumption only. Misuse,
        improper storage, or alteration of the product voids any liability claims.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Limitation of Liability</h2>
      <p className="text-muted-foreground leading-relaxed">
        BlackRoth Beverages shall not be held liable for indirect, incidental,
        or consequential damages arising from the use of our products or services.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Changes to Terms</h2>
      <p className="text-muted-foreground leading-relaxed">
        We reserve the right to update these Terms of Service at any time.
        Continued use of our website constitutes acceptance of revised terms.
      </p>

      <p className="text-muted-foreground mt-12 text-sm">
        Last updated: January 2026
      </p>
    </motion.section>
  );
};

export default Terms;