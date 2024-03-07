// Fetch JSON data and generate list items
document.addEventListener("DOMContentLoaded", function() {
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const display = document.querySelector("article");

    // Fetch member data from members.json
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Function to generate HTML for a single member
            function generateMemberHTML(member) {
                return `
                    <section>
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Website</a></p>
                        <p>Membership Level: ${member.membership_level}</p>
                        <p>${member.additional_info}</p>
                    </section>
                `;
            }

            // Function to render members
            function renderMembers(view) {
                display.innerHTML = ""; // Clear previous content
                data.forEach(member => {
                    const memberHTML = generateMemberHTML(member);
                    display.insertAdjacentHTML("beforeend", memberHTML);
                });

                // Add class to display based on view
                display.classList.add(view);
            }

            // Initial rendering based on default view
            renderMembers("grid");

            // Toggle between grid and list view
            gridButton.addEventListener("click", () => renderMembers("grid"));
            listButton.addEventListener("click", () => renderMembers("list"));
        })
        .catch(error => console.error("Error fetching member data:", error));
});