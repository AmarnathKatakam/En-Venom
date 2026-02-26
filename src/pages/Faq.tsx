import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const faqItems = [
  {
    question: "How long does delivery take?",
    answer: "Delivery timelines vary by location. Most orders are delivered within 2 to 5 business days after confirmation.",
  },
  {
    question: "How can I place a bulk order?",
    answer: "Use the order button on the home page and mention your required quantity. Our team will contact you for confirmation.",
  },
  {
    question: "Is your water naturally alkaline?",
    answer: "Yes. Our water is naturally alkaline and mineral-rich, sourced from protected underground aquifers.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Yes, if your order has not been dispatched. Contact support as soon as possible with your order details.",
  },
];

const Faq = () => {
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

      <h1 className="mb-6 text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mb-8 leading-relaxed text-muted-foreground">
        Quick answers to common questions about products, orders, and delivery.
      </p>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.question} className="rounded-xl border border-border/60 bg-card/30 p-5">
            <h2 className="mb-2 text-lg font-semibold">{item.question}</h2>
            <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Faq;
