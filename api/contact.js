import { getMissingEnvVars, sendContactEmail } from "../server/mailer.js";

const withCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

export default async function handler(req, res) {
  withCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    console.warn(`Missing env vars: ${missingEnvVars.join(", ")}`);
  }

  try {
    const result = await sendContactEmail(req.body);
    return res.status(result.status).json(result.payload);
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({ error: "Failed to send contact email." });
  }
}
