export class Note {
    constructor(name, content = "") {
        this.name = name;
        this.content = content;
        this.createdAt = new Date();
    }

    edit(newContent) {
        this.content = newContent;
    }

    getChCount() {
        return this.content.length;
    }

    getWordCount() {
        return this.content.trim() === "" ? 0 : this.content.trim().split(/\s+/).length;
    }

    toObject() {
        return {
            name: this.name,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}
