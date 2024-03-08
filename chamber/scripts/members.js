document.addEventListener('DOMContentLoaded', function() {
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');
    const displaySection = document.querySelector('.display');
    const dataUrl = 'members.json'; // Assuming members.json is the file containing your JSON data
    
    // Fetch data from JSON file
    async function fetchMembers() {
        try {
            const response = await fetch(dataUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Generate member cards
    function generateMemberCards(members) {
        if (!members) return; // Check if members is defined
        displaySection.innerHTML = ''; // Clear previous content
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            const memberImage = document.createElement('img');
            memberImage.src = member.image;
            memberImage.alt = member.name;

            const memberDetails = document.createElement('div');
            memberDetails.classList.add('member-details');

            const memberName = document.createElement('h2');
            memberName.textContent = member.name;

            const memberAddress = document.createElement('p');
            memberAddress.textContent = member.address;

            const memberPhone = document.createElement('p');
            memberPhone.textContent = 'Phone: ' + member.phone;

            const memberWebsite = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = 'Website';
            memberWebsite.appendChild(websiteLink);

            memberDetails.appendChild(memberName);
            memberDetails.appendChild(memberAddress);
            memberDetails.appendChild(memberPhone);
            memberDetails.appendChild(memberWebsite);

            memberCard.appendChild(memberImage);
            memberCard.appendChild(memberDetails);

            displaySection.appendChild(memberCard);
        });
    }

    // Toggle between grid and list view
    gridButton.addEventListener('click', function() {
        displaySection.classList.remove('list-view');
        generateMemberCards(membersData);
    });

    listButton.addEventListener('click', function() {
        displaySection.classList.add('list-view');
        generateMemberCards(membersData);
    });

    // Fetch members data and initially generate cards
    let membersData;
    fetchMembers().then(data => {
        membersData = data;
        generateMemberCards(membersData);
    }).catch(error => {
        console.error('Error:', error);
    });
});