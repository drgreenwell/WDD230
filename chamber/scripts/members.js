const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".display"); // Change to select the article with class display

// Load JSON data
fetch('members.json')
    .then(response => response.json())
    .then(data => {
        // Call a function to generate HTML sections from the JSON data
        renderSections(data);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// Function to generate HTML sections
function renderSections(data) {
    display.innerHTML = ''; // Clear previous content

    data.forEach(member => {
        const section = document.createElement('section');
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name}" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p>${member.additional_info}</p>
        `;
        display.appendChild(section);
    });
}

// Event listeners
gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}