// Function to display the Chamber of Commerce meet and greet banner
function displayChamberBanner() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const bannerElement = document.getElementById('chamber-banner');

    if (dayOfWeek >= 1 && dayOfWeek <= 3) { // Monday to Wednesday
        bannerElement.style.display = 'block';
    } else {
        bannerElement.style.display = 'none';
    }
}

// Call function to display the banner when page loads
window.addEventListener('load', () => {
    displayChamberBanner();
});

// Function to close the Chamber of Commerce meet and greet banner
function closeChamberBanner() {
    const bannerElement = document.getElementById('chamber-banner');
    bannerElement.style.display = 'none';
}