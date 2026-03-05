import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import envenomlogo from "@/assets/envenom-logo.png";

const navItems = [
  { label: "Home", id: "#hero" },
  { label: "Products", id: "#products" },
  { label: "Story", id: "#story" },
  { label: "Source", id: "#source" },
  { label: "Contact", id: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Smart navigation + scroll
  const goToSection = (id: string) => {
    const scrollWithOffset = () => {
      if (id === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const section = document.querySelector(id);
      const nav = document.querySelector("nav");
      if (!section) return;

      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const top = Math.max(sectionTop - navHeight - 8, 0);
      window.scrollTo({ top, behavior: "smooth" });
    };

    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollWithOffset();
      }, 150);
    } else {
      scrollWithOffset();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div className="max-w-[1400px] w-full mx-3 mt-3 px-6 py-1.5 flex items-center justify-between gap-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">

        {/* LOGO */}
        <button
          onClick={() => goToSection("#hero")}
          className="shrink-0 rounded-md p-1"
          aria-label="envenom"
        >
          <img
            src={envenomlogo}
            alt="envenom"
            className="h-7 w-auto sm:h-8 md:h-9 xl:h-10 2xl:h-11 object-contain"
          />
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 2xl:gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goToSection(item.id)}
              className="text-xs sm:text-sm 2xl:text-[15px] tracking-[0.12em] xl:tracking-[0.15em] uppercase font-body text-slate-700 hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
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
            className="absolute top-full left-0 right-0 mt-2 lg:hidden flex justify-center"
          >
            <div className="max-w-[1400px] w-full mx-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              <div className="site-shell flex flex-col items-center gap-3 px-4 py-5 sm:gap-4 sm:py-6">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => goToSection(item.id)}
                    className="w-full rounded-md py-2 text-center text-xs sm:text-sm tracking-[0.18em] uppercase font-body text-foreground hover:text-primary"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
