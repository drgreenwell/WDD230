document.addEventListener("DOMContentLoaded", function() {
    let gridButton = document.getElementById("grid");
    let listButton = document.getElementById("list");
    let displayArea = document.querySelector(".display");

    async function fetchMembers() {
        try {
            let response = await fetch("data/members.json");
            let membersData = await response.json();
            return membersData;
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function generateMemberCards(members) {
        displayArea.innerHTML = "";
        members.forEach(member => {
            let card = document.createElement("div");
            card.classList.add("member-card");
            let image = document.createElement("img");
            image.src = "images/" + member.image;
            image.alt = member.name;
            let details = document.createElement("div");
            details.classList.add("member-details");
            let name = document.createElement("h2");
            name.textContent = member.name;
            let address = document.createElement("p");
            address.textContent = member.address;
            let phone = document.createElement("p");
            phone.textContent = "Phone: " + member.phone;
            let website = document.createElement("p");
            let websiteLink = document.createElement("a");
            websiteLink.href = member.website;
            websiteLink.textContent = "Website";
            website.appendChild(websiteLink);
            details.appendChild(name);
            details.appendChild(address);
            details.appendChild(phone);
            details.appendChild(website);
            card.appendChild(image);
            card.appendChild(details);
            displayArea.appendChild(card);
        });
    }

    gridButton.addEventListener("click", function() {
        displayArea.classList.remove("list-view");
        displayArea.classList.add("grid-view");
        fetchMembers().then(members => {
            generateMemberCards(members);
        });
    });

    listButton.addEventListener("click", function() {
        displayArea.classList.remove("grid-view");
        displayArea.classList.add("list-view");
        fetchMembers().then(members => {
            generateMemberCards(members);
        });
    });

    let members;
    fetchMembers().then(data => {
        members = data;
        generateMemberCards(members);
    }).catch(error => {
        console.error("Error:", error);
    });

    displayArea.classList.add("grid-view");
});
