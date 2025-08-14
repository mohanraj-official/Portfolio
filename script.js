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



// testimonial new design 
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.testimonial-swiper', {
    loop: true,
    speed: 800,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
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
const projectSwiper = new Swiper('.project-swiper', {
  slidesPerView: 3, // default (desktop)
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {       // mobile
      slidesPerView: 1
    },
    768: {     // tablets
      slidesPerView: 2
    },
    1024: {    // desktops
      slidesPerView: 3
    }
  }
});



// Updated friends data
const sampleFriends = [
  { 
    name: "Alice Johnson", 
    company: "Google", 
    role: "Software Engineer", 
    message: "Loved working on our last project!", 
    photo: "images/alice.jpg", 
    link: "#" 
  },
  { 
    name: "Bob Smith", 
    company: "Amazon", 
    role: "Data Analyst", 
    message: "Can’t wait for the next hackathon!", 
    photo: "images/bob.jpg", 
    link: "#" 
  },
  { 
    name: "Charlie Brown", 
    company: "Microsoft", 
    role: "UI/UX Designer", 
    message: "Here’s my latest design update.", 
    photo: "images/charlie.jpg", 
    link: "#" 
  }
];

function renderFriends(friends) {
  const container = document.getElementById("friends-container");
  container.innerHTML = "";
  
  friends.forEach(friend => {
    const card = document.createElement("div");
    card.classList.add("friend-card");
    card.innerHTML = `
      <img src="${friend.photo}" alt="${friend.name}">
      <h3>${friend.name}</h3>
      <div class="company">${friend.company}</div>
      <div class="role">${friend.role}</div>
      <p>${friend.message}</p>
      <a href="${friend.link}" target="_blank">View More</a>
    `;
    container.appendChild(card);
  });
}

renderFriends(sampleFriends);
