//slider.js

document.addEventListener('DOMContentLoaded', () => {
    let slides = document.querySelectorAll('#slides .slide');
    let indicators = document.querySelectorAll('#indicators .slider-indicator');

    let currentSlide = 0;

    function goToSlide(n) {
    slides[currentSlide].classList.remove('showing');
    indicators[currentSlide].classList.remove('indicator-active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('showing');
    indicators[currentSlide].classList.add('indicator-active');
    }

    indicators.forEach((el, idx) => {
      el.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    function nextSlide() {
	    goToSlide(currentSlide + 1);
    };

    // Automatic slide transition
    setInterval(nextSlide, 5000);
});