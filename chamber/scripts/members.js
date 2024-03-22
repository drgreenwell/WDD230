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

            let image = document.createElement("img");
            image.src = "images/" + member.image;
            image.alt = member.name;

            let memberDetails = document.createElement("div");
            memberDetails.classList.add("member-details");

            let name = document.createElement("h2");
            name.textContent = member.name;

            let contactInfo = document.createElement("p");
            contactInfo.textContent = `${member.name} - ${member.address}, ${member.city}, ${member.state} ${member.zip}
Phone: ${member.phone} - Website: ${member.website}`;

            memberDetails.appendChild(name);
            memberDetails.appendChild(contactInfo);

            memberCard.appendChild(image);
            memberCard.appendChild(memberDetails);

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
