document.addEventListener("DOMContentLoaded", function () {
    let gridButton = document.getElementById("grid");
    let listButton = document.getElementById("list");
    let displayContainer = document.querySelector(".display");
    let gridElements = document.querySelectorAll(".grid-only");

    async function fetchMembers() {
        try {
            return await (await fetch("data/members.json")).json();
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        displayContainer.innerHTML = "";
        members.forEach(member => {
            let memberCard = document.createElement("div");
            memberCard.classList.add("member-card");
    
            let memberDetails = document.createElement("div");
            memberDetails.classList.add("member-details");
    
            let nameHeading = document.createElement("h2");
            nameHeading.textContent = member.name;
    
            let addressParagraph = document.createElement("p");
            addressParagraph.textContent = member.address;
    
            let phoneParagraph = document.createElement("p");
            phoneParagraph.textContent = "Phone: " + member.phone;
    
            let websiteParagraph = document.createElement("p");
            let websiteLink = document.createElement("a");
            websiteLink.href = member.website;
            websiteLink.textContent = "Website";
            websiteParagraph.appendChild(websiteLink);
    
            memberDetails.appendChild(nameHeading);
            memberDetails.appendChild(addressParagraph);
            memberDetails.appendChild(phoneParagraph);
            memberDetails.appendChild(websiteParagraph);
    
            memberCard.appendChild(memberDetails);
    
            displayContainer.appendChild(memberCard);
        });
    }   

    gridButton.addEventListener("click", function () {
        displayContainer.classList.remove("list-view");
        displayContainer.classList.add("grid-view");
        gridElements.forEach(element => {
            element.style.display = "block";
        });
        fetchMembers().then(members => {
            displayMembers(members);
        });
    });

    listButton.addEventListener("click", function () {
        displayContainer.classList.remove("grid-view");
        displayContainer.classList.add("list-view");
        gridElements.forEach(element => {
            element.style.display = "none";
        });
        fetchMembers().then(members => {
            displayMembers(members);
        });
    });

    // Initially set to grid view
    fetchMembers().then(members => {
        displayMembers(members);
        displayContainer.classList.add("grid-view");
    });
});