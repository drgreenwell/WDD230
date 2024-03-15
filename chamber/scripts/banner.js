// Display banner if it's Monday, Tuesday, or Wednesday
const today = new Date().getDay();
if (today >= 1 && today <= 7) {
    const banner = document.getElementById('chamber-banner');
    banner.style.display = 'block';
    const closeButton = document.getElementById('close-banner');
    closeButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}