// Skin Edits — site interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Header background on scroll
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Before / after slider
const compare = document.getElementById("compare");
const compareRange = document.getElementById("compareRange");
compareRange.addEventListener("input", (e) => {
  compare.style.setProperty("--pos", e.target.value + "%");
});

// Portfolio filters
const filterButtons = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".gallery-item");
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    items.forEach((item) =>
      item.classList.toggle("hidden", f !== "all" && item.dataset.category !== f)
    );
  })
);

// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><div class="lightbox-content"></div>';
document.body.appendChild(lightbox);
const lightboxContent = lightbox.querySelector(".lightbox-content");
const closeLightbox = () => lightbox.classList.remove("open");
items.forEach((item) =>
  item.addEventListener("click", () => {
    const media = item.querySelector("img, .ph");
    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(media.cloneNode(true));
    lightbox.classList.add("open");
  })
);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Animated stat counters
const counterObserver = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1500, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  })
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// Contact form — opens the visitor's email app with the message filled in.
// (Swap this for Formspree / Netlify Forms later if you want messages without email apps.)
const CONTACT_EMAIL = "hello@example.com"; // replace with your email
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = `New ${data.get("service")} enquiry from ${data.get("name")}`;
  const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById("formNote").textContent = "Opening your email app… thank you!";
  e.target.reset();
});
