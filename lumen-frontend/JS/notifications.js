// sofort ausführen, Container erstellen
(function () {
  const container = document.getElementById("notification-container");

  // Globale Funktion zum Aufrufen
  window.notify = function (type, text, duration = 5000) {
    // li erzeugen
    const li = document.createElement("li");
    li.className = `notification-item ${type}`;

    // Inhalt einfügen (die SVGs wurden gekürzt auf die Pfade, Du kannst sie ersetzen)
    li.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          ${getIconSvg(type)}
        </div>
        <div class="notification-text">${text}</div>
      </div>
      <div class="notification-icon notification-close">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
      </div>
      <div class="notification-progress-bar"></div>
    `;

    // close-Button
    li.querySelector(".notification-close").addEventListener("click", () => {
      container.removeChild(li);
    });

    // Element anhängen
    container.appendChild(li);

    // nach duration wieder entfernen
    setTimeout(() => {
      if (container.contains(li)) container.removeChild(li);
    }, duration);
  };

  // Icon-SVGs nach type
  function getIconSvg(type) {
    const icons = {
      success:
        '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M8.5 11.5L11 14l4-4m6 2a9 9 0 1 1-18 0"/></svg>',
      info: '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 11h2v5m-2 0h4M21 12a9 9 0 1 1-18 0"/></svg>',
      warning:
        '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0"/></svg>',
      error:
        '<svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M15 9l-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0"/></svg>',
      default: "",
    };
    return icons[type] || icons.default;
  }
})();
