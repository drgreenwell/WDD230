document.addEventListener('DOMContentLoaded', function() {
    const displaySection = document.querySelector('.spotlights');
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

        // Randomly select 2 to 3 premium members
        const selectedMembers = selectRandomMembers(premiumMembers);

        selectedMembers.forEach(member => {
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

    // Function to randomly select 2 to 3 members
    function selectRandomMembers(members) {
        const selectedMembers = [];
        const min = Math.min(2, members.length);
        const max = Math.min(3, members.length);

        const numMembers = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let i = 0; i < numMembers; i++) {
            const index = Math.floor(Math.random() * members.length);
            selectedMembers.push(members[index]);
            members.splice(index, 1);
        }

        return selectedMembers;
    }

    // Fetch members data and initially generate cards
    let membersData;
    fetchMembers().then(data => {
        membersData = data;
        generateMemberCards(data);
    }).catch(error => {
        console.error('Error:', error);
    });

    // Set the default view to grid
    displaySection.classList.add('grid-view');
});
