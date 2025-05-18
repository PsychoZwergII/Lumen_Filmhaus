// js/reservation-form.js
const API_HOST = "http://localhost:5029";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // 1) Film-ID aus Query ziehen!
  const filmId = params.get("filmId");
  const vorId = params.get("vorstellungId");
  const seats = params.get("seats") || "";

  // 2) Hidden-Inputs und Anzeige befüllen
  document.getElementById("filmId").value = filmId;
  document.getElementById("vorId").value = vorId;
  document.getElementById("seats").value = seats;
  document.getElementById("seat-list").textContent = seats
    .split(",")
    .join(", ");

  const form = document.getElementById("reservation-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 3) filmId kommt jetzt korrekt aus hidden field
    const data = {
      filmId: +filmId,
      vorstellungId: +vorId,
      sitzplaetze: seats,
      name: form.Name.value.trim(),
      email: form.Email.value.trim(),
    };

    try {
      const res = await fetch(`${API_HOST}/api/Reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Konflikt");
      alert("Deine Plätze wurden reserviert!");
      location.href = "../index.html";
    } catch (err) {
      alert("Ein oder mehrere Plätze sind bereits belegt.");
      history.back();
    }
  });
});
