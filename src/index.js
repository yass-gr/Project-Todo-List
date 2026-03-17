import "./styles.css";
import { initTodoLogic } from "./logic/todo/todo.js";
import { initNoteLogic } from "./logic/note/logic.js";
import { setSearchTab } from "./components/search.js";

const todosBtn = document.getElementById("todos");
const notesBtn = document.getElementById("notes");
const todosIcon = todosBtn.querySelector("span");
const notesIcon = notesBtn.querySelector("span");

const sliderTrack = document.getElementById("slider-track");

let todoApp = null;
let noteApp = null;

document.addEventListener('DOMContentLoaded', () => {
    const todosContainer = document.getElementById("todos-container");
    const notesContainer = document.getElementById("notes-container");
    
    todoApp = initTodoLogic(todosContainer);
    noteApp = initNoteLogic(notesContainer);
    
    initUI();
    setSearchTab("todos");
    
    sliderTrack.style.transform = "translateX(0%)";
});

function initUI() {
    const addBtn = document.getElementById("add-btn");
    const modalOverlay = document.getElementById("modal-overlay");
    const closeModal = document.getElementById("close-modal");
    const addGroupBtn = document.getElementById("add-group-btn");
    const addTaskBtn = document.getElementById("add-task-btn");
    const groupNameInput = document.getElementById("group-name-input");
    const taskInput = document.getElementById("task-input");
    const taskListPreview = document.getElementById("task-list-preview");

    const modalTitle = document.getElementById("modal-title");
    const todoInputSection = document.getElementById("todo-input-section");
    const noteInputSection = document.getElementById("note-input-section");
    const noteContentInput = document.getElementById("note-content-input");

    let activeTab = "todos";

    let tempTasks = [];

    function renderTaskPreview() {
        taskListPreview.innerHTML = "";
        tempTasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-preview-item";
            taskItem.innerHTML = `
                <span class="mdi mdi-drag"></span>
                <span>${task}</span>
                <button class="task-preview-delete" data-index="${index}">
                    <span class="mdi mdi-close"></span>
                </button>
            `;
            taskListPreview.appendChild(taskItem);
        });

        taskListPreview.querySelectorAll(".task-preview-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                tempTasks.splice(idx, 1);
                renderTaskPreview();
            });
        });
    }

    todosBtn.addEventListener("click", () => {
        todosIcon.classList.add("tabSelected");
        notesIcon.classList.remove("tabSelected");
        sliderTrack.style.transform = "translateX(0%)";
        setSearchTab("todos");
        activeTab = "todos";
    });

    notesBtn.addEventListener("click", () => {
        notesIcon.classList.add("tabSelected");
        todosIcon.classList.remove("tabSelected");
        sliderTrack.style.transform = "translateX(-100%)";
        setSearchTab("notes");
        activeTab = "notes";
    });

    addBtn.addEventListener("click", () => {
        groupNameInput.value = "";
        taskInput.value = "";
        noteContentInput.value = "";
        tempTasks = [];
        renderTaskPreview();
        
        if (activeTab === "todos") {
            modalTitle.textContent = "Add list";
            todoInputSection.style.display = "block";
            noteInputSection.style.display = "none";
        } else {
            modalTitle.textContent = "Add note";
            todoInputSection.style.display = "none";
            noteInputSection.style.display = "block";
        }
        
        modalOverlay.classList.add("active");
    });

    closeModal.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task) {
            tempTasks.push(task);
            taskInput.value = "";
            renderTaskPreview();
        }
    });

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const task = taskInput.value.trim();
            if (task) {
                tempTasks.push(task);
                taskInput.value = "";
                renderTaskPreview();
            }
        }
    });

    addGroupBtn.addEventListener("click", () => {
        const title = groupNameInput.value.trim();
        
        if (title) {
            if (activeTab === "todos") {
                todoApp.addGroup(title, tempTasks);
            } else {
                const content = noteContentInput.value.trim();
                noteApp.addNote(title, content);
            }
            
            modalOverlay.classList.remove("active");
        }
    });
}
