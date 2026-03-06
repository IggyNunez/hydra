/**
 * Science Process – GSAP Scroll Animations
 * Staggered reveal with connector line fill
 */
(function () {
  function initScienceProcess() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-science-process]').forEach(function (section) {
      // Mark section as GSAP-ready (hides elements via CSS)
      section.setAttribute('data-gsap-ready', '');

      var header = section.querySelector('.science-process__header');
      var steps = section.querySelectorAll('.science-process__step');
      var footer = section.querySelector('.science-process__footer');
      var connectorFill = section.querySelector('.science-process__connector-fill');

      // — Header fade-in —
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // — Steps staggered reveal —
      if (steps.length) {
        steps.forEach(function (step, i) {
          gsap.fromTo(
            step,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: {
                trigger: step,
                start: 'top 88%',
                toggleActions: 'play none none none',
                onEnter: function () {
                  step.classList.add('is-active');
                  // Remove active class after pulse plays
                  setTimeout(function () {
                    step.classList.remove('is-active');
                  }, 2500);
                }
              }
            }
          );
        });
      }

      // — Connector line fill —
      if (connectorFill && steps.length) {
        var stepsContainer = section.querySelector('.science-process__steps');
        if (stepsContainer) {
          gsap.to(connectorFill, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: stepsContainer,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 0.8
            }
          });
        }
      }

      // — Footer fade-in —
      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }

  // Wait for GSAP to load, then init
  function waitForGsap() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initScienceProcess();
    } else {
      var attempts = 0;
      var check = setInterval(function () {
        attempts++;
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          clearInterval(check);
          initScienceProcess();
        }
        if (attempts > 50) clearInterval(check);
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForGsap);
  } else {
    waitForGsap();
  }

  // Shopify theme editor support
  if (Shopify && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (e) {
      if (e.target.querySelector('[data-science-process]')) {
        setTimeout(waitForGsap, 300);
      }
    });
  }
})();
