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



// Friend'f corner
const sampleFriends = [
  {
    name: "Rajan",
    company: "digtinctive",
    role: '"Data Analyst"',
    message: "Watch 'Dark' Series",
    photo: "./assets/avatar/a1.jpg",
    link: "https://github.com/rajannnnnnn"
  },
  {
    name: "Rajkumar",
    company: "everestims",
    role: "Automation Engineer",
    message: '"Be Motivated"',
    photo: "./assets/avatar/a2.jpg",
    link: "https://github.com/RajkumarKOfficial"
  },
  {
    name: "Abishake",
    company: "gadaget computer",
    role: "QA Engineer",
    message: '"Explore untill You Die"',
    photo: "./assets/avatar/a3.jpg",
    link: "https://www.linkedin.com/in/abishake2003/"
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


// Project explorer: the GitHub profile README table is the single source of truth.
(function () {
  const owner = 'mohanraj-official';
  const readmeUrl = 'https://raw.githubusercontent.com/' + owner + '/' + owner + '/main/README.md';
  const grid = document.getElementById('overview-project-grid');
  const categories = document.getElementById('overview-category-list');
  const results = document.getElementById('overview-results');
  const search = document.getElementById('overview-search-input');
  const clear = document.getElementById('overview-search-clear');
  const empty = document.getElementById('overview-no-results');
  const error = document.getElementById('overview-sync-error');
  if (!grid || !categories || !results) return;

  let selected = 'All';
  let projects = [];

  function parseTable(markdown) {
    const lines = markdown.split(/\r?\n/);
    const headerIndex = lines.findIndex(line =>
      /^\s*\|/.test(line) && /\bAI Assistant\b/i.test(line) &&
      /\bData Analysis\b/i.test(line) && /\bPipeline\b/i.test(line)
    );
    if (headerIndex < 0) throw new Error('Project table not found');
    const cells = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
    const headers = cells(lines[headerIndex]).map(name => name.replace(/\s*\(ML\)\s*$/i, '').trim());
    const separator = lines[headerIndex + 1] || '';
    if (!/^\s*\|[\s:|-]+\|\s*$/.test(separator)) throw new Error('Invalid table header');

    const items = [];
    const seen = new Set();
    for (let i = headerIndex + 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) {
      const row = cells(lines[i]);
      headers.forEach((category, column) => {
        const cell = row[column] || '';
        const links = /\[([^\]]+)\]\((https:\/\/github\.com\/[^)\s]+)\)/g;
        let match, foundLink = false;
        while ((match = links.exec(cell))) {
          const title = match[1].trim();
          const url = match[2];
          let parsed;
          try { parsed = new URL(url); } catch (_) { continue; }
          const segments = parsed.pathname.split('/').filter(Boolean);
          if (parsed.hostname !== 'github.com' || segments.length !== 2 ||
              segments[0].toLowerCase() !== owner || !title || seen.has(url.toLowerCase())) continue;
          seen.add(url.toLowerCase());
          items.push({ title, category, url });
          foundLink = true;
        }
        // Plain text in the table is shown as a planned project without a broken link.
        if (!foundLink && cell && !/[<>\[\]]/.test(cell)) {
          items.push({ title: cell.replace(/\*\*/g, ''), category, url: '' });
        }
      });
    }
    if (!items.length) throw new Error('No projects in table');
    return { headers, items };
  }

  function addCard(project) {
    const card = document.createElement('article');
    card.className = 'overview-project-card';
    card.dataset.projectCategory = project.category;
    card.title = project.title + ' · ' + project.category;
    const tag = document.createElement('span');
    tag.className = 'overview-tag';
    tag.textContent = project.category.toUpperCase();
    const heading = document.createElement('h3');
    heading.textContent = project.title;
    card.append(tag, heading);
    if (project.url) {
      const link = document.createElement('a');
      link.href = project.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Open ' + project.title + ' on GitHub');
      link.textContent = 'GitHub ↗';
      card.append(link);
    } else {
      card.classList.add('overview-planned-card');
      const status = document.createElement('span');
      status.className = 'overview-coming-soon';
      status.textContent = 'Coming soon';
      card.append(status);
    }
    grid.append(card);
  }

  function update() {
    const query = (search?.value || '').trim().toLowerCase();
    let count = 0;
    [...grid.children].forEach(card => {
      const matched = (selected === 'All' || card.dataset.projectCategory === selected) &&
        (!query || (card.textContent + ' ' + card.title).toLowerCase().includes(query));
      card.hidden = !matched;
      if (matched) count++;
    });
    results.textContent = count + ' project' + (count === 1 ? '' : 's');
    if (empty) empty.hidden = count > 0;
    if (clear) clear.hidden = !query;
  }

  function selectCategory(category) {
    selected = category;
    categories.querySelectorAll('button').forEach(button => {
      const active = button.dataset.overviewCategory === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    update();
  }

  categories.addEventListener('click', event => {
    const button = event.target.closest('[data-overview-category]');
    if (button) selectCategory(button.dataset.overviewCategory);
  });
  search?.addEventListener('input', update);
  clear?.addEventListener('click', () => {
    search.value = '';
    search.focus();
    update();
  });

  fetch(readmeUrl, { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('GitHub returned ' + response.status);
      return response.text();
    })
    .then(markdown => {
      const data = parseTable(markdown);
      projects = data.items;
      categories.replaceChildren();
      ['All', ...data.headers].forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'overview-category';
        button.dataset.overviewCategory = category;
        button.textContent = category === 'All' ? 'All Projects' : category;
        categories.append(button);
      });
      grid.replaceChildren();
      projects.forEach(addCard);
      if (error) error.hidden = true;
      selectCategory('All');
    })
    .catch(err => {
      console.warn('Unable to load project table:', err);
      results.textContent = 'Projects unavailable';
      if (error) error.hidden = false;
      if (empty) empty.hidden = true;
    });
})();
