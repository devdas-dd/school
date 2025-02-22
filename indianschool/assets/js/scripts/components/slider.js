document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.arrow.prev');
    const nextButton = document.querySelector('.arrow.next');
    const paginationDots = document.querySelector('.pagination');
  
    let currentIndex = 0;
  
    // Function to move the slider
    function moveSlider(index) {
      const slideWidth = slides[0].clientWidth;
      slider.style.transform = `translateX(${-index * slideWidth}px)`;
    }
  
    // Function to update pagination dots
    function updatePagination() {
      const dots = document.querySelectorAll('.pagination button');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  
    // Function to go to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      moveSlider(currentIndex);
      updatePagination();
    }
  
    // Function to go to the previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveSlider(currentIndex);
      updatePagination();
    }
  
    // Function to set up pagination dots
    function setupPagination() {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => {
          currentIndex = i;
          moveSlider(currentIndex);
          updatePagination();
        });
        paginationDots.appendChild(dot);
      }
      updatePagination();
    }
  
    // Event listeners for manual navigation
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
  
    // Automatic sliding every 5 seconds
    setInterval(nextSlide, 5000);
  
    // Setup pagination dots
    setupPagination();
  });