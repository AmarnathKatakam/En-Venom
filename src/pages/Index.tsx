import { useState } from "react";

import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import StorySection from "@/components/StorySection";
import SourceSection from "@/components/SourceSection";

const Index = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <ProductSection
        orderOpen={orderOpen}
        setOrderOpen={setOrderOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <StorySection />
      <SourceSection />
    </div>
  );
};

export default Index;