import "../styles.css";

export function createNoteCard(note, onDelete) {
    console.log("createNoteCard called with:", note);
    const card = document.createElement("div");
    card.className = "note-card";
    
    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "note-delete-btn";
    deleteBtn.innerHTML = '<span class="mdi mdi-close"></span>';
    deleteBtn.addEventListener("click", () => {
        if (onDelete && typeof onDelete === 'function') {
            onDelete();
        }
    });

    const noteTitle = document.createElement("div");
    noteTitle.className = "note-title";
    noteTitle.contentEditable = true;
    noteTitle.textContent = note.name || "Untitled Note";

    const noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.contentEditable = true;
    noteContent.textContent = note.content || "";

    card.appendChild(deleteBtn);
    card.appendChild(noteTitle);
    card.appendChild(noteContent);

    // Save title changes
    noteTitle.addEventListener("blur", () => {
        note.name = noteTitle.textContent || "Untitled Note";
        console.log("Title updated to:", note.name);
    });

    // Save content changes
    noteContent.addEventListener("blur", () => {
        note.edit(noteContent.textContent);
        console.log("Content updated to:", note.content);
    });

    // Optional: Handle Enter key to blur
    noteTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            noteTitle.blur();
        }
    });

    noteContent.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            noteContent.blur();
        }
    });

    console.log("Created note card:", card);
    return card;
}