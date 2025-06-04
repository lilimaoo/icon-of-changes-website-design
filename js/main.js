document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation menu
  const setupMobileNav = () => {
    const navToggle = document.createElement("button");
    navToggle.classList.add("nav-toggle");
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';

    const navbar = document.querySelector(".navbar");
    if (window.innerWidth <= 992) {
      navbar.insertBefore(navToggle, document.querySelector(".nav-links"));

      navToggle.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.toggle("nav-active");
        navToggle.classList.toggle("active");
        if (navToggle.classList.contains("active")) {
          navToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
          navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    }
  };

  // Initialize mobile navigation
  setupMobileNav();

  // Adjust navigation on window resize
  window.addEventListener("resize", () => {
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
      navToggle.remove();
      document.querySelector(".nav-links").classList.remove("nav-active");
    }
    setupMobileNav();
  });

  // Add scroll animations
  const fadeInElements = document.querySelectorAll(
    ".event-card, .stat-card, .video-card, .about-card, .contact-card"
  );

  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const fadeInObserver = new IntersectionObserver(function (
    entries,
    fadeInObserver
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("fade-in");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  fadeInOptions);

  fadeInElements.forEach((element) => {
    element.classList.add("fade-in-element");
    fadeInObserver.observe(element);
  });

  // Share functionality
  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the title of the article/event
      const cardElement = this.closest(".event-card, .article-card");
      const title = cardElement.querySelector("h3").textContent;

      // Create a temporary input to copy the URL
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);

      // Show copied alert
      alert("Link copied to clipboard!");
    });
  });

  // Add video playback functionality
  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {
    card.addEventListener("click", function () {
      const videoTitle = this.querySelector("h3").textContent;

      // Get video ID from data attribute (recommended for dynamic setup)
      const videoId = this.getAttribute("data-fb-id");

      // Construct proper Facebook embed URL
      const videoUrl = `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/IconsOfChangePhilippines/videos/${videoId}/&show_text=false&width=560`;

      // Create modal
      const modal = document.createElement("div");
      modal.classList.add("video-modal");

      // Create modal content
      modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${videoTitle}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <iframe 
            src="${videoUrl}" 
            width="560" 
            height="314" 
            style="border:none;overflow:hidden" 
            scrolling="no" 
            frameborder="0" 
            allowfullscreen="true" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>
    `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal);
        document.body.style.overflow = "auto";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          document.body.style.overflow = "auto";
        }
      });
    });
  });

  // Fallback for logo image
  const logoPlaceholders = document.querySelectorAll(
    ".logo-img, .footer-logo-img"
  );
  logoPlaceholders.forEach((placeholder) => {
    placeholder.onerror = function () {
      this.style.display = "none";
      this.nextElementSibling.style.marginLeft = "0";
    };
  });
});
