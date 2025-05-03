  // Constants
  const LOADER_DURATION = 200; // Set to 3 seconds (3000ms)

  // Loader functionality
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loader = document.getElementById("loader-overlay");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 300); // Fade-out duration matches CSS
      }
    }, LOADER_DURATION);
  });

  // Toggle mobile navigation menu
  function toggleMenu() {
    const nav = document.getElementById("navLinks");
    if (nav) {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    }
  }

  // Highlight active navigation link
  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".top-links a");
    const currentPath = window.location.pathname.split("/").pop();
    links.forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });

    // Initialize AOS animations
    AOS.init();
  });
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out'
  });

  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form from submitting normally
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Define routing keywords and corresponding URLs
    const routes = {
      'ground': 'groundfloor.html',
      '1st': '1st-floor.html',
      '2nd': '2nd-floor.html',
      '3rd': '3rd-floor.html',
      '5th': '5th-floor.html',
      '6th': '6th-floor.html',
      '7th': '7th-floor.html',
      'coesca': 'coesca.html',
      'events': 'events.html',
      'contacts': 'contacts.html',
      'mapa alerto': 'Mapa-Alerto.html',
      'university': 'university-profile.html',
      'faq': 'faq.html',
      'what to do': 'what-to-do.html'
    };

    for (let key in routes) {
      if (query.includes(key)) {
        window.location.href = routes[key];
        return;
      }
    }

    // Fallback if no match is found
    alert("No page found for your search.");
  });

  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".top-links a[href]");
    const currentUrl = window.location.pathname;

    links.forEach(link => {
      if (link.getAttribute("href") && currentUrl.includes(link.getAttribute("href"))) {
        link.classList.add("active-page");
      }
    });
  });


  // BRAINROT
  let flipped = false;

  document.body.addEventListener("click", () => {
    flipped = !flipped;
    document.body.classList.toggle("flip-mode", flipped);
  });