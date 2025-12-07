import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------- MIDDLEWARES ---------
app.use(cors());
app.use(express.json());

// --------- HEALTH CHECK ---------
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ai-calling-agent-backend",
    timestamp: new Date().toISOString(),
  });
});

// --------- TWILIO WEBHOOK STUBS ---------
app.post("/twilio/voice", (req, res) => {
  console.log("Twilio /twilio/voice webhook hit");
  res.set("Content-Type", "text/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>Thank you for calling. This is a test message.</Say>
    </Response>`);
});

app.post("/twilio/status", (req, res) => {
  console.log("Twilio /twilio/status payload:", req.body);
  res.sendStatus(200);
});

// --------- STRIPE WEBHOOK STUB ---------
app.post("/stripe/webhook", (req, res) => {
  console.log("Stripe /stripe/webhook payload:", req.body);
  res.sendStatus(200);
});

// --------- START SERVER ---------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
