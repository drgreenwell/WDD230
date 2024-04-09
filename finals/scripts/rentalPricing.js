document.addEventListener("DOMContentLoaded", function () {
    fetchPricingData();
});

function fetchPricingData() {
    fetch("data/rentalPricing.json")
        .then(response => response.json())
        .then(data => {
            // Process pricing information
            displayPricingInformation(data.pricing);
        })
        .catch(error => {
            console.error("Error fetching pricing information:", error);
        });
}

function displayPricingInformation(pricing) {
    const pricingTable = document.getElementById("pricingTable").getElementsByTagName('tbody')[0];

    // Iterate over rental types
    Object.keys(pricing.reservation.half_day).forEach(rentalType => {
        const typeRow = document.createElement("tr");
        const pricingData = pricing.reservation.half_day[rentalType];
        const fullDayPricingData = pricing.reservation.full_day[rentalType];
        const walkInPricingData = pricing.walk_in.half_day[rentalType];
        const walkInFullDayPricingData = pricing.walk_in.full_day[rentalType];

        // Add rental type and max persons
        const rentalTypeInfo = document.createElement("td");
        rentalTypeInfo.textContent = rentalType;
        typeRow.appendChild(rentalTypeInfo);

        const maxPersons = document.createElement("td");
        maxPersons.textContent = pricing.max_persons[rentalType];
        typeRow.appendChild(maxPersons);

        // Add pricing data
        const halfDayReservationPrice = document.createElement("td");
        halfDayReservationPrice.textContent = pricingData ? `$${pricingData}` : "";
        typeRow.appendChild(halfDayReservationPrice);

        const fullDayReservationPrice = document.createElement("td");
        fullDayReservationPrice.textContent = fullDayPricingData ? `$${fullDayPricingData}` : "";
        typeRow.appendChild(fullDayReservationPrice);

        const halfDayWalkInPrice = document.createElement("td");
        halfDayWalkInPrice.textContent = walkInPricingData ? `$${walkInPricingData}` : "";
        typeRow.appendChild(halfDayWalkInPrice);

        const fullDayWalkInPrice = document.createElement("td");
        fullDayWalkInPrice.textContent = walkInFullDayPricingData ? `$${walkInFullDayPricingData}` : "";
        typeRow.appendChild(fullDayWalkInPrice);

        pricingTable.appendChild(typeRow);
    });
}