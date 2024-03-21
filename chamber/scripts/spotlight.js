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
        members.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.classList.add('spotlight');

            const name = document.createElement('h3');
            name.textContent = member.name;

            const address = document.createElement('p');
            address.textContent = member.address;

            const phone = document.createElement('p');
            phone.textContent = 'Phone: ' + member.phone;

            const website = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = 'Website';
            website.appendChild(websiteLink);

            spotlight.appendChild(name);
            spotlight.appendChild(address);
            spotlight.appendChild(phone);
            spotlight.appendChild(website);

            spotlightSection.appendChild(spotlight);
        });
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
