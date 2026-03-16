import "../styles.css";

export function createGroupCard(group, onGroupToggle = null, onDelete = null) {
    const card = document.createElement("div");
    card.className = "group-card";

    const groupHeader = document.createElement("div");
    groupHeader.className = "group-item";

    const groupCheckbox = document.createElement("input");
    groupCheckbox.type = "checkbox";
    groupCheckbox.className = "task-checkbox group-checkbox";
    groupCheckbox.checked = group.completed;

    const groupTitle = document.createElement("span");
    groupTitle.className = "task-text group-title-text";
    groupTitle.textContent = group.name;
    groupTitle.contentEditable = true;

    const expandBtn = document.createElement("button");
    expandBtn.className = "expand-btn";
    expandBtn.innerHTML = '<span class="mdi mdi-chevron-down"></span>';

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "task-delete group-delete";
    deleteBtn.innerHTML = '<span class="mdi mdi-close"></span>';

    groupHeader.appendChild(groupCheckbox);
    groupHeader.appendChild(groupTitle);
    groupHeader.appendChild(expandBtn);
    groupHeader.appendChild(deleteBtn);
    card.appendChild(groupHeader);

    let isExpanded = true;

    function updateCard() {
        groupCheckbox.checked = group.completed;
        card.classList.toggle("completed", group.completed);
    }

    function renderTasks() {
        const existingTasks = card.querySelectorAll(".task-nested");
        existingTasks.forEach(task => task.remove());

        group.tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "group-item task-nested";
            taskItem.dataset.index = index;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox task-checkbox-item";
            checkbox.checked = task.status === "completed";

            const taskText = document.createElement("span");
            taskText.className = "task-text";
            taskText.textContent = task.content;
            taskText.contentEditable = true;
            taskText.dataset.index = index;
            if (task.status === "completed") {
                taskText.classList.add("completed");
            }

            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.className = "task-delete task-delete-item";
            deleteTaskBtn.innerHTML = '<span class="mdi mdi-close"></span>';
            deleteTaskBtn.dataset.index = index;

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteTaskBtn);
            card.appendChild(taskItem);

            checkbox.addEventListener("change", (e) => {
                const idx = parseInt(e.target.closest(".task-nested").dataset.index);
                group.toggleTask(idx);
                group.sortTasks();
                renderTasks();
                updateCard();
                if (onGroupToggle) onGroupToggle(group);
            });

            taskText.addEventListener("blur", (e) => {
                const idx = parseInt(e.target.dataset.index);
                group.editTask(idx, e.target.textContent);
            });

            taskText.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                }
            });

            deleteTaskBtn.addEventListener("click", (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                group.deleteTask(idx);
                renderTasks();
                updateCard();
            });
        });

        const nestedTasks = card.querySelectorAll(".task-nested");
        nestedTasks.forEach((task) => {
            task.style.display = isExpanded ? "flex" : "none";
        });
    }

    groupCheckbox.addEventListener("change", () => {
        group.toggleGroup();
        renderTasks();
        updateCard();
        if (onGroupToggle) onGroupToggle(group);
    });

    groupTitle.addEventListener("blur", () => {
        group.editName(groupTitle.textContent);
    });

    groupTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            groupTitle.blur();
        }
    });

    deleteBtn.addEventListener("click", () => {
        if (onDelete && typeof onDelete === 'function') {
            onDelete();
        } else {
            card.remove(); // Fallback for previous usages if any
        }
    });

    expandBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;
        const nestedTasks = card.querySelectorAll(".task-nested");
        nestedTasks.forEach((task) => {
            task.style.display = isExpanded ? "flex" : "none";
        });
        expandBtn.querySelector("span").classList.toggle("rotated");
    });

    expandBtn.querySelector("span").classList.add("rotated");

    renderTasks();
    updateCard();

    return card;
}
