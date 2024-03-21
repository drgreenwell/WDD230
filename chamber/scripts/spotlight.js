document.addEventListener('DOMContentLoaded', function() {
    const spotlightSection = document.querySelector('.spotlights');
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

    // Filter members with silver or gold status
    function filterMembersByStatus(members) {
        return members.filter(member => member.membership_level === "Silver" || member.membership_level === "Gold");
    }

    // Randomly select spotlight members
    function selectSpotlightMembers(members, count) {
        const selectedMembers = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * members.length);
            selectedMembers.push(members[randomIndex]);
            members.splice(randomIndex, 1); // Remove selected member to avoid duplication
        }
        return selectedMembers;
    }

    // Generate spotlight business elements
    function generateSpotlightBusinesses(members) {
        spotlightSection.innerHTML = ''; // Clear previous content

        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid-view'); // Add the grid-view class

        members.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.classList.add('member-card'); // Update class to match CSS

            const spotlightImage = document.createElement('img');
            spotlightImage.src = 'images/' + member.image;
            spotlightImage.alt = member.name;

            const spotlightDetails = document.createElement('div');
            spotlightDetails.classList.add('member-details'); // Update class to match CSS

            const spotlightName = document.createElement('h2');
            spotlightName.textContent = member.name;

            const spotlightAddress = document.createElement('p');
            spotlightAddress.textContent = member.address;

            const spotlightPhone = document.createElement('p');
            spotlightPhone.textContent = 'Phone: ' + member.phone;

            const spotlightWebsite = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = 'Website';
            spotlightWebsite.appendChild(websiteLink);

            spotlightDetails.appendChild(spotlightName);
            spotlightDetails.appendChild(spotlightAddress);
            spotlightDetails.appendChild(spotlightPhone);
            spotlightDetails.appendChild(spotlightWebsite);

            spotlight.appendChild(spotlightImage);
            spotlight.appendChild(spotlightDetails);

            gridContainer.appendChild(spotlight); // Append spotlight to the grid container
        });

        spotlightSection.appendChild(gridContainer); // Append grid container to the spotlight section
    }


    // Fetch members data and populate spotlight section
    fetchMembers()
        .then(data => {
            const silverGoldMembers = filterMembersByStatus(data);
            const spotlightMembers = selectSpotlightMembers(silverGoldMembers, 3); // Select 3 spotlight members
            generateSpotlightBusinesses(spotlightMembers);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
