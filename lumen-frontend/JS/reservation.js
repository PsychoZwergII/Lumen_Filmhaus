const API_HOST = "http://localhost:5029";
// js/reservation.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("seat-grid");
  const next = document.getElementById("next-btn");

  // 1) Query-Parameter auslesen
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("filmId"); // jetzt korrekt befüllt
  const vorId = params.get("vorstellungId");
  console.log("Lade Sitzplan für Vorstellung:", vorId);

  // 2) bereits gebuchte Plätze laden
  fetch(`http://localhost:5029/api/Reservation/belegte/${vorId}`)
    .then((res) => res.json())
    .then((booked) => renderSeats(booked))
    .catch((err) => console.error("Fetch-Error:", err));

  let selected = [];

  // 3) Sitzraster zeichnen
  function renderSeats(booked) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const cols = 12;
    grid.innerHTML = "";

    rows.forEach((row) => {
      for (let i = 1; i <= cols; i++) {
        const code = `${row}${i}`;
        const btn = document.createElement("button");
        btn.textContent = code;
        btn.className = "seat";
        btn.disabled = booked.includes(code);
        if (btn.disabled) btn.classList.add("booked");

        btn.addEventListener("click", () => {
          btn.classList.toggle("selected");
          const idx = selected.indexOf(code);
          if (idx === -1) selected.push(code);
          else selected.splice(idx, 1);
          next.disabled = selected.length === 0;
        });

        grid.appendChild(btn);
      }
    });
  }

  // 4) Auf Klick weiter zur Formularseite
  next.addEventListener("click", () => {
    const seatsParam = encodeURIComponent(selected.join(","));
    window.location.href = `reservation-form.html?filmId=${filmId}&vorstellungId=${vorId}&seats=${seatsParam}`;
  });
});
