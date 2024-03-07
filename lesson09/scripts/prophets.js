const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayProphets(prophets) {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    card.classList.add('prophet-card'); // Add a class for styling

    let fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} (${prophet.birth})`; // Include Date of Birth

    let placeOfBirth = document.createElement('p');
    placeOfBirth.textContent = `Place of Birth: ${prophet.placeOfBirth}`; // Include Place of Birth

    let portrait = document.createElement('img');
    portrait.src = prophet.imageurl;
    portrait.alt = `${prophet.name}'s Portrait`;
    portrait.loading = 'lazy';
    portrait.width = '200'; // Adjust width if necessary
    portrait.height = '250'; // Adjust height if necessary

    card.appendChild(fullName);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

getProphetData();