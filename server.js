const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const BASE_URL = "https://www.animeunity.so";

app.get('/api/fetch', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "url parameter is required" });

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': BASE_URL
      },
      timeout: 20000
    });

    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch from AnimeUnity",
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AnimeUnity Web App running at http://localhost:${PORT}`);
});
