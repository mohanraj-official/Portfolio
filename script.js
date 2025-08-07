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
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



/* toggle mode */
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});




/*the for submission validation action */
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



/* project section popup */
<script>
  function openPopup(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closePopup(id) {
    document.getElementById(id).style.display = "none";
  }
</script>
