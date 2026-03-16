export class Group {
    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks.map(t => ({ content: t.content || t, status: t.status || "pending" }));
    }

    get completed() {
        return this.tasks.length > 0 && this.tasks.every(task => task.status === "completed");
    }

    addTask(content) {
        this.tasks.push({ content, status: "pending" });
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    toggleTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].status = this.tasks[index].status === "completed" ? "pending" : "completed";
        }
    }

    toggleGroup() {
        const allCompleted = this.completed;
        this.tasks.forEach(task => {
            task.status = allCompleted ? "pending" : "completed";
        });
    }

    editName(newName) {
        this.name = newName;
    }

    editTask(index, newContent) {
        if (this.tasks[index]) {
            this.tasks[index].content = newContent;
        }
    }

    sortTasks() {
        const pending = this.tasks.filter(t => t.status === "pending");
        const completed = this.tasks.filter(t => t.status === "completed");
        this.tasks = [...pending, ...completed];
    }
}
