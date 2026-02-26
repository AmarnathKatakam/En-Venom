import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import sourceBg from "@/assets/source-bg.jpg";
import sourceAlkaline from "@/assets/source-alkaline.png";
import sourceMountain from "@/assets/source-mountain.png";
import sourceMinerals from "@/assets/source-minerals.png";

const sourceFeatures = [
  { icon: sourceAlkaline, title: "Naturally Alkaline", desc: "pH 8.5+ from the source" },
  { icon: sourceMountain, title: "Mountain Spring", desc: "Protected underground aquifer" },
  { icon: sourceMinerals, title: "Mineral Rich", desc: "Essential trace minerals" },
];

const SourceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="source" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0">
        <img src={sourceBg} alt="Natural spring source" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.4em] uppercase text-primary font-body">
            The Source
          </p>
          <h2 className="mb-6 sm:mb-8 font-display text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight">
            From the Heart of <span className="text-gold-gradient italic">Earth</span>
          </h2>
          <p className="mb-10 sm:mb-12 font-elegant text-base sm:text-lg text-muted-foreground leading-relaxed">
            Our water originates from protected underground aquifers, shielded from modern pollution
            for thousands of years. Naturally filtered through volcanic rock formations, each mineral
            tells a story of geological perfection. The result is water with a naturally alkaline pH
            above 8.5, rich in calcium, magnesium, and silica - the way nature designed it.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
            {sourceFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="flex flex-col items-center border border-border/50 bg-card/30 p-6 sm:p-8 backdrop-blur-sm"
              >
                <img src={item.icon} alt={item.title} className="mb-4 h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20" />
                <h3 className="mb-2 font-display text-base sm:text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SourceSection;
