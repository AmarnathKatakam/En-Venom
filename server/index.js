import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const requiredEnvVars = [
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
  "ORDER_RECEIVER_EMAIL",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.warn(
    `Missing env vars: ${missingEnvVars.join(", ")}. Email endpoint will fail until they are set.`,
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/orders", async (req, res) => {
  try {
    const { fullName, phone, email, address, products } = req.body ?? {};

    if (!fullName || !phone || !email || !address) {
      return res.status(400).json({
        error: "fullName, phone, email, and address are required.",
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: "At least one product with quantity is required.",
      });
    }

    const productLines = products
      .map((item) => `- ${item.label}: ${item.qty}`)
      .join("\n");

    await transporter.sendMail({
      from: `"enVenom Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.ORDER_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Order - ${fullName}`,
      text: [
        "New order received:",
        "",
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${address}`,
        "",
        "Products:",
        productLines,
      ].join("\n"),
      html: `
        <h2>New order received</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Products:</strong></p>
        <ul>
          ${products
            .map(
              (item) =>
                `<li>${escapeHtml(String(item.label))}: ${escapeHtml(String(item.qty))}</li>`,
            )
            .join("")}
        </ul>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Order email failed:", error);
    return res.status(500).json({ error: "Failed to send order email." });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, message } = req.body ?? {};

    if (!fullName || !email || !message) {
      return res.status(400).json({
        error: "fullName, email, and message are required.",
      });
    }

    await transporter.sendMail({
      from: `"enVenom Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.ORDER_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Message - ${fullName}`,
      text: [
        "New contact message received:",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        "",
        "Message:",
        String(message),
      ].join("\n"),
      html: `
        <h2>New contact message received</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(String(message)).replaceAll("\n", "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({ error: "Failed to send contact email." });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error("Server failed to start:", error);
  }
  process.exit(1);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down HTTP server...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
