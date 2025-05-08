fetch("http://localhost:5000/api/filme")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("filmliste");
    data.forEach((film) => {
      container.innerHTML += `<p>${film.titel} – ${film.dauer} min</p>`;
    });
  });
