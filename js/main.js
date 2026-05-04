// Main JS — Cursor, scroll reveal, interactions

(function() {

  // ── CUSTOM CURSOR ──
  const cur     = document.getElementById('cur');
  const curRing = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function lerpRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    curRing.style.left = rx + 'px';
    curRing.style.top  = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  // Cursor expand on interactive elements
  document.querySelectorAll('a, button, .work-item, .sk').forEach(el => {
    el.addEventListener('mouseenter', () => {
      curRing.style.width  = '52px';
      curRing.style.height = '52px';
      curRing.style.borderColor = 'rgba(200,255,0,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      curRing.style.width  = '36px';
      curRing.style.height = '36px';
      curRing.style.borderColor = 'rgba(200,255,0,0.4)';
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 90);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // ── SMOOTH NAV LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
