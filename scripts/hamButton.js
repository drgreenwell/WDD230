/* hamButton.js */

const e=document.querySelector("#menu"),n=document.querySelector("nav"),o=document.querySelector(".map");e.addEventListener("click",()=>{n.classList.toggle("open"),e.classList.toggle("open"),n.classList.contains("open")?o.style.display="none":o.style.display=""});