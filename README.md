# 📍 QR Check-in & Live Map

A beginner-friendly Node.js project: generate a QR code, let people scan it
and **explicitly share their location** (real browser permission prompt),
and watch them appear as pins on a live map in real time.

Great for events, meetups, campus check-ins, treasure hunts, or just as a
portfolio project to learn geolocation, Express, and QR codes.

## ✅ Why this is safe to build and show off

Unlike tools that silently capture a visitor's location through a disguised
link, this project:

- Shows a clear check-in page explaining exactly what will happen
- Relies on the browser's **native permission popup** — nothing is sent
  unless the person taps "Allow"
- Lets the person decline at any time with no data recorded
- Stores data only in memory (cleared when the server restarts) — swap in
  a real database if you want persistence

## 🧰 Tech stack

- **Node.js + Express** — tiny web server
- **`qrcode` npm package** — prints a QR code straight in your terminal
- **Browser Geolocation API** (`navigator.geolocation`) — the consent-based
  location request
- **Leaflet.js + OpenStreetMap** — free, no-API-key live map

## 📂 Project structure

```
qr-checkin-map/
├── server.js           # Express server, API routes, QR generation
├── package.json
└── public/
    ├── index.html       # landing page with links
    ├── checkin.html      # the check-in form (asks for permission)
    └── map.html          # live map of checked-in attendees
```

## 🚀 Getting started

1. **Install Node.js** (v18+) if you don't have it: https://nodejs.org

2. **Install dependencies**
   ```bash
   cd qr-checkin-map
   npm install
   ```

3. **Run the server**
   ```bash
   npm start
   ```
   You'll see a QR code printed right in your terminal, plus two links:
   - a check-in link (for attendees)
   - a map link (for you / the event screen)

4. **Test it on your phone**
   - Make sure your phone is on the same Wi-Fi as your computer
   - Scan the QR code, or open the check-in link
   - Tap "Share Location & Check In" and allow the permission prompt
   - Open the map link on your laptop and watch the pin appear

## 🌍 Making it work outside your Wi-Fi (optional)

For a real event where attendees aren't on your network, expose your local
server with a tunnel, same idea as `ngrok`:

```bash
# Example using Cloudflare's free tunnel
cloudflared tunnel --url http://localhost:8080
```

Then share the printed `https://...trycloudflare.com/checkin.html` link
(or put it in your own QR code) instead of the local IP.

## 🛠️ Ideas to extend it

- Save attendees to SQLite or a JSON file so data survives a restart
- Add a "clear all check-ins" button for reusing it at the next event
- Show attendee count as a live chart
- Add a name + photo upload for a fun event wall
- Rate-limit `/api/checkin` to avoid spam submissions

## ⚠️ A note on ethics

Geolocation is powerful — always be upfront with people about why you're
asking for their location, and never try to capture it without a visible,
real permission prompt. This project is designed so that's impossible to
skip.

## License

MIT — do whatever you like with it, just keep location collection consensual.
# qr-checkin-map

