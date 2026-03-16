import { createNoteCard } from "../../components/note.js";
import { Note } from "./note.js";
import { loadNotes, saveNotes } from "../../data/storage.js";

const storedNotes = loadNotes();
let notes = storedNotes 
    ? storedNotes.map(n => Object.assign(new Note(n.name, n.content), { createdAt: new Date(n.createdAt) }))
    : [];

export function initNoteLogic(notesContainer) {
    function renderNotes() {
        notesContainer.innerHTML = "";
        if (notes.length === 0) {
            notesContainer.innerHTML = '<div class="empty-state">nothing here</div>';
            return;
        }
        notes.forEach((note, index) => {
            const card = createNoteCard(note, () => {
                notes = notes.filter(n => n !== note);
                saveNotes(notes);
                renderNotes();
            });
            notesContainer.appendChild(card);
        });
    }

    renderNotes();

    return {
        addNote: (name, content = "") => {
            const newNote = new Note(name, content);
            notes.push(newNote);
            saveNotes(notes);
            renderNotes();
        },
        deleteNote: (noteToDelete) => {
            notes = notes.filter(n => n !== noteToDelete);
            saveNotes(notes);
            renderNotes();
        },
        getNotes: () => notes
    };
}

export { notes };
