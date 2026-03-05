document.addEventListener("DOMContentLoaded", (event) => {
  // Select all accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  // Open the first accordion by default
  const firstAccordionItem = document.querySelector('.accordion-item.active');
  const firstAccordionContent = firstAccordionItem.querySelector('.accordion-content');
  firstAccordionContent.style.height = `${firstAccordionContent.scrollHeight}px`;
  firstAccordionItem.style.padding = '0 0 15px';

  // Add click event listeners to all accordion headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const accordionContent = accordionItem.querySelector('.accordion-content');

      if (accordionItem.classList.contains('active')) {
        // Close the clicked accordion
        accordionContent.style.height = '0';
        accordionItem.style.padding = '0 0 0';
        accordionItem.classList.remove('active');
      } else {
        // Open the clicked accordion
        accordionItem.style.padding = '0 0 15px';
        accordionContent.style.height = `${accordionContent.scrollHeight}px`;
        accordionItem.classList.add('active');
      }
    });
  });
});
