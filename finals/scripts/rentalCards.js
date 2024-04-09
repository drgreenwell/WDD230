document.addEventListener("DOMContentLoaded", function () {
    fetchRentalCardsData();
});

function fetchRentalCardsData() {
    fetch("data/rentalInfo.json")
        .then(response => response.json())
        .then(data => {
            // Process rental information
            displayRentalInformation(data.rentals);
            // Add lazy loading to images after the rental information is displayed
            addLazyLoading();
        })
        .catch(error => {
            console.error("Error fetching rental information:", error);
        });
}

function displayRentalInformation(rentals) {
    const rentalSection = document.getElementById("rentalSection");

    // Group rentals by type
    const rentalsByType = {};
    rentals.forEach(rental => {
        if (!rentalsByType[rental.type]) {
            rentalsByType[rental.type] = [];
        }
        rentalsByType[rental.type].push(rental);
    });

    // Iterate over rental types
    for (const [type, rentalsOfType] of Object.entries(rentalsByType)) {
        const typeHeader = document.createElement("h2");
        typeHeader.textContent = type;
        rentalSection.appendChild(typeHeader);

        const rentalGroup = document.createElement("div");
        rentalGroup.className = "rental-group";

        // Create card for each rental
        rentalsOfType.forEach(rental => {
            const card = document.createElement("div");
            card.className = "rental-card";

            // Create image element
            const image = document.createElement("img");
            image.setAttribute("data-src", rental.picture); // Store actual image URL in data-src attribute
            image.alt = rental.name;
            image.className = "rental-image"; // Add CSS class for centering
            image.style.maxWidth = "200px"; // Restricting width to 200px
            image.style.maxHeight = "200px"; // Restricting height to 200px
            // Set a placeholder or loading spinner in src attribute
            image.src = "placeholder.png"; // Replace placeholder.png with your actual placeholder image
            card.appendChild(image);

            // Populate card content
            const rentalInfo = `
                <p>${rental.name}</p>
                <p>Brand: ${rental.brand}</p>
                <p>Passengers: ${rental.max_persons}</p>
            `;
            card.innerHTML += rentalInfo;

            rentalGroup.appendChild(card);
        });

        rentalSection.appendChild(rentalGroup);
    }
}

function addLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
                imageObserver.unobserve(lazyImage);
            }
        });
    }, options);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
}