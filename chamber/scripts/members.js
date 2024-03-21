document.addEventListener("DOMContentLoaded", function () {
    let gridButton = document.getElementById("grid");
    let listButton = document.getElementById("list");
    let displayContainer = document.querySelector(".display");

    async function fetchMembers() {
        try {
            return await (await fetch("data/members.json")).json();
        } catch (error) {
            console.error("Error fetching members:", error);
            throw error; // Re-throw the error for handling in the outer scope
        }
    }

    function renderMemberCards(members) {
        displayContainer.innerHTML = "";
        members.forEach(member => {
            let memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            let memberImage = document.createElement("img");
            memberImage.src = "images/" + member.image;
            memberImage.alt = member.name;

            let memberDetails = document.createElement("div");
            memberDetails.classList.add("member-details");

            let memberName = document.createElement("h2");
            memberName.textContent = member.name;

            let memberAddress = document.createElement("p");
            memberAddress.textContent = member.address;

            let memberPhone = document.createElement("p");
            memberPhone.textContent = "Phone: " + member.phone;

            let memberWebsite = document.createElement("p");
            let websiteLink = document.createElement("a");
            websiteLink.href = member.website;
            websiteLink.textContent = "Website";
            memberWebsite.appendChild(websiteLink);

            memberDetails.appendChild(memberName);
            memberDetails.appendChild(memberAddress);
            memberDetails.appendChild(memberPhone);
            memberDetails.appendChild(memberWebsite);

            memberCard.appendChild(memberImage);
            memberCard.appendChild(memberDetails);

            displayContainer.appendChild(memberCard);
        });
    }

    gridButton.addEventListener("click", function () {
        displayContainer.classList.remove("list-view");
        displayContainer.classList.add("grid-view");
        fetchAndRenderMembers();
    });

    listButton.addEventListener("click", function () {
        displayContainer.classList.remove("grid-view");
        displayContainer.classList.add("list-view");
        fetchAndRenderMembers();
    });

    async function fetchAndRenderMembers() {
        try {
            displayContainer.innerHTML = ""; // Clear existing content
            displayContainer.innerHTML = "<p>Loading...</p>"; // Show loading placeholder

            const members = await fetchMembers();
            renderMemberCards(members);
        } catch (error) {
            console.error("Error:", error);
            displayContainer.innerHTML = "<p>Error loading members</p>"; // Show error message
        }
    }

    // Initial load
    fetchAndRenderMembers();
});
