import { createGroupCard } from "../../components/card.js";
import { Group } from "./group.js";
import { initSearch } from "../../components/search.js";
import { loadTodos, saveTodos } from "../../data/storage.js";

const storedTodos = loadTodos();
let todos = storedTodos 
    ? storedTodos.map(t => new Group(t.name, t.tasks))
    : [];

export function initTodoLogic(todosContainer) {
    function renderGroups() {
        todosContainer.innerHTML = "";
        if (todos.length === 0) {
            todosContainer.innerHTML = '<div class="empty-state">nothing here</div>';
            return;
        }
        todos.forEach((group) => {
            const card = createGroupCard(group, onGroupToggle, () => {
                todos = todos.filter(g => g !== group);
                saveTodos(todos);
                renderGroups();
            }, () => saveTodos(todos));
            todosContainer.appendChild(card);
        });
    }

    function onGroupToggle() {
        todos.sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
        saveTodos(todos);
        renderGroups();
    }

    renderGroups();

    initSearch(todos, todosContainer, createGroupCard);

    return {
        addGroup: (groupName, tasks) => {
            const taskObjects = tasks.map(t => ({ content: t, status: "pending" }));
            const newGroup = new Group(groupName, taskObjects);
            todos.push(newGroup);
            saveTodos(todos);
            renderGroups();
        },
        getTodos: () => todos
    };
}

export { todos };
