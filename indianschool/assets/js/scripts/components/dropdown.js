document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", function (event) {
            event.stopPropagation();
            this.classList.toggle("active");
        });
    });

    document.addEventListener("click", function () {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("active");
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.dropdown-menu');
      const prevButton = dropdown.querySelector('.arrow.prev');
      const nextButton = dropdown.querySelector('.arrow.next');
  
      let currentIndex = 0;
      const items = Array.from(menu.children);
  
      function showItem(index) {
        items.forEach((item, i) => {
          item.style.display = i === index ? 'block' : 'none';
        });
      }
  
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
      });
  
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
      });
  
      // Initially show the first item
      showItem(currentIndex);
    });
  });