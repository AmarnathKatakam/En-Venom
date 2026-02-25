import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/herovideo.mp4";
import bottleHero from "@/assets/bottle-hero.png";
import envenomlogo from "@/assets/envenom-logo.png";

const Hero = () => {
  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Water splash"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div> */}

      {/* Background */}
<div className="absolute inset-0 overflow-hidden">
  <video
    src={heroVideo}
    autoPlay
    loop
    muted={true} 
    playsInline
    className="w-full object-cover opacity-100"
  />

  {/* Dark gradient overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
  <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
</div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Unleash the power of hydration
            </p>
          </motion.div>

          {/* <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
          >
            <span className="brand-font text-gold-gradient text-shadow-gold">
              BlackRoth
            </span>
            <br />
            <span className="text-foreground text-4xl md:text-5xl lg:text-6xl font-light italic">
              Beverages
            </span>
          </motion.h1> */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <img
              src={envenomlogo}
              alt="Envenom Logo"
              className="w-[280px] md:w-[420px] lg:w-[520px] object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-elegant text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Born from ancient mineral springs, purified by nature. 
            Experience water in its most pristine form — alkaline, mineral-rich, extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToProducts}
              className="bg-gold-gradient text-primary-foreground font-body text-sm tracking-[0.2em] uppercase px-8 py-4 hover:opacity-90 transition-opacity shimmer"
            >
              Explore Collection
            </button>
            <button
              onClick={() => document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-primary/30 text-primary font-body text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-primary/5 transition-colors"
            >
              Our Story
            </button>
          </motion.div>
        </div>

        {/* Bottle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
            </div>
            <motion.img
              src={bottleHero}
              alt="Blackroth Premium Water Bottle"
              className="relative z-10 h-[400px] md:h-[550px] object-contain drop-shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
