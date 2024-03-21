document.addEventListener('DOMContentLoaded', function() {
    const displaySection = document.querySelector('.display');
    const dataUrl = 'data/members.json';
    
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
        displaySection.innerHTML = ''; // Clear previous content

        // Filter members with silver or gold status
        const premiumMembers = members.filter(member => member.status === 'silver' || member.status === 'gold');

        premiumMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            const memberImage = document.createElement('img');
            memberImage.src = 'images/' + member.image;
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

    // Fetch members data and initially generate cards
    fetchMembers().then(data => {
        generateMemberCards(data);
    }).catch(error => {
        console.error('Error:', error);
    });
});