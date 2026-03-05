import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import bottle250Video from "@/assets/bottle-250ml.mp4";
import bottle750Video from "@/assets/bottle-750ml.mp4";
import bottle1LVideo from "@/assets/bottle-1ltr.mp4";
import { useViewportVideo } from "@/hooks/useViewportVideo";

const products = [
  {
    name: "Essence",
    size: "250 ML Bottle",
    description: "The perfect companion for moments of clarity. Compact, elegant, essential.",
    video: bottle250Video,
  },
  {
    name: "Prestige",
    size: "750 ML Bottle",
    description: "For those who appreciate the finer things. Our signature presentation.",
    video: bottle750Video,
  },
  {
    name: "Imperial",
    size: "1 Litre Bottle",
    description: "The full experience. Uncompromised purity in generous measure.",
    video: bottle1LVideo,
  },
];

type Product = (typeof products)[number];

interface ProductSectionProps {
  onOrder: (product?: string) => void;
}

interface ProductCardProps {
  product: Product;
  onOrder: (product?: string) => void;
}

const ProductCard = ({ product, onOrder }: ProductCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const videoRef = useViewportVideo({
    id: `product-video-${product.name.toLowerCase()}`,
    threshold: 0.65,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1, 0.75]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mx-auto flex w-full max-w-[680px] flex-col items-center p-4 text-center sm:p-6 lg:p-8 xl:p-10 2xl:max-w-[760px]"
    >
      <div className="relative mb-6 flex h-[180px] w-full items-center justify-center sm:mb-7 sm:h-[230px] lg:h-[280px] xl:h-[340px] 2xl:h-[390px]">
        <motion.div
          className="flex h-full w-full items-center justify-center"
          animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            src={product.video}
            loop
            playsInline
            preload="metadata"
            className="max-h-full w-auto object-contain"
          />
        </motion.div>
        <div className="absolute bottom-2 h-8 w-32 rounded-full bg-primary/10 blur-xl sm:w-40" />
      </div>

      <p className="mb-2 text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em] uppercase text-primary">
        {product.size}
      </p>
      <h3 className="mb-2 text-2xl font-semibold sm:text-3xl xl:text-[2rem] 2xl:text-[2.4rem]">{product.name}</h3>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground sm:text-base xl:max-w-md xl:text-[1.05rem]">{product.description}</p>

      <button
        onClick={() => onOrder(product.size)}
        className="mt-5 w-full bg-gold-gradient px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:text-xs sm:tracking-[0.18em]"
      >
        Order This Selection
      </button>
    </motion.div>
  );
};

const ProductSection = ({ onOrder }: ProductSectionProps) => {
  return (
    <section id="products" className="relative py-14 sm:py-16 lg:py-10 xl:py-12 2xl:py-14">
      <div className="site-shell">
        <div className="mb-10 text-center lg:hidden">
          <p className="mb-3 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">The Collection</p>
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            Choose Your <span className="text-gold-gradient italic">Purity</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
            Three expressions of perfection. Each crafted for a different moment of indulgence.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          <div className="hidden lg:flex lg:w-[44%] lg:shrink-0 lg:sticky lg:top-24 lg:h-[calc(100svh-10rem)] lg:items-center lg:pr-10 xl:pr-12 2xl:pr-14">
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] uppercase text-primary">The Collection</p>
              <h2 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl 2xl:text-6xl">
                Choose Your <span className="text-gold-gradient italic">Purity</span>
              </h2>
              <p className="max-w-lg text-base text-muted-foreground xl:text-lg">
                Three expressions of perfection. Each crafted for a different moment of indulgence.
              </p>
            </div>
          </div>

          <div className="w-full space-y-6 sm:space-y-8 lg:w-[56%] lg:space-y-0">
            {products.map((product) => (
              <div key={product.name} className="lg:flex lg:min-h-[66svh] lg:items-center lg:justify-center lg:py-5 xl:min-h-[64svh] 2xl:min-h-[62svh]">
                <ProductCard product={product} onOrder={onOrder} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
