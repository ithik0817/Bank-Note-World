const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuPkEgO_KWY_xSJNh9R4YN05b6nWZyen4sGmO7avANyr1lwaTJNeNuJm--3pfmY0_XWWsh0EcmlKaR/pub?output=csv";

fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").slice(1);
        const notes = rows.map(row => row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g))
            .filter(cols => cols);

        if (window.location.pathname.includes("note.html")) {
            const urlParams = new URLSearchParams(window.location.search);
            const noteId = urlParams.get("id");
            const note = notes.find(cols => cols[0] === noteId);

            if (note) {
                document.getElementById("note-title").textContent = note[1];
                document.getElementById("note-image").src = note[2];
                document.getElementById("note-description").textContent = note[3];
                document.getElementById("note-denomination").textContent = note[4];
                document.getElementById("note-year").textContent = note[5];
                document.getElementById("note-serial").textContent = note[6];
                document.getElementById("note-signed").textContent = note[7];
                document.getElementById("note-plate").textContent = note[8];
            } else {
                document.body.innerHTML = "<h1>Banknote not found</h1>";
            }
        } else {
            const container = document.getElementById("banknote-list");
            notes.forEach(note => {
                const div = document.createElement("div");
                div.innerHTML = `<a href="note.html?id=${note[0]}">${note[1]}</a>`;
                container.appendChild(div);
            });
        }
    })
    .catch(error => console.error("Error loading data:", error));
