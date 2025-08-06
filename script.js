// Toggle mobile nav
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close nav on mobile
      nav.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });
}
