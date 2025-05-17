// reservation.js
import { fetchBelegtePlaetze, postReservation } from "./api.js";
window.addEventListener("DOMContentLoaded", async () => {
  const params = new URL(location.href).searchParams;
  const vorId = params.get("vorstellungId");
  const seats = 8 * 10; // z.B. 8 Reihen × 10 Sitze
  const booked = await fetchBelegtePlaetze(vorId);
  const map = document.getElementById("seat-map");
  for (let i = 1; i <= seats; i++) {
    const code = `R${Math.ceil(i / 10)}S${i % 10 || 10}`;
    const btn = document.createElement("button");
    btn.textContent = code;
    btn.disabled = booked.includes(code);
    btn.className = booked.includes(code) ? "seat booked" : "seat free";
    btn.addEventListener("click", () => btn.classList.toggle("selected"));
    map.append(btn);
  }
  document.getElementById("res-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const selected = [...map.querySelectorAll(".selected")]
      .map((b) => b.textContent)
      .join(",");
    const data = {
      vorstellungId: +vorId,
      filmId: +params.get("filmId"),
      sitzplaetze: selected,
      name: e.target.name.value,
      email: e.target.email.value,
    };
    await postReservation(data);
    alert("Erfolgreich gebucht!");
    location.href = "index.html";
  });
});
