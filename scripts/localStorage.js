/* localStorage.js */

/* Get the visit count from localStorage or initialize it to 0 if not exists */
let visitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 0;
}
/* Increment visit count */
visitCount++;
/* Update the visit count display */
document.getElementById('visitCount').textContent = visitCount;
/* Store the updated visit count in localStorage */
localStorage.setItem('visitCount', visitCount);
