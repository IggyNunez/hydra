const initializeSwiper = (sliderElements, options, centerClass) => {
  sliderElements.forEach((sliderElement) => {
    const swiperInstance = new Swiper(sliderElement, {
      ...options,
      on: {
        slideChange: function () {
          if (centerClass) updateCenterClass(this, centerClass);
        },
        update: function () {
          if (centerClass) updateCenterClass(this, centerClass);
        },
      },
    });

    // Add center class on initialization if a center class is defined
    if (centerClass) updateCenterClass(swiperInstance, centerClass);
  });
};

const updateCenterClass = (swiper, centerClass) => {
  const activeIndex = swiper.activeIndex;
  const slides = swiper.slides;

  // Remove the center class from all slides
  slides.forEach((slide) => slide.classList.remove(centerClass));

  // Calculate the center slide index
  const centerIndex = activeIndex + Math.floor(swiper.params.slidesPerView / 2);

  // Add the center class to the center slide if it exists
  if (slides[centerIndex]) {
    slides[centerIndex].classList.add(centerClass);
  }
};

// Formula Slider
const formulaSliderElements = document.querySelectorAll('[data-formula-swiper]');
if (formulaSliderElements.length) {
  const formulaOptions = {
    slidesPerView: 3.2,
    spaceBetween: 35,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    centeredSlides: false,
    breakpoints: {
      1025: {
        slidesPerView: 3.2,
        spaceBetween: 35,
      },
      768: {
        slidesPerView: 2.2,
      },
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
    },
  };
  initializeSwiper(formulaSliderElements, formulaOptions);
}

// Marquee Sliders
const marqueeSliders = document.querySelectorAll('[data-marquee-swiper]');
if (marqueeSliders.length) {
  marqueeSliders.forEach((swiperElement) => {
    const speed = swiperElement.getAttribute('data-slider-speed') || 3000;
    const spaceBetween = window.innerWidth < 1025 ? 10 : 28;
    const marqueeOptions = {
      spaceBetween: spaceBetween,
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: parseInt(speed),
      allowTouchMove: false,
    };
    new Swiper(swiperElement, marqueeOptions);
  });
}

// Testimonials Slider
const testimonialsSliderElements = document.querySelectorAll('[data-testimonials-swiper]');
if (testimonialsSliderElements.length) {
  const testimonialsOptions = {
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1025: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  };
  initializeSwiper(testimonialsSliderElements, testimonialsOptions);
}

// Happy Slider
const happySliderElements = document.querySelectorAll('[data-happy-slider]');
if (happySliderElements.length) {
  const happyOptions = {
    slidesPerView: 5,
    spaceBetween: 16,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1201: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    },
  };
  initializeSwiper(happySliderElements, happyOptions, 'center-slide');
}

if (document.querySelectorAll("[data-fancybox]").length > 0) {
  Fancybox.bind("[data-fancybox]", {
    buttons: ['close'],
    wheel: false,
    transitionEffect: "slide",
    loop: true,
    toolbar: false,
    clickContent: false
  });
}
