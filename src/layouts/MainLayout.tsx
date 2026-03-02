import { useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

type OrderHandler = (product?: string) => void;
type LayoutChildren = ReactNode | ((onOrder: OrderHandler) => ReactNode);

interface Props {
  children: LayoutChildren;
}

const MainLayout = ({ children }: Props) => {
  const location = useLocation();
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openOrder: OrderHandler = (product?: string) => {
    setSelectedProduct(product || "");
    setOrderOpen(true);
  };

  const content =
    typeof children === "function" ? children(openOrder) : children;

  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main className={isHome ? "" : "pt-16 sm:pt-20 md:pt-24 xl:pt-28 2xl:pt-32"}>
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
