document.addEventListener("DOMContentLoaded", function() {
    // Get the close button and banner
    var closeBtn = document.querySelector('.close-btn');
    var closeableMessage = document.querySelector('.closeable-message');

    // Add click event listener to the close button
    closeBtn.addEventListener('click', function() {
        // Hide the closeable message banner
        closeableMessage.style.display = 'none';
    });
});

