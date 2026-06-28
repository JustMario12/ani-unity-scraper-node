async function fetchPage(url) {
  try {
    const res = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error("Server returned error");
    return await res.text();
  } catch (e) {
    throw new Error("Connection error. Is the server running?");
  }
}

async function searchAnime() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return alert("Inserisci il nome dell'anime");

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "<p>🔍 Cercando...</p>";

  try {
    const html = await fetchPage(`https://www.animeunity.so/archivio?search=${encodeURIComponent(query)}`);
    const doc = new DOMParser().parseFromString(html, 'text/html');

    let items = [];
    doc.querySelectorAll('a[href*="/anime/"]').forEach(a => {
      const title = a.textContent.trim();
      if (title) items.push({ title, url: a.href });
    });

    let htmlContent = '<div class="grid">';
    items.slice(0, 15).forEach(item => {
      htmlContent += `<div class="card" onclick="loadEpisodes('${item.url}', '${item.title.replace(/'/g, "\\'")}')">${item.title}</div>`;
    });
    htmlContent += '</div>';
    resultsDiv.innerHTML = htmlContent;

  } catch (e) {
    resultsDiv.innerHTML = `<p>❌ ${e.message}</p>`;
  }
}

async function loadEpisodes(animeUrl, title) {
  document.getElementById('results').style.display = 'none';
  const epDiv = document.getElementById('episodes');
  epDiv.innerHTML = "<p>📺 Caricamento episodi...</p>";

  try {
    const html = await fetchPage(animeUrl);
    const doc = new DOMParser().parseFromString(html, 'text/html');

    let episodes = [];
    doc.querySelectorAll('a[href*="/watch/"]').forEach(a => {
      episodes.push({
        title: a.textContent.trim() || "Episodio",
        url: a.href
      });
    });

    let htmlContent = `<h2>${title}</h2><div class="grid">`;
    episodes.forEach(ep => {
      htmlContent += `<div class="card" onclick="playEpisode('${ep.url}', '${ep.title.replace(/'/g, "\\'")}')">${ep.title}</div>`;
    });
    htmlContent += '</div>';
    epDiv.innerHTML = htmlContent;

  } catch (e) {
    epDiv.innerHTML = `<p>❌ ${e.message}</p>`;
  }
}

async function playEpisode(epUrl, title) {
  document.getElementById('episodes').style.display = 'none';
  const container = document.getElementById('playerContainer');
  document.getElementById('currentTitle').textContent = title;
  container.style.display = 'block';

  const playerDiv = document.getElementById('videoPlayer');
  playerDiv.innerHTML = "<p>🔄 Caricamento video...</p>";

  try {
    const html = await fetchPage(epUrl);
    let videoUrl = html.match(/(https?:\/\/[^\s"']+\.mp4[^\s"']*)/i)?.[0] ||
                   html.match(/(https?:\/\/[^\s"']+\.m3u8[^\s"']*)/i)?.[0];

    if (videoUrl) {
      playerDiv.innerHTML = `
        <video controls autoplay style="width:100%; max-height:75vh; background:black;">
          <source src="${videoUrl}" type="video/mp4">
        </video>`;
    } else {
      playerDiv.innerHTML = `<p>❌ Video link not found.</p>`;
    }
  } catch (e) {
    playerDiv.innerHTML = `<p>❌ ${e.message}</p>`;
  }
}
