// Skin concern cards that open a product panel (e.g. Brightening)
document.querySelectorAll(".concern[data-panel]").forEach((card) => {
  const panel = document.getElementById(card.dataset.panel);
  if (!panel) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    card.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("open")));
      setTimeout(() => panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), reduce ? 0 : 220);
    } else {
      panel.classList.remove("open");
      setTimeout(() => { if (!panel.classList.contains("open")) panel.hidden = true; }, reduce ? 0 : 560);
    }
  };
  const toggle = () => setOpen(!card.classList.contains("is-open"));
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
  panel.querySelector(".cp-close")?.addEventListener("click", () => { setOpen(false); card.focus({ preventScroll: true }); card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && card.classList.contains("is-open")) setOpen(false); });
  if (location.hash === "#" + card.dataset.panel) setOpen(true);
});

// Photo slideshow inside product panels
document.querySelectorAll(".cp-slider").forEach((slider) => {
  const track = slider.querySelector(".cp-track");
  const slides = [...track.children];
  const dots = [...(slider.parentElement.querySelectorAll(".cp-dots button"))];
  let index = 0, timer;
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: track.clientWidth * index });
    mark();
  };
  const mark = () => dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
  track.addEventListener("scroll", () => { index = Math.round(track.scrollLeft / track.clientWidth); mark(); }, { passive: true });
  slider.querySelector(".prev").addEventListener("click", (e) => { e.stopPropagation(); go(index - 1); restart(); });
  slider.querySelector(".next").addEventListener("click", (e) => { e.stopPropagation(); go(index + 1); restart(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { go(i); restart(); }));
  const auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const restart = () => { clearInterval(timer); if (auto) timer = setInterval(() => { if (slider.offsetParent) go(index + 1); }, 4000); };
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restart);
  mark(); restart();
});
