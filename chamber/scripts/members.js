document.addEventListener("DOMContentLoaded", function() {
    const membersContainer = document.getElementById("members");
    const gridButton = document.getElementById("grid-button");
    const listButton = document.getElementById("list-button");
    let isGridView = true; // Flag to track the current view mode

    // Fetch member data from members.json
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Function to generate HTML for a single member in grid view
            function generateMemberHTMLGrid(member) {
                return `
                    <div class="member">
                        <img src="images/${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Website</a></p>
                        <p>Membership Level: ${member.membership_level}</p>
                        <p>${member.additional_info}</p>
                    </div>
                `;
            }

            // Function to generate HTML for a single member in list view
            function generateMemberHTMLList(member) {
                return `
                    <div class="member-list">
                        <p>${member.name} ${member.address} ${member.phone} <a href="${member.website}" target="_blank">Website</a> ${member.membership_level} ${member.additional_info}</p>
                    </div>
                `;
            }

            // Function to render members
            function renderMembers() {
                membersContainer.innerHTML = "";
                data.forEach(member => {
                    const memberHTML = isGridView ? generateMemberHTMLGrid(member) : generateMemberHTMLList(member);
                    membersContainer.insertAdjacentHTML("beforeend", memberHTML);
                });
            }

            // Initial rendering
            renderMembers();

            // Toggle between grid and list view
            gridButton.addEventListener("click", function() {
                if (!isGridView) {
                    isGridView = true;
                    renderMembers();
                }
            });

            listButton.addEventListener("click", function() {
                if (isGridView) {
                    isGridView = false;
                    renderMembers();
                }
            });
        })
        .catch(error => console.error("Error fetching member data:", error));
});