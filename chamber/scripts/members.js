document.addEventListener("DOMContentLoaded", function () {
    let e = document.getElementById("grid"),
        t = document.getElementById("list"),
        n = document.querySelector(".display");

    async function a() {
        try {
            return await (await fetch("data/members.json")).json()
        } catch (e) {
            console.error("Error fetching members:", e)
        }
    }

    function i(e) {
        n.innerHTML = "";
        e.forEach(e => {
            let t = document.createElement("div");
            t.classList.add("member-card");
            let a = document.createElement("img");
            a.src = "images/" + e.image, a.alt = e.name;
            let i = document.createElement("div");
            i.classList.add("member-details");
            let d = document.createElement("h2");
            d.textContent = e.name;
            let r = document.createElement("p");
            r.textContent = e.address;
            let l = document.createElement("p");
            l.textContent = "Phone: " + e.phone;
            let s = document.createElement("p"),
                c = document.createElement("a");
            c.href = e.website, c.textContent = "Website", s.appendChild(c), i.appendChild(d), i.appendChild(r), i.appendChild(l), i.appendChild(s), t.appendChild(a), t.appendChild(i), n.appendChild(t);
            
            // Adding dashes between each h2 and p in list mode
            if (n.classList.contains("list-view")) {
                n.innerHTML += ` - ${d.textContent} - ${r.textContent} - ${l.textContent} - `;
            }
        })
    }
    e.addEventListener("click", function () {
        n.classList.remove("list-view"), n.classList.add("grid-view"), a().then(e => {
            i(e)
        })
    }), t.addEventListener("click", function () {
        n.classList.remove("grid-view"), n.classList.add("list-view"), a().then(e => {
            i(e)
        })
    });
    let d;
    a().then(e => {
        i(d = e)
    }).catch(e => {
        console.error("Error:", e)
    }), n.classList.add("grid-view")
});
