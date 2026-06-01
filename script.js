document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  // ── Scroll shadow ────────────────────────────────────────────────
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── Mobile menu ──────────────────────────────────────────────────
  toggle.addEventListener('click', () => {
    links.classList.toggle('nav__links--open');
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
    });
  });

  // ── Intersection observer for fade-in (progressive enhancement) ──
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll(
      '.feature-card, .step, .spotlight-card, .waitlist__card'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});
