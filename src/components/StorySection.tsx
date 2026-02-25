import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bottlesLineup from "@/assets/bottles-lineup.png";
import statPh from "@/assets/stat-ph.png";
import statNatural from "@/assets/stat-natural.png";
import statMinerals from "@/assets/stat-minerals.png";
import statPure from "@/assets/stat-pure.png";

const stats = [
  { value: "8.5+", label: "pH Level", icon: statPh },
  { value: "100%", label: "Natural Source", icon: statNatural },
  { value: "72", label: "Essential Minerals", icon: statMinerals },
  { value: "0", label: "Additives", icon: statPure },
];

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 line-gold" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={bottlesLineup}
                alt="Blackroth Beverages Collection"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-body mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Crafted by <span className="text-gold-gradient italic">Nature</span>,<br />
              Perfected by <span className="text-gold-gradient italic">Passion</span>
            </h2>

            <div className="space-y-4 mb-10">
              {/* <p className="font-elegant text-muted-foreground leading-relaxed">
                Deep beneath ancient geological formations, water embarks on a journey spanning millennia. 
                Filtered through layers of pristine rock, enriched with essential minerals, it emerges as 
                something extraordinary — Blackroth.
              </p> */}

              <p className="font-elegant text-muted-foreground leading-relaxed">
                Deep beneath ancient geological formations, water embarks on a journey spanning millennia. 
                Filtered through layers of pristine rock, enriched with essential minerals, it emerges as 
                something extraordinary — <span className="brand-font text-gold-gradient">BlackRoth</span>.
              </p>
              <p className="font-elegant text-muted-foreground leading-relaxed">
                We don't manufacture water. We curate it. Every drop is naturally alkaline, mineral-rich, 
                and bottled at the source to preserve its remarkable purity. This is water as nature intended — 
                untouched, uncompromised, unparalleled.
              </p>
            </div>

            {/* Stats with icons */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="text-center flex flex-col items-center"
                >
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain mb-2"
                  />
                  <p className="font-display text-xl md:text-2xl font-bold text-gold-gradient">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
