class MainHeader extends HTMLElement {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.handleSubmenuToggle = this.handleSubmenuToggle.bind(this);
    this.handleParentSubmenuToggle = this.handleParentSubmenuToggle.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.clearSubmenus = this.clearSubmenus.bind(this);
  }

  connectedCallback() {
    // Scroll handling
    window.addEventListener('scroll', this.handleScroll);

    // Mobile menu toggle
    const hamburger = document.querySelector('[data-humbergur]');
    if (hamburger) {
      hamburger.addEventListener('click', this.toggleMobileMenu);
    }

    // Submenu toggle
    const hasChildElements = document.querySelectorAll('[data-has-child]');
    hasChildElements.forEach((element) => {
      element.addEventListener('click', this.handleSubmenuToggle);
    });

    const hasChildLinks = document.querySelectorAll('[data-has-child-link]');
    hasChildLinks.forEach((link) => {
      link.addEventListener('click', this.handleParentSubmenuToggle);
    });

    // Back button handling
    const backButtons = document.querySelectorAll('[data-back-btn]');
    backButtons.forEach((button) => {
      button.addEventListener('click', this.handleBackButton);
    });
  }

  disconnectedCallback() {
    // Remove scroll handling
    window.removeEventListener('scroll', this.handleScroll);

    // Remove mobile menu toggle
    const hamburger = document.querySelector('[data-humbergur]');
    if (hamburger) {
      hamburger.removeEventListener('click', this.toggleMobileMenu);
    }

    // Remove submenu toggle
    const hasChildElements = document.querySelectorAll('[data-has-child]');
    hasChildElements.forEach((element) => {
      element.removeEventListener('click', this.handleSubmenuToggle);
    });

    // edited mega menu parent item clickable
    // const hasChildLinks = document.querySelectorAll('[data-has-child-link]');
    // hasChildLinks.forEach((link) => {
    //   link.removeEventListener('click', this.handleParentSubmenuToggle);
    // });

    // Remove back button handling
    const backButtons = document.querySelectorAll('[data-back-btn]');
    backButtons.forEach((button) => {
      button.removeEventListener('click', this.handleBackButton);
    });
  }

  handleScroll() {
    const header = document.querySelector('[data-main-header]');
    if (window.scrollY > 45) {
      header?.classList.add('main-header__active');
    } else {
      header?.classList.remove('main-header__active');
    }
  }

  toggleMobileMenu() {
    const header = document.querySelector('[data-main-header]');
    if (header) {
      const isMenuOpen = header.classList.toggle('main-header--open-mobile-menu');
      if (!isMenuOpen) {
        // Clear all submenu active classes when menu is closed
        this.clearSubmenus();
      }
    }
  }

  handleSubmenuToggle(event) {
    // Prevent the event from bubbling
    event.stopPropagation();
    event.currentTarget.classList.toggle('main-header__nav-child-active');
  }

  handleParentSubmenuToggle(event) {
    // Prevent default behavior and bubbling
    event.preventDefault();
    event.stopPropagation();
    const parent = event.currentTarget.closest('[data-has-child]');
    if (parent) {
      parent.classList.toggle('main-header__nav-child-active');
    }
  }

  handleBackButton(event) {
    // Prevent the event from bubbling
    event.stopPropagation();
    const parent = event.currentTarget.closest('[data-has-child]');
    if (parent) {
      parent.classList.remove('main-header__nav-child-active');
    }
  }

  clearSubmenus() {
    // Remove active class from all submenus
    const submenus = document.querySelectorAll('[data-has-child]');
    submenus.forEach((submenu) => {
      submenu.classList.remove('main-header__nav-child-active');
    });
  }
}

customElements.define('main-header', MainHeader);
