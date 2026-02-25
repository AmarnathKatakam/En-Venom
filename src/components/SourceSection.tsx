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
    <section id="source" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={sourceBg} alt="Natural spring source" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary font-body mb-4">The Source</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            From the Heart of <span className="text-gold-gradient italic">Earth</span>
          </h2>
          <p className="font-elegant text-lg text-muted-foreground leading-relaxed mb-12">
            Our water originates from protected underground aquifers, shielded from modern pollution 
            for thousands of years. Naturally filtered through volcanic rock formations, each mineral 
            tells a story of geological perfection. The result is water with a naturally alkaline pH 
            above 8.5, rich in calcium, magnesium, and silica — the way nature designed it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sourceFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="border border-border/50 bg-card/30 p-8 backdrop-blur-sm flex flex-col items-center"
              >
                <img src={item.icon} alt={item.title} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
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
