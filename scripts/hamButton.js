/* hamButton.js */

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
const mapFrame = document.querySelector('.map');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    if (navigation.classList.contains('open')) {
        mapFrame.style.display = 'none';
    } else {
        mapFrame.style.display = ''; // Reset to default
    }
});
