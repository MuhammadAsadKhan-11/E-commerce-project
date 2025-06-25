document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Carousel Functionality
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    function moveSlide(step) {
        currentIndex += step;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        updateCarousel();
    }

    function currentSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        document.querySelector(".carousel-container").style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
        }
    }

    setInterval(() => {
        moveSlide(1);
    }, 5000);
});
