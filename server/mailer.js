import nodemailer from "nodemailer";

const requiredEnvVars = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "ORDER_RECEIVER_EMAIL"];

export const getMissingEnvVars = () =>
  requiredEnvVars.filter((key) => !process.env[key]);

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const sendOrderEmail = async (body) => {
  const { fullName, phone, email, address, products } = body ?? {};

  if (!fullName || !phone || !email || !address) {
    return {
      status: 400,
      payload: { error: "fullName, phone, email, and address are required." },
    };
  }

  if (!Array.isArray(products) || products.length === 0) {
    return {
      status: 400,
      payload: { error: "At least one product with quantity is required." },
    };
  }

  const productLines = products.map((item) => `- ${item.label}: ${item.qty}`).join("\n");
  const transporter = createTransporter();

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

  return { status: 200, payload: { ok: true } };
};

export const sendContactEmail = async (body) => {
  const { fullName, email, message } = body ?? {};

  if (!fullName || !email || !message) {
    return {
      status: 400,
      payload: { error: "fullName, email, and message are required." },
    };
  }

  const transporter = createTransporter();
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

  return { status: 200, payload: { ok: true } };
};
