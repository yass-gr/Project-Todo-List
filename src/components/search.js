import "../styles.css";

let currentTab = "todos";

export function initSearch(groups, todosContainer, createGroupCard) {
    const searchInput = document.getElementById("search");

    function handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        console.log("Search input, currentTab:", currentTab, "query:", query);

        if (currentTab === "todos") {
            searchTodos(groups, todosContainer, query);
        } else {
            searchNotes(query);
        }
    }

    searchInput.addEventListener("input", handleSearch);
    searchInput.addEventListener("change", handleSearch);
}

function searchTodos(groups, todosContainer, query) {
    groups.forEach((group) => {
        const groupName = group.name.toLowerCase();
        const taskContents = group.tasks.map(t => t.content.toLowerCase());

        const matchesGroup = groupName.includes(query);
        const matchesTasks = taskContents.some(content => content.includes(query));

        const card = Array.from(todosContainer.children).find(el => {
            const title = el.querySelector(".group-title-text");
            return title && title.textContent.toLowerCase() === groupName;
        });

        if (card) {
            if (query === "" || matchesGroup || matchesTasks) {
                card.style.display = ""; // Reset to CSS default (flex/block layout)
            } else {
                card.style.display = "none";
            }
        }
    });
}

function searchNotes(query) {
    console.log("Searching notes with query:", query);
    const noteCards = document.querySelectorAll(".note-card");
    console.log("Found note cards:", noteCards.length);
    noteCards.forEach(card => {
        const title = card.querySelector(".note-title")?.textContent.toLowerCase() || "";
        const content = card.querySelector(".note-content")?.textContent.toLowerCase() || "";

        const matches = title.includes(query) || content.includes(query);
        console.log("Card:", title, "matches:", matches);

        if (query === "" || matches) {
            card.style.display = ""; // Reset to CSS default (flex)
        } else {
            card.style.display = "none";
        }
    });
}

export function setSearchTab(tab) {
    console.log("setSearchTab called with:", tab);
    currentTab = tab;
    const searchInput = document.getElementById("search");
    if (tab === "todos") {
        searchInput.placeholder = "Search for tasks";
    } else {
        searchInput.placeholder = "Search for notes";
    }
    searchInput.value = "";
}
