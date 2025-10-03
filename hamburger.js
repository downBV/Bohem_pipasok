document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Menü bezárása, ha egy menüpontra kattintunk
        const menuButtons = navbar.querySelectorAll('.gombok');
        menuButtons.forEach(button => {
            button.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });

        // Menü bezárása, ha a navbar-on kívülre kattintunk
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbar.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNavbar && !isClickOnHamburger && navbar.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    }
});