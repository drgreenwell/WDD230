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

    function renderMembers(members) {
        displayArea.innerHTML = "";
        members.forEach(member => {
            let memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            let name = document.createElement("h2");
            name.textContent = member.name;

            let address = document.createElement("p");
            address.textContent = `${member.address} - ${member.city}, ${member.state} ${member.zip}`;

            let contact = document.createElement("p");
            contact.textContent = `Phone: ${member.phone} - Website: `;
            
            let websiteLink = document.createElement("a");
            websiteLink.href = member.website;
            websiteLink.textContent = "Visit Website";
            websiteLink.target = "_blank";
            contact.appendChild(websiteLink);

            memberCard.appendChild(name);
            memberCard.appendChild(address);
            memberCard.appendChild(contact);

            displayArea.appendChild(memberCard);
        });
    }

    gridButton.addEventListener("click", function () {
        displayArea.classList.remove("list-view");
        displayArea.classList.add("grid-view");
        fetchMembers().then(members => {
            renderMembers(members);
        });
    });

    listButton.addEventListener("click", function () {
        displayArea.classList.remove("grid-view");
        displayArea.classList.add("list-view");
        fetchMembers().then(members => {
            renderMembers(members);
        });
    });

    let membersData;
    fetchMembers().then(members => {
        membersData = members;
        renderMembers(membersData);
    }).catch(error => {
        console.error("Error:", error);
    });

    displayArea.classList.add("grid-view");
});