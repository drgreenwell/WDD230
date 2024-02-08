/* bomButton.js */

const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // Fixed: added '#' to select by ID

button.addEventListener('click', function() {
    // Check if the input is not blank
    if (input.value.trim() !== "") {
        // Create li element
        const listItem = document.createElement('li');

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "❌";
        deleteButton.classList.add('delete');

        // Populate li element with input value
        listItem.textContent = input.value;

        // Append delete button to li element
        listItem.appendChild(deleteButton);

        // Append li element to the unordered list
        list.appendChild(listItem);

        // Add event listener to delete button
        deleteButton.addEventListener('click', function() {
            listItem.remove();
        });

        // Send focus to the input element
        input.focus();

        // Clear input value
        input.value = "";
    } else {
        // If input is blank, provide a message or do nothing
        input.focus();
        // Example message: alert("Please enter a value before adding.");
    }
});

button.addEventListener('click', () => {
    // Your code for handling the click event goes here
    console.log("Button clicked!"); // Example: log a message when the button is clicked
});
