// Create a new instance of IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    // Handle the intersection entries
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // The element is now visible in the viewport
        console.log('Element is visible:', entry.target);
      } else {
        // The element is no longer visible in the viewport
        console.log('Element is not visible:', entry.target);
      }
    });
  }, {
    root: null, // Use the viewport as the root element
    rootMargin: '0px', // No margin
    threshold: 1.0 // Fully visible
  });
  
  // Start observing an element
  const target = document.querySelector('#my-element');
  observer.observe(target);
  