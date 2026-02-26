import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  product?: string;
  onClose: () => void;
}

const emptyOrder = {
  bottle250: false,
  bottle750: false,
  bottle1000: false,
  qty250: "",
  qty750: "",
  qty1000: "",
};

const emptyCustomer = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
};

const OrderModal = ({ open, product, onClose }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(emptyOrder);
  const [customer, setCustomer] = useState(emptyCustomer);

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
      setOrder(emptyOrder);
      setCustomer(emptyCustomer);
      return;
    }

    if (!product) return;

    setOrder((prev) => ({
      ...prev,
      bottle250: /250/i.test(product),
      bottle750: /750/i.test(product),
      bottle1000: /(1\s*litre|1000|1l)/i.test(product),
    }));
  }, [open, product]);

  if (!open) return null;

  const toggleBottle = (key: keyof typeof order) => {
    setOrder((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectedProducts = [
    order.bottle250 ? { label: "250 ml Bottle", qty: order.qty250 } : null,
    order.bottle750 ? { label: "750 ml Bottle", qty: order.qty750 } : null,
    order.bottle1000 ? { label: "1 Litre Bottle", qty: order.qty1000 } : null,
  ].filter(Boolean) as Array<{ label: string; qty: string }>;

  const submitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      setError("Select at least one bottle size.");
      return;
    }

    if (selectedProducts.some((item) => Number(item.qty) <= 0)) {
      setError("Enter valid quantity for all selected bottle sizes.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = JSON.stringify({
        ...customer,
        products: selectedProducts.map((item) => ({
          label: item.label,
          qty: Number(item.qty),
        })),
      });

      const envApiUrl = import.meta.env.VITE_ORDER_API_URL?.trim();
      const candidateUrls = [envApiUrl, "/api/orders", "http://localhost:3001/api/orders"].filter(
        Boolean,
      ) as string[];
      const urls = [...new Set(candidateUrls)];

      let lastError = "Order submission failed";

      for (const url of urls) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          });

          if (!response.ok) {
            const responseText = await response.text();
            let responseError = "";
            try {
              const parsed = JSON.parse(responseText);
              responseError = parsed.error ?? "";
            } catch {
              responseError = responseText;
            }
            lastError = responseError || `Order submission failed (${response.status})`;
            continue;
          }

          setSubmitted(true);
          return;
        } catch (urlError) {
          lastError = urlError instanceof Error ? urlError.message : "Network error";
        }
      }

      if (/failed to fetch|networkerror|network error/i.test(lastError)) {
        setError("Order server not reachable. Run npm run dev:full and try again.");
        return;
      }

      setError(lastError);
    } catch (submitError) {
      console.error(submitError);
      setError("Unable to submit order right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-background w-full max-w-lg max-h-[92svh] overflow-y-auto rounded-2xl border border-border p-5 sm:p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl tracking-wide sm:tracking-wider text-gold-gradient">
            Premium Order Request
          </h2>
          <button onClick={onClose} aria-label="Close order form">X</button>
        </div>

        {submitted ? (
          /* THANK YOU */
          <div className="text-center py-10">
            <h3 className="mb-4 text-xl sm:text-2xl font-semibold text-gold-gradient">
              Order Successfully Received
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              Thank you for choosing <span className="font-semibold">en Venom by BlackRoth</span>.
              Your premium order has been received and our concierge team will contact you shortly
              to confirm delivery.
            </p>

            <button
              onClick={onClose}
              className="mt-8 w-full sm:w-auto bg-gold-gradient px-6 sm:px-8 py-3 text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-primary-foreground hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          /* FORM */
          <form className="space-y-4" onSubmit={submitOrder}>
            <input
              className="order-input"
              placeholder="Full Name"
              value={customer.fullName}
              onChange={(e) => setCustomer((prev) => ({ ...prev, fullName: e.target.value }))}
              required
            />
            <input
              className="order-input"
              placeholder="Contact Number"
              value={customer.phone}
              onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
            <input
              className="order-input"
              type="email"
              placeholder="Email Address"
              value={customer.email}
              onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
              required
            />

            <textarea
              className="order-input resize-none h-24"
              placeholder="Delivery Address"
              value={customer.address}
              onChange={(e) => setCustomer((prev) => ({ ...prev, address: e.target.value }))}
              required
            />

            {/* PREMIUM MULTI SELECT */}

            <div className="space-y-4">

              {/* 250 ML */}
              <PremiumOption
                label="250 ml Bottle"
                active={order.bottle250}
                qty={order.qty250}
                onToggle={() => toggleBottle("bottle250")}
                onQty={(v) => setOrder({ ...order, qty250: v })}
              />

              {/* 750 ML */}
              <PremiumOption
                label="750 ml Bottle"
                active={order.bottle750}
                qty={order.qty750}
                onToggle={() => toggleBottle("bottle750")}
                onQty={(v) => setOrder({ ...order, qty750: v })}
              />

              {/* 1 Litre */}
              <PremiumOption
                label="1 Litre Bottle"
                active={order.bottle1000}
                qty={order.qty1000}
                onToggle={() => toggleBottle("bottle1000")}
                onQty={(v) => setOrder({ ...order, qty1000: v })}
              />

            </div>

            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            <button
              disabled={submitting}
              className="w-full bg-gold-gradient py-3 text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Premium Order"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default OrderModal;



interface PremiumProps {
  label: string;
  active: boolean;
  qty: string;
  onToggle: () => void;
  onQty: (v: string) => void;
}

const PremiumOption = ({ label, active, qty, onToggle, onQty }: PremiumProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-3 sm:gap-4 text-left transition-all ${
          active ? "text-gold-gradient" : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            active
              ? "border-yellow-400 bg-yellow-400 shadow-lg shadow-yellow-400/30"
              : "border-border"
          }`}
        >
          {active && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-black rounded-sm"
            />
          )}
        </div>

        <span className="text-sm sm:text-base tracking-wide">{label}</span>
      </button>

      {active && (
        <input
          type="number"
          min="1"
          className="order-input w-20 sm:w-24"
          placeholder="Qty"
          value={qty}
          onChange={(e) => onQty(e.target.value)}
          required
        />
      )}
    </div>
  );
};
