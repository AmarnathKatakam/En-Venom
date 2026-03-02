import { motion } from "framer-motion";
import heroVideo from "@/assets/herovideo.mp4";
import bottleHero from "@/assets/bottle-hero.png";
import envenomlogo from "@/assets/envenom-logo.png";
import { activateVideoWithSound, useViewportVideo } from "@/hooks/useViewportVideo";

const Hero = () => {
  const heroVideoRef = useViewportVideo({ id: "hero-video", threshold: 0.5 });

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      onClick={() => {
        void activateVideoWithSound("hero-video");
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={heroVideoRef}
          src={heroVideo}
          loop
          playsInline
          preload="metadata"
          onClick={() => {
            void activateVideoWithSound("hero-video");
          }}
          className="h-full w-full object-fill brightness-100 contrast-100 saturate-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-white/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white/15" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/20"
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

      <div className="site-shell relative z-10 flex h-full flex-col items-center justify-center gap-6 py-4 md:gap-10 lg:flex-row lg:items-end lg:justify-between lg:py-6 xl:gap-14 2xl:gap-20">
        <div className="flex-1 text-center lg:text-left xl:max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="mb-4 brand-font text-[36px] font-bold uppercase tracking-[0.26em] text-gold-gradient sm:text-[22px] sm:tracking-[0.36em]">
              Unleash the power of hydration
            </p>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-5 md:mb-6"
          >
            <img
              src={envenomlogo}
              alt="Envenom Logo"
              className="mx-auto w-[190px] object-contain sm:w-[250px] md:w-[340px] lg:mx-0 lg:w-[420px] xl:w-[470px] 2xl:w-[520px]"
            />
          </motion.div> */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mx-auto mb-7 max-w-md px-1 font-elegant text-[clamp(1rem,2.5vw,1.55rem)] leading-relaxed text-slate-800 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)] sm:px-0 md:mb-8 lg:mx-0 lg:max-w-xl"
          >
            Born from ancient mineral springs, purified by nature. Experience water in its most pristine form -
            alkaline, mineral-rich, extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start"
          >
            <button
              onClick={scrollToProducts}
              className="w-full bg-gold-gradient px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 shimmer sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
            >
              Explore Collection
            </button>
            <button
              onClick={() => document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full border border-primary/30 px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/5 sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
            >
              Our Story
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="flex w-full max-w-[320px] flex-1 justify-center sm:max-w-[380px] md:max-w-[430px] lg:max-w-[480px] xl:max-w-[520px]"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-44 w-44 rounded-full bg-primary/5 blur-3xl animate-pulse sm:h-56 sm:w-56 md:h-64 md:w-64" />
            </div>
            <motion.img
              src={bottleHero}
              alt="Blackroth Premium Water Bottle"
              className="relative z-10 h-[250px] object-contain drop-shadow-2xl sm:h-[320px] md:h-[390px] lg:h-[430px] xl:h-[470px] 2xl:h-[520px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
