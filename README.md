# 🐙 Kraken

Kraken is a web application that reveals how much personal and behavioral data can be gathered from users — **just by visiting a website**. It’s designed to raise awareness about privacy, data tracking, fingerprinting, and behavioral analytics.

---

## 🚀 Features

- 🔍 **Advanced Fingerprinting** (via FingerprintJS Pro)
- 🌍 **Geolocation Tracking**
- 🖱 **Real-Time Behavior Analytics** (clicks, scrolls, movement)
- 🔥 **Dynamic Heatmap Renderer**
- 📈 **Live Charts & Visit History**
- 🗺 **Geolocation Map**
- 🌗 **Dark Mode Toggle** with full theme integration
- 🧠 **No database required** – all tracking data is stored client-side (cookies/localStorage)

---

## 📦 Tech Stack

### Frontend
- Vanilla JavaScript
- Bootstrap 5.3+
- Leaflet (for mapping)
- Chart.js (for visual analytics)
- heatmap.js (for activity heatmaps)

### Backend
- Node.js + Express
- FingerprintJS Pro API (for accurate and enriched device identification)
- `axios` (for HTTP requests)

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/tudeldu/kraken.git
cd kraken
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your Environment Variables

Create a `.env` file in the root:

```
FPJS_SECRET_KEY=your_fingerprintjs_secret_api_key
```

You’ll also need your public API key in the frontend (`index.html`):

```html
<script src="https://fpcdn.io/v3/YOUR_PUBLIC_KEY" async></script>
```

### 4. Run the App

```bash
npm start
```

Visit:  
http://localhost:3000

