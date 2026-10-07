// The Skin Edit — site interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const setMenu = (open) => {
  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
};
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Launch list form.
// NOTE: this only shows a thank-you message — sign-ups are not saved yet.
// Connect a form service (e.g. Formspree, Mailchimp) here before launch.
document.getElementById("notifyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = new FormData(e.target).get("name").trim().split(" ")[0];
  document.getElementById("formNote").textContent =
    `Thank you${name ? ", " + name : ""}! You're on the list — we'll be in touch before launch.`;
  e.target.reset();
});
