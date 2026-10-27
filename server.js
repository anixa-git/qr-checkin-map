// QR Check-in & Live Map — a beginner-friendly, CONSENT-BASED geolocation project.
//
// How it works:
//  1. You start this server. It prints a QR code + link.
//  2. People scan the QR / open the link and land on a check-in page that
//     clearly asks the browser's permission popup to share their location.
//  3. Only if they tap "Allow" does their pin appear on the live map.
//  4. Nothing is captured silently — if they say no, nothing is recorded.
//
// This is the opposite design of a "silent tracking link": the permission
// prompt is real, visible, and required by the browser itself.

const express = require("express");
const qrcode = require("qrcode");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory "database" of checked-in attendees.
// (Beginner-friendly: swap this for a real DB like SQLite later.)
let attendees = [];

// Attendee submits their location AFTER granting browser permission.
app.post("/api/checkin", (req, res) => {
  const { name, lat, lng } = req.body;

  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "Missing or invalid coordinates." });
  }

  const attendee = {
    id: Date.now().toString(),
    name: (name || "Anonymous").slice(0, 40),
    lat,
    lng,
    checkedInAt: new Date().toISOString(),
  };

  attendees.push(attendee);
  console.log(`[+] Check-in: ${attendee.name} (${lat.toFixed(4)}, ${lng.toFixed(4)})`);

  res.json({ success: true, attendee });
});

// Map page polls this to get the current list of pins.
app.get("/api/attendees", (req, res) => {
  res.json({ attendees });
});

// Simple helper to find your LAN IP so the printed link works on phones
// connected to the same Wi-Fi during local testing.
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}

app.listen(PORT, async () => {
  const ip = getLocalIp();
  const checkinUrl = `http://${ip}:${PORT}/checkin.html`;
  const mapUrl = `http://${ip}:${PORT}/map.html`;

  console.log("========================================");
  console.log(" QR Check-in & Live Map");
  console.log("========================================");
  console.log(`[*] Check-in page: ${checkinUrl}`);
  console.log(`[*] Live map:      ${mapUrl}`);
  console.log("");

  const qr = await qrcode.toString(checkinUrl, { type: "terminal", small: true });
  console.log(qr);
  console.log("[*] Scan the QR above with a phone on the same Wi-Fi to check in.");
  console.log("[*] For a public link instead of LAN-only, run a tunnel, e.g.:");
  console.log("      cloudflared tunnel --url http://localhost:" + PORT);
});
