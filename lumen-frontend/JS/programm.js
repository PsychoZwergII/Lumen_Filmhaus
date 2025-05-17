// programm.js
import { fetchVorstellungen } from "./api.js";
window.addEventListener("DOMContentLoaded", async () => {
  const url = new URL(location.href);
  const filmId = url.searchParams.get("filmId");
  const grid = document.getElementById("programm-grid");
  // wenn kein filmId, lade alle Vorstellungen, sonst nur für einen Film
  const data = filmId
    ? await fetchVorstellungen(filmId)
    : (await fetchFilme()).flatMap((f) => fetchVorstellungen(f.id));
  data.forEach((v) => {
    const d = new Date(v.datumUhrzeit);
    const tile = document.createElement("div");
    tile.className = "date-card";
    tile.innerHTML = `
      <div class="day">${d.toLocaleDateString("de-DE", {
        weekday: "short",
      })}</div>
      <div class="date">${d.toLocaleDateString()}</div>
    `;
    grid.append(tile);
  });
});
