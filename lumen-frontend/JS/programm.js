const btn = document.getElementById("to-top");

// Button nur ab 200px Scroll einblenden
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

// On-click scrollen wir sanft nach oben
btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
