
// Hamburger Menu js
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle navigation display
    function toggleNavigation() {
        // Toggle the 'show' class on the navigation
        document.querySelector('.navigation').classList.toggle('show');
        // Toggle the 'change' class on the hamburger menu icon
        document.querySelector('.menu-toggle').classList.toggle('change');

        // Toggle the 'open' class on the menu toggle to trigger hamburger menu transformation
        document.querySelector('.menu-toggle').classList.toggle('open');
    }

    // Event listener for hamburger menu click
    document.querySelector('.menu-toggle').addEventListener('click', toggleNavigation);

    // Close navigation when a navigation item is clicked (optional)
    document.querySelectorAll('.navigation a').forEach(function(item) {
        item.addEventListener('click', function() {
            // Check if navigation is currently open
            if (document.querySelector('.navigation').classList.contains('show')) {
                // If so, toggle navigation to close it
                toggleNavigation();
            }
        });
    });
});
