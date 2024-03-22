document.addEventListener("DOMContentLoaded", function () {
    let gridButton = document.getElementById("grid");
    let listButton = document.getElementById("list");
    let displayArea = document.querySelector(".display");

    async function fetchMembers() {
        try {
            return await (await fetch("data/members.json")).json();
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        displayArea.innerHTML = "";
        members.forEach(member => {
            let memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            let memberDetails = document.createElement("div");
            memberDetails.classList.add("member-details");

            let nameAndAddress = document.createElement("div");
            let name = document.createElement("h2");
            name.textContent = member.name;
            let address = document.createElement("p");
            address.textContent = member.address;

            nameAndAddress.appendChild(name);
            nameAndAddress.appendChild(document.createTextNode(" - "));
            nameAndAddress.appendChild(address);

            let phone = document.createElement("p");
            phone.textContent = "Phone: " + member.phone;

            let website = document.createElement("p");
            let websiteLink = document.createElement("a");
            websiteLink.href = member.website;
            websiteLink.textContent = "Website";
            website.appendChild(websiteLink);

            memberDetails.appendChild(nameAndAddress);
            memberDetails.appendChild(phone);
            memberDetails.appendChild(website);

            let image = document.createElement("img");
            image.src = "images/" + member.image;
            image.alt = member.name;

            memberCard.appendChild(image);
            memberCard.appendChild(memberDetails);

            displayArea.appendChild(memberCard);
        });
    }

    gridButton.addEventListener("click", function () {
        displayArea.classList.remove("list-view");
        displayArea.classList.add("grid-view");
        fetchMembers().then(members => {
            displayMembers(members);
        });
    });

    listButton.addEventListener("click", function () {
        displayArea.classList.remove("grid-view");
        displayArea.classList.add("list-view");
        fetchMembers().then(members => {
            displayMembers(members);
        });
    });

    let initialMembers;
    fetchMembers().then(members => {
        initialMembers = members;
        displayMembers(initialMembers);
    }).catch(error => {
        console.error("Error:", error);
    });

    displayArea.classList.add("grid-view");
});
