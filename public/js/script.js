// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's the practice areas dropdown toggle
        if (this.parentElement.classList.contains('nav-dropdown')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle navigation links - scroll to top if already on that page
document.addEventListener('DOMContentLoaded', function() {
    const getCurrentPage = function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    };

    const handleNavClick = function(e) {
        const href = this.getAttribute('href');
        const currentPage = getCurrentPage();
        const hrefFilename = href.split('/').pop();

        if (hrefFilename === currentPage) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a nav link
        closeMobileMenu();
    };

    const closeMobileMenu = function() {
        const nav = document.querySelector('.nav');
        const hamburger = document.querySelector('.hamburger-btn');
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        if (nav) nav.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        dropdowns.forEach(d => d.classList.remove('active'));
    };

    // Logo link
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', handleNavClick);
    }

    // Nav links to actual pages
    document.querySelectorAll('.nav a[href$=".html"]').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Hamburger button toggle
    const hamburger = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            // Close any open dropdowns when closing the menu
            if (!isActive) {
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    }

    // Practice Areas dropdown toggle
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a[href="#"]');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const header = document.querySelector('.header');
        if (header && !header.contains(e.target) && nav && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Phone link in nav menu
    const navPhone = document.querySelector('.nav-phone-item a');
    if (navPhone) {
        navPhone.addEventListener('click', closeMobileMenu);
    }
});
