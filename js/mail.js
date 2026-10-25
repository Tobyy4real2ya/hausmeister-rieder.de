// Spamschutz: Die E-Mail-Adresse steht nicht als Ganzes im HTML, damit Adress-Sammelprogramme sie nicht finden.
// Erst im Browser wird sie aus Name und Domain zusammengesetzt. Ohne JavaScript bleibt „info (at) …“ lesbar.
document.querySelectorAll("[data-u][data-d]").forEach(el => {
  const address = `${el.dataset.u}@${el.dataset.d}`;
  const subject = el.dataset.s ? `?subject=${encodeURIComponent(el.dataset.s)}` : "";
  el.setAttribute("href", `mailto:${address}${subject}`);
  if (el.hasAttribute("data-show")) el.textContent = address;
});
