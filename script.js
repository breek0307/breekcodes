
    function openPopup() {
      document.getElementById("popupOverlay").style.display = "flex";
    }

    function closePopup() {
      document.getElementById("popupOverlay").style.display = "none";
    }

   const boxes = document.querySelectorAll('.offer-box');

    boxes.forEach(box => {
      box.addEventListener('click', () => {
        boxes.forEach(b => {
          if (b !== box) b.classList.remove('active');
        });
        box.classList.toggle('active');
      });
    });

    // Scroll background change
    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    function interpolateColor(color1, color2, factor) {
      let c1 = hexToRgb(color1);
      let c2 = hexToRgb(color2);
      let r = Math.round(c1.r + (c2.r - c1.r) * factor);
      let g = Math.round(c1.g + (c2.g - c1.g) * factor);
      let b = Math.round(c1.b + (c2.b - c1.b) * factor);
      return `rgb(${r}, ${g}, ${b})`;
    }
    document.addEventListener('DOMContentLoaded', () => {

  // Get the two elements we need
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links-list');

  // Make sure both elements exist before adding the listener
  if (menuBtn && navLinksList) {
    
    // Add the click event listener to the button
    menuBtn.addEventListener('click', () => {
      
      // 1. Toggle the .is-open class on the <ul> to show/hide it
      navLinksList.classList.toggle('is-open');
      
      // 2. Toggle the .is-active class on the <button> for the "X" animation
      menuBtn.classList.toggle('is-active');
    });
  }
  
  // (Optional but recommended) Close the menu when a link is clicked
  const navLinks = navLinksList.querySelectorAll('a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Check if the mobile menu is open
      if (navLinksList.classList.contains('is-open')) {
        navLinksList.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
      }
    });
  });

});

    // Set initial background
    // document.body.style.background = `linear-gradient(135deg, #000000, #0a0a0a, #050505)`;

    // window.addEventListener('scroll', function() {
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //   let maxScroll = document.body.scrollHeight - window.innerHeight;
    //   let scrollPercent = Math.min(scrollTop / maxScroll, 1); // Cap at 1

    //   let startColor = interpolateColor('#000000', '#0a0a0a', scrollPercent);
    //   let midColor = interpolateColor('#0a0a0a', '#050505', scrollPercent);
    //   let endColor = interpolateColor('#050505', '#000000', scrollPercent);

    //   document.body.style.background = `linear-gradient(135deg, ${startColor}, ${midColor}, ${endColor})`;
    // });
