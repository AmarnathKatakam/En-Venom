import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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

      <h1 className="mb-6 text-3xl sm:text-4xl font-bold">Contact Us</h1>
      <p className="mb-8 leading-relaxed text-muted-foreground">
        Reach our support team for orders, delivery updates, or general inquiries.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Email</p>
            <p className="text-muted-foreground">support@blackroth.com</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Phone</p>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Address</p>
            <p className="text-muted-foreground">BlackRoth Beverages, Hyderabad, India</p>
          </div>
        </div>

        <form className="space-y-4">
          <input className="order-input" placeholder="Full Name" required />
          <input className="order-input" type="email" placeholder="Email Address" required />
          <textarea className="order-input min-h-32 resize-none" placeholder="Your message" required />
          <button className="w-full sm:w-auto bg-gold-gradient px-6 py-3 text-xs tracking-[0.12em] uppercase text-primary-foreground hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
