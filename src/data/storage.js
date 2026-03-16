const STORAGE_KEYS = {
    TODOS: "todos_data",
    NOTES: "notes_data"
};

export function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse todos from localStorage:", e);
            return null;
        }
    }
    return null;
}

export function saveTodos(todos) {
    const data = todos.map(group => ({
        name: group.name,
        tasks: group.tasks
    }));
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(data));
}

export function loadNotes() {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse notes from localStorage:", e);
            return null;
        }
    }
    return null;
}

export function saveNotes(notes) {
    const data = notes.map(note => ({
        name: note.name,
        content: note.content,
        createdAt: note.createdAt
    }));
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(data));
}
