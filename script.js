document.addEventListener("DOMContentLoaded", () => {
  /* ===== Menu Toggle ===== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  /* ===== Scroll to Top ===== */
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== Contact Form ===== */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submitButton');
  const responseDiv = document.getElementById('responseMessage');

  if (form && submitBtn && responseDiv) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData(form);

      try {
        const resp = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        responseDiv.style.display = 'block';
        if (resp.ok) {
          responseDiv.textContent = '✅ Thank you! Message sent.';
          form.reset();
        } else {
          const data = await resp.json();
          responseDiv.textContent = data.error || '⚠️ Something went wrong.';
        }
      } catch {
        responseDiv.style.display = 'block';
        responseDiv.textContent = '❌ Error sending form.';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    });
  }

  /* ===== Testimonial Swiper ===== */
  if (typeof Swiper !== "undefined") {
    new Swiper('.testimonial-swiper', {
      loop: true,
      speed: 800,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      autoplay: { delay: 7000, disableOnInteraction: false }
    });
  }

  /* ===== Project Carousel ===== */
  const projectCarousel = document.querySelector('.project-carousel');
  if (projectCarousel) {
    const track = projectCarousel.querySelector('.carousel-track');
    const prevBtn = projectCarousel.querySelector('.carousel-btn.prev');
    const nextBtn = projectCarousel.querySelector('.carousel-btn.next');
    const cards = Array.from(track.children);
    const cardWidth = cards[0]?.getBoundingClientRect().width + 24 || 0;

    let currentPosition = 0;

    function visibleCards() {
      const containerWidth = projectCarousel.querySelector('.carousel-track-container').offsetWidth;
      return Math.floor(containerWidth / cardWidth);
    }

    if (prevBtn && nextBtn && track && cards.length) {
      prevBtn.addEventListener('click', () => {
        currentPosition += cardWidth;
        if (currentPosition > 0) {
          currentPosition = -(cardWidth * (cards.length - visibleCards()));
        }
        track.style.transform = `translateX(${currentPosition}px)`;
      });

      nextBtn.addEventListener('click', () => {
        currentPosition -= cardWidth;
        if (Math.abs(currentPosition) > cardWidth * (cards.length - visibleCards())) {
          currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
      });

      window.addEventListener('resize', () => {
        currentPosition = 0;
        track.style.transform = `translateX(${currentPosition}px)`;
      });
    }
  }
});

/* ===== Popup Functions ===== */
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = 'flex';
}

function closePopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = 'none';
}

window.onclick = function (event) {
  document.querySelectorAll('.popup').forEach(popup => {
    if (event.target === popup) popup.style.display = 'none';
  });
};
