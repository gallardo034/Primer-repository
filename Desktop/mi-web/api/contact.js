const RESEND_API_URL = "https://api.resend.com/emails";

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function sanitize(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1200);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Metodo no permitido." });
  }

  let body = {};

  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return json(res, 400, { error: "JSON invalido." });
  }

  if (body.company) {
    return json(res, 200, { ok: true });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const projectType = sanitize(body.projectType);
  const message = sanitize(body.message);

  if (!name || !email || !message) {
    return json(res, 400, { error: "Faltan campos obligatorios." });
  }

  if (!isValidEmail(email)) {
    return json(res, 400, { error: "Email invalido." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return json(res, 503, { error: "Faltan variables de entorno para enviar emails." });
  }

  const subject = `Nueva consulta web: ${name}`;
  const text = [
    "Nueva consulta desde la web de Sebastian Weisz Arquitectura",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Telefono: ${phone || "No informado"}`,
    `Tipo de proyecto: ${projectType || "No informado"}`,
    "",
    "Mensaje:",
    message
  ].join("\n");

  const emailPayload = {
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    reply_to: email,
    subject,
    text
  };

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    return json(res, 502, { error: "El proveedor de email rechazo el envio." });
  }

  return json(res, 200, { ok: true });
}
