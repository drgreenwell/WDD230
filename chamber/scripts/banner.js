// Display banner if it's Monday, Tuesday, or Wednesday
const today = new Date().getDay();
if (today >= 1 && today <= 3) {
    const banner = document.getElementById('chamber-banner');
    banner.style.display = 'block';
    const closeButton = document.getElementById('close-banner');
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior of the button
        banner.style.display = 'none';
    });
}