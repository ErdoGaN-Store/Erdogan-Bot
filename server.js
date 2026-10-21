require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json({ limit: "1mb" }));

const PORT = Number(process.env.PORT || 3000);
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  // Acknowledge quickly so Meta doesn't repeatedly retry the webhook.
  res.sendStatus(200);

  try {
    const body = req.body;
    if (body.object !== "whatsapp_business_account") return;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        for (const message of value.messages || []) {
          const isContactShare =
            message.type === "contacts" ||
            (Array.isArray(message.contacts) && message.contacts.length > 0);

          if (isContactShare) {
            console.log(JSON.stringify({
              event: "CONTACT_SHARE_DETECTED",
              messageId: message.id || null,
              from: message.from || null,
              timestamp: message.timestamp || null,
              note: "Detected a shared contact. This webhook does not delete it."
            }));
          }
        }
      }
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }
});

app.get("/", (_req, res) => {
  res.type("text").send("ERDOGAN BOT webhook is running.");
});

app.listen(PORT, () => {
  console.log(`ERDOGAN BOT listening on port ${PORT}`);
});
