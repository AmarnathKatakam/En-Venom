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
  countryCode: "+91",
  phone: "",
  email: "",
  address: "",
};

const phoneCountryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+61", country: "Australia" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+65", country: "Singapore" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+966", country: "Saudi Arabia" },
];

const bottlePricing = {
  bottle250: { label: "250 ml Bottle", price: "Rs 45" },
  bottle750: { label: "750 ml Bottle", price: "Rs 120" },
  bottle1000: { label: "1 Litre Bottle", price: "Rs 160" },
} as const;

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
    order.bottle250 ? { label: bottlePricing.bottle250.label, qty: order.qty250 } : null,
    order.bottle750 ? { label: bottlePricing.bottle750.label, qty: order.qty750 } : null,
    order.bottle1000 ? { label: bottlePricing.bottle1000.label, qty: order.qty1000 } : null,
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
        phone: `${customer.countryCode}${customer.phone}`,
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

      let lastError = "We couldn't place your order right now. Please try again shortly.";

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
            lastError = responseError
              ? "We couldn't process your order. Please check your details and try again."
              : "We couldn't place your order right now. Please try again shortly.";
            continue;
          }

          setSubmitted(true);
          return;
        } catch (urlError) {
          lastError = "We're having trouble connecting right now. Please try again in a moment.";
        }
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-background p-4 shadow-2xl sm:p-6 md:p-8"
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
          <form className="space-y-4 sm:space-y-5" onSubmit={submitOrder}>
            <input
              className="order-input"
              placeholder="Full Name"
              value={customer.fullName}
              onChange={(e) => setCustomer((prev) => ({ ...prev, fullName: e.target.value }))}
              required
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                className="order-input w-full sm:w-[42%] lg:w-[36%]"
                value={customer.countryCode}
                onChange={(e) => setCustomer((prev) => ({ ...prev, countryCode: e.target.value }))}
                aria-label="Country code"
                required
              >
                {phoneCountryCodes.map((item) => (
                  <option key={`${item.code}-${item.country}`} value={item.code}>
                    {item.country} ({item.code})
                  </option>
                ))}
              </select>

              <input
                className="order-input flex-1"
                placeholder="Contact Number"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    phone: e.target.value.replace(/\D/g, ""),
                  }))
                }
                inputMode="numeric"
                pattern="[0-9]{6,15}"
                title="Enter 6 to 15 digits"
                required
              />
            </div>
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

            <div className="space-y-3.5 sm:space-y-4">

              {/* 250 ML */}
              <PremiumOption
                label={bottlePricing.bottle250.label}
                price={bottlePricing.bottle250.price}
                active={order.bottle250}
                qty={order.qty250}
                onToggle={() => toggleBottle("bottle250")}
                onQty={(v) => setOrder({ ...order, qty250: v })}
              />

              {/* 750 ML */}
              <PremiumOption
                label={bottlePricing.bottle750.label}
                price={bottlePricing.bottle750.price}
                active={order.bottle750}
                qty={order.qty750}
                onToggle={() => toggleBottle("bottle750")}
                onQty={(v) => setOrder({ ...order, qty750: v })}
              />

              {/* 1 Litre */}
              <PremiumOption
                label={bottlePricing.bottle1000.label}
                price={bottlePricing.bottle1000.price}
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
  price: string;
  active: boolean;
  qty: string;
  onToggle: () => void;
  onQty: (v: string) => void;
}

const PremiumOption = ({ label, price, active, qty, onToggle, onQty }: PremiumProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-3 text-left transition-all sm:gap-4 ${
          active ? "text-gold-gradient" : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            active
              ? "border-primary bg-primary shadow-lg shadow-primary/30"
              : "border-border"
          }`}
        >
          {active && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-primary-foreground rounded-sm"
            />
          )}
        </div>

        <span className="text-sm tracking-wide sm:text-base">
          {label} <span className="text-primary/80">({price})</span>
        </span>
      </button>

      {active && (
        <input
          type="number"
          min="1"
          className="order-input w-full sm:w-24"
          placeholder="Qty"
          value={qty}
          onChange={(e) => onQty(e.target.value)}
          required
        />
      )}
    </div>
  );
};
