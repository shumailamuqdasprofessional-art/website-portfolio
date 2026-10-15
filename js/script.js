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
