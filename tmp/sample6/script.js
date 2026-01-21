document.addEventListener('DOMContentLoaded', () => {
    console.log("Vent Theme x Pragyaan 2026 Loaded");

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navContent = document.querySelector('.nav-content');
    const navBar = document.querySelector('.glass-nav');

    function updateNavState() {
        if (!navBar) return;
        const isScrolled = window.scrollY > 20;
        const isOpen = navContent && navContent.classList.contains('active');

        if (isScrolled || isOpen) {
            navBar.classList.add('docked');
        } else {
            navBar.classList.remove('docked');
        }
    }

    // Scroll Listener
    window.addEventListener('scroll', updateNavState);

    if (mobileMenu && navContent) {
        mobileMenu.addEventListener('click', () => {
            navContent.classList.toggle('active');
            updateNavState(); // Check state immediately on toggle

            // Optional: Animate hamburger
            const bars = mobileMenu.querySelectorAll('.bar');
        });
    }

    // Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Handle wrapping
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update index
        currentSlide = index;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto Advance
    let autoPlay = setInterval(nextSlide, slideInterval);

    // Dot Navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'));
            showSlide(index);
            // Reset timer on manual interaction
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, slideInterval);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navContent.classList.contains('active')) {
                    navContent.classList.remove('active');
                }
            }
        });
    });

    // Testimonials Auto-Scroll
    const testimonialContainer = document.querySelector('.scrolling-wrapper');
    if (testimonialContainer) {
        let isDown = false;

        // Auto Scroll Function
        function autoScroll() {
            // Check if we've reached the end
            if (testimonialContainer.scrollLeft >= (testimonialContainer.scrollWidth - testimonialContainer.clientWidth - 10)) {
                // Smoothly roll back to start
                testimonialContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Scroll forward by a card width approx
                testimonialContainer.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }

        let scrollInterval = setInterval(autoScroll, 3000);

        // Pause on interaction
        const pauseScroll = () => clearInterval(scrollInterval);
        const resumeScroll = () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(autoScroll, 3000);
        };

        testimonialContainer.addEventListener('mouseenter', pauseScroll);
        testimonialContainer.addEventListener('touchstart', pauseScroll);

        testimonialContainer.addEventListener('mouseleave', resumeScroll);
        testimonialContainer.addEventListener('touchend', resumeScroll);
    }
});
