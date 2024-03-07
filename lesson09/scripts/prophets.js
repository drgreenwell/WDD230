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
    let card = document.createElement('div');
    card.classList.add('prophet-card');

    let fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    let birthdate = document.createElement('p');
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

    let birthplace = document.createElement('p');
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

    let portrait = document.createElement('img');
    portrait.src = prophet.imageurl;
    portrait.alt = `${prophet.name} ${prophet.lastname}'s Portrait`;
    portrait.loading = 'lazy';
    portrait.width = '200'; // Adjust width if necessary
    portrait.height = '250'; // Adjust height if necessary

    card.appendChild(fullName);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

getProphetData();