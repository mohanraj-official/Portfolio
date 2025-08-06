// Toggle mobile menu
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Smooth scroll to sections
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").replace("#", "");
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    // Close nav on mobile
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});
