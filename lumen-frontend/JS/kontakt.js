document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Beispiel-Validierung
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      // Fehlermeldung aufrufen
      notify("error", "UPS! da ist etwas schief gelaufen");
      return;
    } else {
      // Erfolgreiche Validierung
      notify("success", "Nachricht gesendet!");
    }

    // Hier Dein AJAX/Fetch…
    // fetch(...)
    //   .then(() => notify('success', 'Nachricht gesendet!'))
    //   .catch(() => notify('error', 'UPS! da ist etwas schief gelaufen'));
  });
});
