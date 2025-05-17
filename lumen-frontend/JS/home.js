// home.js
import { fetchFilme } from "./api.js";
window.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("home-cards");
  const filme = await fetchFilme();
  filme.slice(0, 8).forEach((f) => {
    const card = document.createElement("div");
    card.className = "film-card";
    card.innerHTML = `
      <img src="img/${f.id}.jpg" alt="${f.filmName}">
      <div class="title">${f.filmName}</div>
      <button onclick="location.href='reservation.html?filmId=${f.id}'">
        Tickets Kaufen
      </button>
    `;
    grid.append(card);
  });
});
