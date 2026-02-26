import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import bottle250 from "@/assets/bottle-250ml.png";
import bottle750 from "@/assets/bottle-750ml.png";
import bottle1L from "@/assets/bottle-1ltr.png";

const products = [
  {
    name: "Essence",
    size: "250 ML Bottle",
    price: "Rs 45",
    description: "The perfect companion for moments of clarity. Compact, elegant, essential.",
    image: bottle250,
  },
  {
    name: "Prestige",
    size: "750 ML Bottle",
    price: "Rs 120",
    description: "For those who appreciate the finer things. Our signature presentation.",
    image: bottle750,
  },
  {
    name: "Imperial",
    size: "1 Litre Bottle",
    price: "Rs 160",
    description: "The full experience. Uncompromised purity in generous measure.",
    image: bottle1L,
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
      className="flex flex-col items-center text-center p-6 sm:p-8 lg:p-10"
    >
      <div className="relative mb-8 flex h-[220px] w-full items-center justify-center sm:h-[260px] lg:h-[300px]">
        <motion.div
          className="flex h-full w-full items-center justify-center"
          animate={{ scale: hovered ? 1.06 : 1, y: hovered ? -8 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} className="max-h-full w-auto object-contain" />
        </motion.div>
        <div className="absolute bottom-2 h-8 w-32 rounded-full bg-primary/10 blur-xl sm:w-40" />
      </div>

      <p className="mb-2 text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em] uppercase text-primary">
        {product.size}
      </p>
      <h3 className="mb-2 text-2xl sm:text-3xl font-semibold">{product.name}</h3>
      <p className="mb-5 max-w-xs text-sm text-muted-foreground">{product.description}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gold-gradient">{product.price}</p>

      <button
        onClick={() => onOrder(product.size)}
        className="mt-5 w-full sm:w-auto bg-gold-gradient px-6 py-3 text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
      >
        Order This Selection
      </button>
    </motion.div>
  );
};

const ProductSection = ({ onOrder }: ProductSectionProps) => {
  return (
    <section id="products" className="relative py-16 sm:py-20 lg:py-0">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center lg:hidden">
          <p className="mb-3 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary">The Collection</p>
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold">
            Choose Your <span className="text-gold-gradient italic">Purity</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm sm:text-base text-muted-foreground">
            Three expressions of perfection. Each crafted for a different moment of indulgence.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          <div className="hidden lg:flex lg:w-5/12 lg:sticky lg:top-24 lg:h-[calc(100svh-6rem)] lg:items-center lg:pr-10">
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] uppercase text-primary">The Collection</p>
              <h2 className="mb-6 text-5xl xl:text-6xl font-bold leading-tight">
                Choose Your <span className="text-gold-gradient italic">Purity</span>
              </h2>
              <p className="max-w-md text-lg text-muted-foreground">
                Three expressions of perfection. Each crafted for a different moment of indulgence.
              </p>
            </div>
          </div>

          <div className="w-full space-y-6 sm:space-y-8 lg:w-7/12 lg:space-y-0">
            {products.map((product) => (
              <div key={product.name} className="lg:flex lg:min-h-[92svh] lg:items-center lg:justify-center lg:py-10">
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
