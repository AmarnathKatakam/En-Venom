import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", id: "#hero" },
  { label: "Products", id: "#products" },
  { label: "Story", id: "#story" },
  { label: "Source", id: "#source" },
  { label: "Contact", id: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⭐ Smart navigation + scroll
  const goToSection = (id: string) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "py-3 bg-background/35 backdrop-blur-md border-b border-white/20"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* LOGO */}
        <button
          onClick={() => goToSection("#hero")}
          className="brand-font text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-gold-gradient"
        >
          BlackRoth
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goToSection(item.id)}
              className="text-sm tracking-[0.15em] uppercase font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle navigation menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-primary" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-primary" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-primary" />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-dark md:hidden"
          >
            <div className="flex flex-col items-center gap-5 px-6 py-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goToSection(item.id)}
                  className="w-full text-center text-sm tracking-[0.18em] uppercase font-body text-foreground hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
