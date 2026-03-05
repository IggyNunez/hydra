/* ═══════════════════════════════════════════════════
   Product Grid — Animation Engine
   GSAP + ScrollTrigger + Magnetic Cursor + Parallax
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Wait for GSAP ── */
  function waitForGSAP(cb, tries) {
    tries = tries || 0;
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      cb();
    } else if (tries < 40) {
      setTimeout(function () { waitForGSAP(cb, tries + 1); }, 100);
    }
  }

  /* ═══════════════════════
     GSAP Animations
     ═══════════════════════ */
  function initGSAP() {
    var sections = document.querySelectorAll('.product-grid');
    if (!sections.length) return;

    /* Respect reduced motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    sections.forEach(function (section) {
      /* Mark section so CSS fallback animations are disabled */
      section.classList.add('gsap-loaded');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      /* Floating particles — gentle drift with GSAP */
      var particles = section.querySelectorAll('.pg-particle');
      if (particles.length) {
        particles.forEach(function (p) {
          gsap.to(p, {
            y: 'random(-40, 40)',
            x: 'random(-30, 30)',
            rotation: 'random(-20, 20)',
            duration: 'random(4, 8)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 'random(0, 3)'
          });
        });
      }

      /* Subtitle — letter spacing morph + slide up */
      var subtitle = section.querySelector('.product-grid__subtitle');
      if (subtitle) {
        tl.from(subtitle, {
          y: 24,
          opacity: 0,
          letterSpacing: '0.3em',
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      /* Title — scale reveal */
      var title = section.querySelector('.product-grid__title');
      if (title) {
        tl.from(title, {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: 'power3.out'
        }, '-=0.5');
      }

      /* Description */
      var desc = section.querySelector('.product-grid__desc');
      if (desc) {
        tl.from(desc, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4');
      }

      /* Divider line — draw in */
      var divider = section.querySelector('.product-grid__divider');
      if (divider) {
        tl.from(divider, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.3');
      }

      /* Product cards — staggered entrance (no tilt) */
      var cards = section.querySelectorAll('.product-grid__item');
      if (cards.length) {
        tl.from(cards, {
          y: 60,
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          stagger: {
            each: 0.1,
            from: 'start'
          },
          ease: 'power3.out'
        }, '-=0.3');
      }

      /* CTA button */
      var cta = section.querySelector('.product-grid__cta');
      if (cta) {
        tl.from(cta, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2');
      }
    });
  }

  /* ═══════════════════════
     Cursor Glow on Cards
     ═══════════════════════ */
  function initCursorGlow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 749px)').matches) return;

    var cards = document.querySelectorAll('.product-grid__item');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var glow = card.querySelector('.pg-card-glow');
        if (glow) {
          var rect = card.getBoundingClientRect();
          var pctX = ((e.clientX - rect.left) / rect.width) * 100;
          var pctY = ((e.clientY - rect.top) / rect.height) * 100;
          glow.style.background =
            'radial-gradient(circle at ' + pctX + '% ' + pctY +
            '%, rgba(255,255,255,0.15) 0%, transparent 60%)';
        }
      });

      card.addEventListener('mouseleave', function () {
        var glow = card.querySelector('.pg-card-glow');
        if (glow) {
          glow.style.background = 'transparent';
        }
      });
    });
  }

  /* ═══════════════════════
     Magnetic CTA Button
     ═══════════════════════ */
  function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 749px)').matches) return;

    var btns = document.querySelectorAll('.product-grid__btn');

    btns.forEach(function (btn) {
      var strength = 30;
      var textStrength = 15;
      var text = btn.querySelector('.pg-btn-text') || btn;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out'
        });

        if (text !== btn) {
          gsap.to(text, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)'
        });

        if (text !== btn) {
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)'
          });
        }
      });
    });
  }

  /* ═══════════════════════
     Image Hover Parallax
     ═══════════════════════ */
  function initImageParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 749px)').matches) return;

    var items = document.querySelectorAll('.product-grid__item');

    items.forEach(function (item) {
      var img = item.querySelector('.card__media .media > img');
      if (!img) return;

      item.addEventListener('mousemove', function (e) {
        var rect = item.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        gsap.to(img, {
          x: x * 8,
          y: y * 8,
          scale: 1.08,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', function () {
        gsap.to(img, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }

  /* ═══════════════════════
     Floating Particles Init
     ═══════════════════════ */
  function createParticles() {
    var grids = document.querySelectorAll('.product-grid[data-particles="true"]');
    grids.forEach(function (grid) {
      var container = grid.querySelector('.pg-particles');
      if (!container) return;

      /* Clear any existing particles (Shopify customizer reload) */
      container.innerHTML = '';

      for (var i = 0; i < 12; i++) {
        var particle = document.createElement('span');
        particle.className = 'pg-particle';
        var size = Math.random() * 18 + 8;  /* 8–26px — much more visible */
        particle.style.cssText =
          'left:' + (Math.random() * 85 + 5) + '%;' +
          'top:' + (Math.random() * 75 + 10) + '%;' +
          'width:' + size + 'px;' +
          'height:' + size + 'px;' +
          'opacity:' + (Math.random() * 0.35 + 0.15) + ';';
        container.appendChild(particle);
      }
    });
  }

  /* ═══════════════════════
     Card Counter Animation
     ═══════════════════════ */
  function initCardCounters() {
    var counters = document.querySelectorAll('.pg-card-index');
    counters.forEach(function (counter, i) {
      counter.textContent = String(i + 1).padStart(2, '0');
    });
  }

  /* ═══════════════════════
     Init Everything
     ═══════════════════════ */
  function init() {
    createParticles();
    initCardCounters();

    waitForGSAP(function () {
      initGSAP();
      initCursorGlow();
      initMagneticButtons();
      initImageParallax();
    });
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Shopify section reloads (customizer) */
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (e) {
      if (e.target.querySelector('.product-grid')) {
        setTimeout(init, 200);
      }
    });
  }
})();
