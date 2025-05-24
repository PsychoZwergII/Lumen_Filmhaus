// js/reservation-form.js
const API_HOST = "http://localhost:5029";

/**
 * Zeigt eine Notification an und entfernt sie nach timeout ms.
 * @param {'success'|'error'|'info'|'warning'} type
 * @param {string} text
 * @param {number} [timeout=4000]
 */
function showNotification(type, text, timeout = 4000) {
  const container = document.getElementById("notification-container");
  if (!container) return;

  const icons = {
    success: `<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>`,
    error: `<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>`,
    info: `<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>`,
    warning: `<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>`,
  };

  const li = document.createElement("li");
  li.className = `notification-item ${type}`;
  li.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">${icons[type]}</div>
      <div class="notification-text">${text}</div>
    </div>
    <div class="notification-icon notification-close">
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"/>
      </svg>
    </div>
    <div class="notification-progress-bar"></div>
  `.trim();

  // Klick auf Close
  li.querySelector(".notification-close").addEventListener("click", () =>
    container.removeChild(li)
  );

  container.appendChild(li);

  // Automatisch nach timeout entfernen
  setTimeout(() => {
    if (container.contains(li)) container.removeChild(li);
  }, timeout);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const filmId = params.get("filmId");
  const vorId = params.get("vorstellungId");
  const seats = params.get("seats") || "";

  document.getElementById("filmId").value = filmId;
  document.getElementById("vorId").value = vorId;
  document.getElementById("seats").value = seats;
  document.getElementById("seat-list").textContent = seats
    .split(",")
    .join(", ");

  const form = document.getElementById("reservation-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedSeats = seats.split(",").filter((s) => s.trim() !== "");
    if (selectedSeats.length > 8) {
      showNotification(
        "warning",
        "Für Gruppen ab 8 Personen bitten wir um telefonische Kontaktaufnahme.",
        6000
      );
      return; // Abbrechen
    }

    const data = {
      filmId: +filmId,
      vorstellungId: +vorId,
      sitzplaetze: seats,
      name: form.Name.value.trim(),
      email: form.Email.value.trim(),
    };

    // Validierung Name
    const nameRegex = /^[A-ZÄÖÜÉÀÈ][a-zäöüéàè]+(?:\s[A-ZÄÖÜÉÀÈ][a-zäöüéàè]+)+$/;
    if (!nameRegex.test(data.name)) {
      showNotification(
        "error",
        "Bitte gib deinen vollständigen Namen im Format 'Vorname Nachname' ein.",
        5000
      );
      return;
    }

    // Validierung E-Mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification(
        "error",
        "Bitte gib eine gültige E-Mail-Adresse ein.",
        5000
      );
      return;
    }

    try {
      const res = await fetch(`${API_HOST}/api/Reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Konflikt");

      showNotification("success", "Deine Plätze wurden reserviert!");
      setTimeout(() => {
        window.location.href = "../HTML/erfolg.html";
      }, 1000);
    } catch (err) {
      showNotification(
        "error",
        "Ein oder mehrere Plätze sind bereits belegt.",
        6000
      );
    }
  });
});
