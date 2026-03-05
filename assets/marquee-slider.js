class SliderMarquee extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.onload = () => {
      const swiperElement = this.querySelector('[data-marquee-swiper]');
      if (swiperElement) {
        const speed = swiperElement.getAttribute('data-slider-speed') || 3000;

        // Determine space between slides based on screen size
        const spaceBetween = window.innerWidth < 1025 ? 10 : 28;

        // Initialize Swiper
        new Swiper(swiperElement, {
          spaceBetween: spaceBetween,
          slidesPerView: 'auto',
          loop: true,
          autoplay: {
            delay: 1,
            disableOnInteraction: false,
          },
          speed: parseInt(speed),
          allowTouchMove: false,
        });
      }
    };
  }
}

// Define the custom element
customElements.define('slider-marquee', SliderMarquee);