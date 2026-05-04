// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
        // Extract the filename from the path
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    };

    const handleNavClick = function(e) {
        const href = this.getAttribute('href');
        const currentPage = getCurrentPage();

        // Extract the filename from the href
        const hrefFilename = href.split('/').pop();

        // If clicking a link to the current page, scroll to top instead
        if (hrefFilename === currentPage) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Add click handlers to logo link
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', handleNavClick);
    }

    // Add click handlers to nav links (home, attorney, practice areas)
    document.querySelectorAll('.nav a[href$=".html"]').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
});
