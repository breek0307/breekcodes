// --- 1. Initialize Supabase Client (FIXED) ---
const SUPABASE_URL = 'https://bnlgxhchknvakoanmnlr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGd4aGNoa252YWtvYW5tbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzI5NzQsImV4cCI6MjA3ODk0ODk3NH0.qWvfiy2G7OnLCTIqCNdkLbKhm6AI3uuZ7micVcSzDJo';

// **THE FIX:** We've renamed your variable to 'supabaseClient'
// The global 'supabase' object (from the CDN) is on the right.
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// --- 2. Add ALL event listeners after the page loads ---
// We use one 'DOMContentLoaded' for all your code.
document.addEventListener('DOMContentLoaded', () => {

  // === Hamburger Menu Logic ===
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links-list');

  if (menuBtn && navLinksList) {
    menuBtn.addEventListener('click', () => {
      navLinksList.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active');
    });

    // Close menu when a link is clicked
    const navLinks = navLinksList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinksList.classList.contains('is-open')) {
          navLinksList.classList.remove('is-open');
          menuBtn.classList.remove('is-active');
        }
      });
    });
  }

  // === Consultation Form Logic ===
  const consultForm = document.getElementById('consultation-form');
  
  if (consultForm) {
    consultForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop the form from reloading
      
      const formData = new FormData(consultForm);
      const dataObject = Object.fromEntries(formData.entries());

      // **THE FIX:** Use 'supabaseClient' here
      const { error } = await supabaseClient
        .from('consultations')
        .insert(dataObject);
      
      if (error) {
        console.error('Error inserting data:', error);
        alert('Error: ' + error.message); // Show the error to help debug
      } else {
        // Success!
        document.getElementById('popup-hire').checked = false; 
        document.getElementById('popup-thanks').checked = true; 
        consultForm.reset(); 
      }
    });
  }

  // === Contact Form Logic ===
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const dataObject = Object.fromEntries(formData.entries());

      // **THE FIX:** Use 'supabaseClient' here too
      const { error } = await supabaseClient
        .from('messages')
        .insert(dataObject);
        
      if (error) {
        console.error('Error inserting data:', error);
        alert('Error: ' + error.message); // Show the error
      } else {
        // Success!
        alert('Message sent successfully! Thank you.');
        contactForm.reset();
      }
    });
  }

}); // --- End of DOMContentLoaded listener ---
