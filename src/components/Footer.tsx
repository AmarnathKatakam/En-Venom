// import { motion, useInView } from "framer-motion";
// import { useRef, useState } from "react";

// const Footer = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-50px" });
//   const [email, setEmail] = useState("");

//   return (
//     <footer id="contact" className="relative pt-24 pb-8 border-t border-border/30">
//       <div className="container mx-auto px-6">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
//         >
//           {/* Brand */}
//           <div className="md:col-span-2">
//             {/* <h3 className="font-display text-3xl font-bold text-gold-gradient mb-4">BLACKROTH</h3> */}
//             <h3 className="brand-font text-3xl font-bold text-gold-gradient mb-4">
//               BlackRoth
//             </h3>
//             <p className="font-elegant text-muted-foreground leading-relaxed max-w-sm mb-6">
//               Premium natural mineral alkaline water. Sourced from ancient springs, 
//               crafted for those who demand excellence.
//             </p>
//             {/* Newsletter */}
//             <div className="flex gap-2 max-w-sm">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-1 bg-secondary border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
//               />
//               <button className="bg-gold-gradient text-primary-foreground font-body text-xs tracking-[0.15em] uppercase px-6 py-3 hover:opacity-90 transition-opacity">
//                 Join
//               </button>
//             </div>
//           </div>

//           {/* Links */}
//           <div>
//             <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Company</h4>
//             <ul className="space-y-3">
//               {["About Us", "Our Source"].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">Support</h4>
//             <ul className="space-y-3">
//               {["Contact Us", "FAQ", "Shipping", "Returns"].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </motion.div>

//         {/* Bottom */}
//         <div className="line-gold mb-6" />
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* <p className="font-body text-xs text-muted-foreground">
//             Â© 2026 Blackroth Beverages. All rights reserved.
//           </p> */}

//         <p className="font-body text-xs text-muted-foreground">
//           Â© 2026 <span className="brand-font">BlackRoth</span> Beverages. All rights reserved.
//         </p>
//           <div className="flex gap-6">
//             {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
//               <a key={item} href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
}

const Footer = ({ setOrderOpen, setSelectedProduct }: FooterProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-20 pb-8 border-t border-border/30">
      <div className="container mx-auto px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="brand-font text-3xl font-bold text-gold-gradient mb-4">
              BlackRoth
            </h3>

            <p className="font-elegant text-muted-foreground leading-relaxed max-w-sm mb-6">
              Premium natural mineral alkaline water. Sourced from ancient springs,
              crafted for those who demand excellence.
            </p>

            {/* ORDER BUTTON */}
            <button
              onClick={() => {
                setSelectedProduct(""); // no preselect
                setOrderOpen(true);
              }}
              className="bg-gold-gradient text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-8 py-3 hover:opacity-90 transition-opacity"
            >
              Place Your Order
            </button>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("#story")}
                  className="font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#source")}
                  className="font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  Our Source
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#faq")}
                  className="font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="line-gold mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 <span className="brand-font">BlackRoth</span> Beverages. All rights reserved.
          </p>

          <div className="flex gap-6">
            <button
              onClick={() => navigate("/privacy")}
              className="font-body text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => navigate("/terms")}
              className="font-body text-xs text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </button>

            <button
              onClick={() => navigate("/cookies")}
              className="font-body text-xs text-muted-foreground hover:text-foreground"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;