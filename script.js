  // Constants
  const LOADER_DURATION = 400; // Set to 3 seconds (3000ms)

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


  // Define all available pages for search
  const pages = [
    { title: "Home", url: "index.html", keywords: ["home", "main", "landing"] },
    { title: "COECSA Building", url: "coecsa.html", keywords: ["coecsa", "building", "map"] },
    { title: "Ground Floor", url: "groundfloor.html", keywords: ["ground floor", "ground", "floor", "g/f", "gf"] },
    { title: "2nd Floor", url: "2nd-floor.html", keywords: ["2nd floor", "second floor", "floor 2", "2f", "classroom 201", "classroom 202", "classroom 203", "classroom 204", "information and communication technology department office", "coecsa administrative office", "gs deans office" , "consulatants office", "accreditation room", "doe faculty room", "coecsa deans office"] },
    { title: "3rd Floor", url: "3rd-floor.html", keywords: ["3rd floor", "third floor", "floor 3", "3f","classroom 301","classroom 302","classroom 303","classroom 304","classroom 305","classroom 306","classroom 307","classroom 308","doa faculty room", "dcs faculty room", "cfad consultation and defense room","cfad faculty room", "cfad deans office"] },
    { title: "5th Floor", url: "5th-floor.html", keywords: ["5th floor", "fifth floor", "floor 5", "5f", "energy conversion laboratory", "circuits laboratory", "coecsa laboratory office", "ergonomics laboratory", "electronics laboratory", "hardware networking laboratory", "industrial automation and robotics laboratory", "communication laboratory", "methods study laboratory"] },
    { title: "6th Floor", url: "6th-floor.html", keywords: ["6th floor", "sixth floor", "floor 6", "6f", "classroom 601", "classroom 602", "classroom 603", "classroom 604", "classroom 605", "classroom 606", "classroom 607", "classroom 608", "classroom 609", "classroom 610", "classroom 611", "classroom 612", "classroom 613", "classroom 614"] },
    { title: "7th Floor", url: "7th-floor.html", keywords: ["7th floor", "seventh floor", "floor 7", "7f", "classroom 701", "classroom 702", "classroom 703", "classroom 704", "classroom 705", "classroom 706", "classroom 707", "classroom 708", "classroom 709", "classroom 710", "classroom 711", "classroom 712", "classroom 713", "classroom 714"] },
    { title: "Safe Zone", url: "safe-zone.html", keywords: ["safe zone", "safety", "evacuation zone", "sz"] },
    { title: "What To Do", url: "what-to-do.html", keywords: ["what to do", "emergency", "guidelines", "procedures", "wtd"] },
    { title: "Contacts", url: "contacts.html", keywords: ["contacts", "emergency contacts", "phone numbers"] },
    { title: "Mapa-Alerto", url: "mapa-alerto.html", keywords: ["mapa-alerto", "mapa alerto", "about", "project","overview"] },
    { title: "University Profile", url: "university-profile.html", keywords: ["university", "profile", "lpu", "cavite", "history", "viva pirata"] },
    { title: "Events", url: "events.html", keywords: ["events", "seminars", "training"] },
    { title: "FAQs", url: "faq.html", keywords: ["faq", "faqs", "questions", "security", "help"] },
    { title: "Comics", url: "comics.html", keywords: ["mapa-alerto comics", "mapa alerto comics","comic", "comics", "scan me", "cartoon", "drawing"] }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    // Desktop search elements
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchIcon = document.getElementById('searchIcon');

    // Mobile search elements
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchContainer = document.getElementById('mobileSearchContainer');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchResults = document.getElementById('mobileSearchResults');
    const mobileSearchClose = document.getElementById('mobileSearchClose');

    // Function to show search results
    function showSearchResults(results, resultsContainer) {
      // Clear previous results
      resultsContainer.innerHTML = '';

      if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result-item';
        noResults.textContent = 'No results found';
        resultsContainer.appendChild(noResults);
      } else {
        // Add new results
        results.forEach(result => {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          resultItem.innerHTML = result.highlightedTitle || result.title;
          resultItem.addEventListener('click', function () {
            window.location.href = result.url;
          });
          resultsContainer.appendChild(resultItem);
        });
      }

      // Show results container
      resultsContainer.style.display = 'block';
    }

    // Function to hide search results
    function hideSearchResults(resultsContainer) {
      setTimeout(() => {
        resultsContainer.style.display = 'none';
      }, 200);
    }

    // Function to perform search
    function performSearch(query, resultsContainer) {
      if (!query.trim()) {
        hideSearchResults(resultsContainer);
        return;
      }

      const searchTerm = query.toLowerCase();

      // Filter and rank results
      const results = pages
        .filter(page => {
          return page.title.toLowerCase().includes(searchTerm) ||
            page.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        })
        .map(page => {
          // Calculate relevance score (simple implementation)
          let score = 0;

          // Title match gets highest score
          if (page.title.toLowerCase() === searchTerm) {
            score += 10;
          } else if (page.title.toLowerCase().includes(searchTerm)) {
            score += 5;
          }

          // Keyword matches
          page.keywords.forEach(keyword => {
            if (keyword.toLowerCase() === searchTerm) {
              score += 3;
            } else if (keyword.toLowerCase().includes(searchTerm)) {
              score += 1;
            }
          });

          // Highlight the matching parts in title
          const titleLower = page.title.toLowerCase();
          if (titleLower.includes(searchTerm)) {
            const startIndex = titleLower.indexOf(searchTerm);
            const highlightedTitle =
              page.title.substring(0, startIndex) +
              '<span class="search-highlight">' +
              page.title.substring(startIndex, startIndex + searchTerm.length) +
              '</span>' +
              page.title.substring(startIndex + searchTerm.length);

            return { ...page, score, highlightedTitle };
          }

          return { ...page, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 6); // Limit to top 6 results

      showSearchResults(results, resultsContainer);
    }

    // ---- Desktop Search Setup ----

    // Event listener for input changes
    searchInput.addEventListener('input', function () {
      performSearch(this.value, searchResults);
    });

    // Event listener for search icon click
    searchIcon.addEventListener('click', function () {
      performSearch(searchInput.value, searchResults);
    });

    // Handle click outside to close results
    document.addEventListener('click', function (event) {
      if (!searchInput.contains(event.target) &&
        !searchResults.contains(event.target) &&
        !searchIcon.contains(event.target)) {
        hideSearchResults(searchResults);
      }
    });

    // Handle focus to show results again if there's a query
    searchInput.addEventListener('focus', function () {
      if (this.value.trim()) {
        performSearch(this.value, searchResults);
      }
    });

    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const firstResult = searchResults.querySelector('.search-result-item');
        if (firstResult && firstResult.textContent !== 'No results found') {
          const url = pages.find(page =>
            page.title === firstResult.textContent ||
            firstResult.innerHTML.includes(page.title)
          )?.url;

          if (url) {
            window.location.href = url;
          }
        }
      }
    });

    // ---- Mobile Search Setup ----

    // Show mobile search bar
    mobileSearchBtn.addEventListener('click', function () {
      mobileSearchContainer.style.display = 'block';
      setTimeout(() => {
        mobileSearchContainer.classList.add('show');
        mobileSearchInput.focus();
      }, 10);
    });

    // Hide mobile search bar
    mobileSearchClose.addEventListener('click', function () {
      hideSearchResults(mobileSearchResults);
      mobileSearchContainer.classList.remove('show');
      setTimeout(() => {
        mobileSearchContainer.style.display = 'none';
        mobileSearchInput.value = '';
      }, 300);
    });

    // Event listener for mobile input changes
    mobileSearchInput.addEventListener('input', function () {
      performSearch(this.value, mobileSearchResults);
    });

    // Handle mobile keyboard navigation
    mobileSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const firstResult = mobileSearchResults.querySelector('.search-result-item');
        if (firstResult && firstResult.textContent !== 'No results found') {
          const url = pages.find(page =>
            page.title === firstResult.textContent ||
            firstResult.innerHTML.includes(page.title)
          )?.url;

          if (url) {
            window.location.href = url;
          }
        }
      } else if (e.key === 'Escape') {
        mobileSearchClose.click();
      }
    });
  });

  