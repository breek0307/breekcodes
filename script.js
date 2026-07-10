// ============================================================
// SUPABASE CONFIG
// ============================================================
const SUPABASE_URL = 'https://bnlgxhchknvakoanmnlr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGd4aGNoa252YWtvYW5tbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzI5NzQsImV4cCI6MjA3ODk0ODk3NH0.qWvfiy2G7OnLCTIqCNdkLbKhm6AI3uuZ7micVcSzDJo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // HEADER SCROLL EFFECT
  // ============================================================
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // ============================================================
  // MOBILE MENU
  // ============================================================
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawer.querySelectorAll('.mobile-nav-link, .btn-mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }


  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ============================================================
  // CONTACT FORM — SUPABASE SUBMIT
  // ============================================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending&hellip; <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const dataObject = Object.fromEntries(formData.entries());

      const { error } = await supabaseClient
        .from('consultations')
        .insert(dataObject);

      if (error) {
        console.error('Supabase error:', error);
        submitBtn.innerHTML = 'Something went wrong &mdash; try again';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
        }, 3000);
      } else {
        const thanksPop = document.getElementById('popup-thanks');
        if (thanksPop) thanksPop.checked = true;
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }
    });
  }

});
