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

    function renderMembersInList(members) {
        displayArea.innerHTML = "";
        members.forEach(member => {
            let memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

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

            memberCard.appendChild(name);
            memberCard.appendChild(address);
            memberCard.appendChild(phone);
            memberCard.appendChild(website);

            displayArea.appendChild(memberCard);
        });
    }

    listButton.addEventListener("click", function () {
        displayArea.classList.remove("grid-view");
        displayArea.classList.add("list-view");
        fetchMembers().then(members => {
            renderMembersInList(members);
        });
    });

    // Initial loading in grid view
    let membersData;
    fetchMembers().then(members => {
        membersData = members;
        renderMembersInList(membersData);
    }).catch(error => {
        console.error("Error:", error);
    });

    displayArea.classList.add("list-view");
});
