/* members.js */

window.onload = function() {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => displayMembers(data));

    function displayMembers(members) {
        const membersSection = document.getElementById('members');
        membersSection.innerHTML = '';

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            /* Adjust the following as per the structure of your JSON data */
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}">${member.website}</a></p>
                <p>Membership Level: ${member.membership_level}</p>
                <!-- Add more information as needed -->
            `;
            membersSection.appendChild(memberCard);
        });
    }
};