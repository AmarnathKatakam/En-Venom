// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import bottle250 from "@/assets/bottle-250ml.png";
// import bottle750 from "@/assets/bottle-750ml.png";
// import bottle1L from "@/assets/bottle-1ltr.png";

// const products = [
//   {
//     name: "Essence",
//     size: "250 ML",
//     price: "₹45",
//     description: "The perfect companion for moments of clarity. Compact, elegant, essential.",
//     image: bottle250,
//   },
//   {
//     name: "Prestige",
//     size: "750 ML",
//     price: "₹120",
//     description: "For those who appreciate the finer things. Our signature presentation.",
//     image: bottle750,
//     featured: true,
//   },
//   {
//     name: "Imperial",
//     size: "1 Litre",
//     price: "₹160",
//     description: "The full experience. Uncompromised purity in generous measure.",
//     image: bottle1L,
//   },
// ];

// const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 60 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`relative group flex flex-col items-center text-center p-8 md:p-12 border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-700 ${
//         product.featured ? "md:-mt-8 md:mb-8 glow-gold" : ""
//       }`}
//     >
//       {product.featured && (
//         <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-primary-foreground text-[10px] tracking-[0.3em] uppercase px-4 py-1 font-body">
//           Signature
//         </div>
//       )}

//       {/* Bottle */}
//       <div className="relative mb-8 h-[250px] md:h-[320px] flex items-center justify-center">
//         <motion.div
//           animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -10 : 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <img
//             src={product.image}
//             alt={`Blackroth ${product.name} ${product.size}`}
//             className="h-[220px] md:h-[280px] object-contain"
//           />
//         </motion.div>
//         {/* Reflection */}
//         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/5 blur-xl rounded-full" />
//       </div>

//       <div className="line-gold mb-6" />

//       <p className="text-xs tracking-[0.3em] uppercase text-primary font-body mb-2">{product.size}</p>
//       <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">{product.name}</h3>
//       <p className="font-elegant text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
//         {product.description}
//       </p>

//       <div className="mt-auto">
//         <p className="font-display text-3xl text-gold-gradient font-bold mb-4">{product.price}</p>
//         {/* <button className="border border-primary/40 text-primary font-body text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
//           Add to Cart
//         </button> */}
//       </div>
//     </motion.div>
//   );
// };

// const ProductSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="products" className="py-24 md:py-32 relative">
//       <div className="absolute top-0 left-0 right-0 line-gold" />

//       <div className="container mx-auto px-6">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16 md:mb-20"
//         >
//           <p className="text-xs tracking-[0.4em] uppercase text-primary font-body mb-4">The Collection</p>
//           <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
//             Choose Your <span className="text-gold-gradient italic">Purity</span>
//           </h2>
//           <p className="font-elegant text-muted-foreground text-lg max-w-lg mx-auto">
//             Three expressions of perfection. Each crafted for a different moment of indulgence.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-5xl mx-auto items-start">
//           {products.map((product, i) => (
//             <ProductCard key={product.name} product={product} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSection;
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import bottle250 from "@/assets/bottle-250ml.png";
import bottle750 from "@/assets/bottle-750ml.png";
import bottle1L from "@/assets/bottle-1ltr.png";

const products = [
  {
    name: "Essence",
    size: "250 ML",
    price: "₹45",
    description: "The perfect companion for moments of clarity. Compact, elegant, essential.",
    image: bottle250,
  },
  {
    name: "Prestige",
    size: "750 ML",
    price: "₹120",
    description: "For those who appreciate the finer things. Our signature presentation.",
    image: bottle750,
    featured: true,
  },
  {
    name: "Imperial",
    size: "1 Litre",
    price: "₹160",
    description: "The full experience. Uncompromised purity in generous measure.",
    image: bottle1L,
  },
];

const ProductCard = ({ product, onOrder }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center text-center p-12 bg-transparent border-none shadow-none"
    >
      <div className="relative mb-10 h-[42vh] max-h-[380px] flex items-center justify-center">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -12 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={product.image} className="max-h-full w-auto object-contain" />
        </motion.div>

        <div className="absolute bottom-6 w-40 h-10 bg-primary/10 blur-2xl rounded-full" />
      </div>

      <p className="text-xs tracking-[0.35em] uppercase text-primary mb-2">
        {product.size}
      </p>
      <h3 className="text-3xl font-semibold mb-3">{product.name}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">
        {product.description}
      </p>
      <p className="text-3xl font-bold text-gold-gradient">{product.price}</p>

      <button
        onClick={onOrder}
        className="mt-6 bg-gold-gradient text-primary-foreground text-xs tracking-[0.18em] uppercase px-8 py-3 hover:opacity-90 transition-opacity"
      >
        Order This Selection
      </button>
    </motion.div>
  );
};

const ProductSection = ({
  orderOpen,
  setOrderOpen,
  selectedProduct,
  setSelectedProduct,
}: any) => {
  return (
    <section id="products" className="relative">
      <div className="flex min-h-screen">
        {/* LEFT TEXT */}
        <div className="w-1/2 sticky top-0 h-screen flex items-center px-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
              The Collection
            </p>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Choose Your <span className="text-gold-gradient italic">Purity</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Three expressions of perfection. Each crafted for a different moment of indulgence.
            </p>
          </div>
        </div>

        {/* RIGHT PRODUCTS */}
        <div className="w-1/2 relative">
          {products.map((product) => (
            <div
              key={product.name}
              className="min-h-screen flex items-center justify-center"
            >
              <ProductCard
                product={product}
                onOrder={() => {
                  setSelectedProduct(product.size);
                  setOrderOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ORDER MODAL */}
      {orderOpen && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background max-w-lg w-full p-8 rounded-2xl border border-border shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-body text-xl tracking-wider text-gold-gradient">
                Premium Order Request
              </h2>
              <button onClick={() => setOrderOpen(false)}>✕</button>
            </div>

            <form className="space-y-4">
              <input className="order-input" placeholder="Full Name" />
              <input className="order-input" placeholder="Contact Number" />
              <input className="order-input" placeholder="Email Address" />

              <select className="order-input" defaultValue={selectedProduct}>
                <option>250 ML</option>
                <option>750 ML</option>
                <option>1 Litre</option>
              </select>

              <input type="number" className="order-input" placeholder="Quantity" />

              <button className="w-full bg-gold-gradient py-3 text-xs tracking-[0.15em] uppercase text-primary-foreground hover:opacity-90">
                Send Order
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;