# AnimeUnity Web Player 🎬

A clean and stable Telegram Web App to search and watch anime from **AnimeUnity** directly inside Telegram.

I built this because the pure frontend version kept getting blocked by Cloudflare. This version uses a **Node.js backend proxy**, which makes it much more reliable.

---

## Why This Project?

- Better at avoiding blocks from AnimeUnity
- Smooth video playback inside Telegram
- Nice dark anime-style interface
- Easy to deploy and use
- Completely free and open source

---

## ✨ Features

- Fast anime search
- Beautiful episode grid
- Direct video playback (with native controls + fullscreen)
- Mobile-friendly design
- Backend proxy for stability
- Works as a Telegram Mini App

---

## How to Run Locally

### Step 1: Install Dependencies

npm install

### Step 2: Start the Server

npm start

Open your browser and go to: **http://localhost:3000**

---

## How to Deploy (Free)

**Best platforms (all free tiers available):**

- [Railway.app](https://railway.app) ← Recommended
- [Render.com](https://render.com)
- [Fly.io](https://fly.io)

Just connect your GitHub repo and deploy. It usually takes less than 2 minutes.

After deployment, copy the live URL (e.g. `https://your-app.up.railway.app`).

---

## How to Add to Telegram

1. Open [@BotFather](https://t.me/BotFather)
2. Send `/newapp`
3. Choose your bot
4. Set a nice name for the app
5. Paste your deployed URL
6. Done! Your friends can now use it too.

---

## Project Structure

```
animeunity-webapp/
├── server.js                 # Node.js backend (proxy)
├── package.json
├── public/
│   ├── index.html            # Main page
│   ├── style.css             # Design & layout
│   └── script.js             # Frontend logic
└── README.md
```

---

## How It Works (Simple Version)

1. You search for an anime → Frontend sends request to backend
2. Backend fetches the page from AnimeUnity (with good headers)
3. We parse the HTML to find episodes
4. When you click an episode → we extract the video link
5. Video plays directly in Telegram’s player

The backend proxy is the key part that makes it more stable than the old version.

---

## Limitations (Being Honest)

- This still uses scraping, so if AnimeUnity changes their website layout, it may break temporarily.
- Video quality depends on what AnimeUnity provides.
- Not suitable for commercial use.
- Always respect copyright laws.

---

## Future Ideas

- Quality selector (480p, 720p, etc.)
- "Next Episode" auto button
- Watch history
- Dark/Light theme toggle
- Better error handling

Feel free to add these!

---

## Contributing

If the app stops working or you want to improve it:
- Open an Issue
- Or send a Pull Request

I’d love to see this project get better together.

---

## Disclaimer

This project is **not affiliated** with AnimeUnity in any way.  
It was created purely for personal learning and entertainment.

**Use responsibly ❤️**

---

Made with love for the anime community.

If you have any problems running it, just tell me — I’m happy to help!

---
