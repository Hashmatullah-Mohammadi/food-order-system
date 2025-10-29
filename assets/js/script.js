// Load header and initialize functionality
fetch("./components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
    // Initialize hamburger menu after header is loaded
    initializeHamburgerMenu();
    initializeDropdowns();
    initializeThemeToggle();
  })
  .catch((error) => {
    console.error('Error loading header:', error);
  });


// Load footer
fetch("./components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => {
    console.error('Error loading footer:', error);
  });

/////////////////////////////////////

// Initialize hamburger menu
function initializeHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }));
  }
}

// Initialize dropdowns for mobile
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
    
    if (dropdownToggle) {
      dropdownToggle.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });
}

// Initialize theme toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  
  // Check for saved theme or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  
  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
  }
  
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      
      if (document.body.classList.contains("light-theme")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });
  }
}

// Header scroll effect
window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 50) {
      header.style.padding = "10px 0";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.padding = "15px 0";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    }
  }
});

// Add animation classes when elements are in viewport
document.addEventListener("DOMContentLoaded", function() {
  // Feature cards animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 * (index + 1)}s`;
  });
  
  // Simple fade-in animation for elements when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });
  
  // Observe elements that need animation
  document.querySelectorAll('.feature-card, .footer-section, .hero-content h1, .hero-content p, .hero-buttons').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});