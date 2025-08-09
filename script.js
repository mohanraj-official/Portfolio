const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });
}



/* scroll to top button */

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});



/*the form submission validation action*/
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submitButton');
const responseDiv = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(form);

  try {
    const resp = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (resp.ok) {
      responseDiv.style.display = 'block';
      responseDiv.textContent = '✅ Thank you! Message sent.';
      form.reset();
    } else {
      const data = await resp.json();
      responseDiv.style.display = 'block';
      responseDiv.textContent = data.error || '⚠️ Something went wrong.';
    }
  } catch (err) {
    responseDiv.style.display = 'block';
    responseDiv.textContent = '❌ Error sending form.';
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Send';
});




function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Close popup when clicking outside the content
window.onclick = function (event) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
}



/* testimonial swipes */
document.addEventListener('DOMContentLoaded', function () {
  // swiper init
  const swiper = new Swiper('.testimonial-swiper', {
    loop: true,
    speed: 800, // Smooth transition speed (in ms)
    effect: 'fade', // Fade instead of slide (optional)
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true, // Allow clicking dots to navigate
    },
    autoplay: {
      delay: 7000, // Slower - 7 seconds per testimonial
      disableOnInteraction: false,
    },
  });
});


// scroll-to-top logic
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// project carousel
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const cards = Array.from(track.children);
const cardWidth = cards[0].getBoundingClientRect().width + 24; // card width + gap (approx)

let currentPosition = 0;

prevBtn.addEventListener('click', () => {
  currentPosition += cardWidth;
  if (currentPosition > 0) currentPosition = -(cardWidth * (cards.length - visibleCards()));
  track.style.transform = `translateX(${currentPosition}px)`;
});

nextBtn.addEventListener('click', () => {
  currentPosition -= cardWidth;
  if (Math.abs(currentPosition) > cardWidth * (cards.length - visibleCards())) {
    currentPosition = 0;
  }
  track.style.transform = `translateX(${currentPosition}px)`;
});

// Calculate visible cards based on container width (responsive)
function visibleCards() {
  const containerWidth = document.querySelector('.carousel-track-container').offsetWidth;
  return Math.floor(containerWidth / cardWidth);
}

// Optional: Adjust carousel on window resize
window.addEventListener('resize', () => {
  currentPosition = 0;
  track.style.transform = `translateX(${currentPosition}px)`;
});


