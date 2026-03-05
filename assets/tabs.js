$(document).on('click', '[data-faq-question]', function () {
  const $currentFaq = $(this).closest('[data-faq]');
  const $currentAns = $currentFaq.find('[data-faq-ans]');

  // Slide up all answers and remove active class from all FAQs
  $('[data-faq-ans]').not($currentAns).slideUp();
  $('[data-faq]').removeClass('tabs__faq--active');

  // Slide toggle the current answer and add active class to the current FAQ
  $currentAns.slideToggle();
  $currentFaq.addClass('tabs__faq--active');
});
