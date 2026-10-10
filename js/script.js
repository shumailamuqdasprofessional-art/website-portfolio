// The Skin Edit — animations

document.getElementById("year").textContent = new Date().getFullYear();

// Start hero entrance animations once the page has loaded
requestAnimationFrame(() => document.body.classList.add("loaded"));

// Shrink header on scroll
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal elements as they scroll into view, staggered within each group
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      const delay = siblings.indexOf(el) * 0.12;
      el.style.transitionDelay = `${delay}s`;
      el.classList.add("visible");
      // clear the stagger so hover effects respond instantly afterwards
      setTimeout(() => (el.style.transitionDelay = ""), (delay + 1) * 1000);
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Draw the journey line when it comes into view
const route = document.querySelector(".route");
if (route) {
  new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        route.classList.add("drawn");
        obs.disconnect();
      }
    },
    { threshold: 0.3 }
  ).observe(route);
}

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Subtle tilt on range cards following the mouse (desktop only)
if (window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  document.querySelectorAll(".range-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
}
