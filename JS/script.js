const navbar = document.getElementsByTagName('nav')[0];
window.addEventListener('scroll', function() {
    console.log(window.scrollY);
    if(this.window.scrollY > 1) {
        navbar.classList.replace('bg-transparent', 'navcolor')
    } else if (this.window.scrollY <=0) {
        navbar.classList.replace('navcolor', 'bg-transparent')

    }
});


document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card-fiture');
    const nextButton = document.querySelector('.arrow-button-right');
    const prevButton = document.querySelector('.arrow-button-left');

    // Clone the first and last cards
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);

    // Append and prepend the cloned cards
    carousel.appendChild(firstCard);
    carousel.insertBefore(lastCard, cards[0]);

    const updatedCards = document.querySelectorAll('.card-fiture');
    let currentIndex = 1; // Start from the first real card
    const totalCards = updatedCards.length;

    function updateCarousel() {
        const cardWidth = updatedCards[0].offsetWidth; // Get the width of the card
        console.log(`Card width: ${cardWidth}px`); // Debugging
        const offset = -currentIndex * cardWidth; // Calculate the offset
        carousel.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', function() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
        } else {
            // Temporarily disable transition for instant change
            carousel.style.transition = 'none';
            currentIndex = 1; // Move to the first real card
            carousel.style.transform = `translateX(${-currentIndex * updatedCards[0].offsetWidth}px)`;
            // Trigger a reflow
            carousel.offsetHeight; 
            // Re-enable transition and advance the index
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s ease'; // Re-enable transition
                currentIndex++;
                updateCarousel();
            }, 10); // Short delay to ensure reflow
            return;
        }
        updateCarousel();
    });


    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Temporarily disable transition for instant change
            carousel.style.transition = 'none';
            currentIndex = totalCards - 2; // Move to the last real card
            carousel.style.transform = `translateX(${-currentIndex * updatedCards[0].offsetWidth}px)`;
            // Trigger a reflow
            carousel.offsetHeight; 
            // Re-enable transition and adjust the index
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s ease'; // Re-enable transition
                currentIndex--;
                updateCarousel();
            }, 10); // Short delay to ensure reflow
            return;
        }
        updateCarousel();
    });

    // Initial update
    updateCarousel();
}); 

window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach((section, index) => {
      let rect = section.getBoundingClientRect();
      if (rect.top <= 50 && rect.bottom >= 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    });
  });