// The Skin Edit — site behaviour (kept small on purpose)

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Start the hero entrance once the page is ready
requestAnimationFrame(() => document.body.classList.add("loaded"));

// Add a hairline under the header once the page scrolls
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  const setOpen = (open) => {
    mobileMenu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setOpen(!mobileMenu.classList.contains("open")));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

// Cards tilt gently toward the mouse (desktop only)
if (window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  document.querySelectorAll(".brand, .concern").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
}

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
  const dots = [...slider.querySelectorAll(".cp-dots button")];
  let index = 0, timer;
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: track.clientWidth * index });
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
