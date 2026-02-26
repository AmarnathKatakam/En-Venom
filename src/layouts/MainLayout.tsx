import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

type OrderHandler = (product?: string) => void;
type LayoutChildren = ReactNode | ((onOrder: OrderHandler) => ReactNode);

interface Props {
  children: LayoutChildren;
}

const MainLayout = ({ children }: Props) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openOrder: OrderHandler = (product?: string) => {
    setSelectedProduct(product || "");
    setOrderOpen(true);
  };

  const content =
    typeof children === "function" ? children(openOrder) : children;

  return (
    <>
      <Navbar />

      <main className="pt-20 md:pt-24">
        {content}
      </main>

      <Footer onOrder={() => openOrder()} />

      <OrderModal
        open={orderOpen}
        product={selectedProduct}
        onClose={() => setOrderOpen(false)}
      />
    </>
  );
};

export default MainLayout;
