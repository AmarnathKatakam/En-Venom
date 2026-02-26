import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import StorySection from "@/components/StorySection";
import SourceSection from "@/components/SourceSection";

interface Props {
  onOrder: (product?: string) => void;
}

const Index = ({ onOrder }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProductSection onOrder={onOrder} />
      <StorySection />
      <SourceSection />
    </div>
  );
};

export default Index;