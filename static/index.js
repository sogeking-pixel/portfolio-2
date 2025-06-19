document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav ul li a');
    const sections = document.querySelectorAll('section[id]'); // Selects all <section> elements that have an 'id' attribute

    function activateNavLink() {
        let currentActiveSection = '';

        // Iterate backwards through sections to find the one currently in view
        // This helps handle cases where the top of a section is just out of view
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if the section is currently in the viewport
            // We consider it active if its top is less than or equal to scroll position + 100px (or some offset)
            // and its bottom is greater than the scroll position
            if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSection = section.id;
                break; // Found the active section, no need to check further
            }
        }

        // Remove 'select-nav' from all list items
        navLinks.forEach(link => {
            link.parentElement.classList.remove('select-nav');
        });

        // Add 'select-nav' to the corresponding list item
        if (currentActiveSection) {
            const activeLink = document.querySelector(`.nav ul li a[href="#${currentActiveSection}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('select-nav');
            }
        }
    }

    // Call on page load to set initial active state
    activateNavLink();

    // Attach scroll event listener
    window.addEventListener('scroll', activateNavLink);

    // Optional: Add click listener to smoothly scroll to section and update active state immediately
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll smoothly to the target section
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust offset as needed (e.g., for a fixed header)
                    behavior: 'smooth'
                });

                // Manually update the active class right after clicking
                navLinks.forEach(l => l.parentElement.classList.remove('select-nav'));
                this.parentElement.classList.add('select-nav');
            }
        });
    });
});