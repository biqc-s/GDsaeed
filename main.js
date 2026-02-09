// ==========================================
// GDevelop SEU Hub - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // --- Navbar Style on Scroll ---
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.card, .workshop-step, .psych-card, .canvas-section, .slide-header, .section-separator');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                el.classList.add('revealed');
            }
        });
    }

    // --- Back to Top Button ---
    const backToTop = document.querySelector('.back-to-top');

    function handleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Reading Progress Bar ---
    const progressBar = document.querySelector('.progress-bar');

    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    // --- Workshop Steps Counter ---
    const stepsTotal = document.querySelectorAll('.workshop-step').length;
    const stepsCounter = document.querySelector('.steps-counter');

    function updateStepsCounter() {
        if (!stepsCounter || stepsTotal === 0) return;
        let visibleSteps = 0;
        document.querySelectorAll('.workshop-step').forEach(step => {
            if (step.getBoundingClientRect().top < window.innerHeight - 100) {
                visibleSteps++;
            }
        });
        stepsCounter.textContent = `${visibleSteps} / ${stepsTotal}`;
    }

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetEl.offsetTop - navHeight - 10;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Unified Scroll Handler ---
    function onScroll() {
        highlightNavLink();
        handleNavbarScroll();
        revealOnScroll();
        handleBackToTop();
        updateProgressBar();
        updateStepsCounter();
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on load
    onScroll();
    revealOnScroll();
});
