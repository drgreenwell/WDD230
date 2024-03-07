/* form.js */

const kp1 = document.querySelector("#password");
const kp2 = document.querySelector("#confirm_password");
const message = document.querySelector("#error_message");

kp2.addEventListener("focusout", validatePasswords);

function validatePasswords() {
    if (kp1.value !== kp2.value) {
        message.textContent = "❗ Passwords DO NOT MATCH!";
        message.style.visibility = "visible";
        kp2.classList.add("password-mismatch");
        kp2.value = "";
        kp2.focus();
    } else {
        message.textContent = ""; // Clear the message
        message.style.visibility = "hidden";
        kp2.classList.remove("password-mismatch");
    }
}
