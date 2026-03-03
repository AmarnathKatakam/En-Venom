import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMissingEnvVars, sendContactEmail, sendOrderEmail } from "./mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envCandidates = [
  path.resolve(__dirname, "../backend/.env"),
  path.resolve(__dirname, "../.env"),
];

const envPath = envCandidates.find((candidate) => fs.existsSync(candidate));
dotenv.config(envPath ? { path: envPath } : undefined);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const missingEnvVars = getMissingEnvVars();
if (missingEnvVars.length > 0) {
  console.warn(
    `Missing env vars: ${missingEnvVars.join(", ")}. Email endpoint will fail until they are set.`,
  );
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/orders", async (req, res) => {
  try {
    const result = await sendOrderEmail(req.body);
    return res.status(result.status).json(result.payload);
  } catch (error) {
    console.error("Order email failed:", error);
    return res.status(500).json({ error: "Failed to send order email." });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const result = await sendContactEmail(req.body);
    return res.status(result.status).json(result.payload);
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
