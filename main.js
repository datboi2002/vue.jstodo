new Vue({
    el: '#app',
    data: {
        newTodoTitle: '',
        todos: [],
    },
    mounted() {
        this.fetchAndDisplayTodos();
    },
    methods: {
        fetchAndDisplayTodos() {
            fetch("https://futuristic-balsam-situation.glitch.me/api/todos")
                .then(response => response.json())
                .then(data => {
                    this.todos = data;
                })
                .catch(error => console.error("Error fetching todos:", error));
        },
        addNewTodo() {
            if (this.newTodoTitle.trim() === "") {
                alert("Please enter a valid todo title.");
                return;
            }

            const requestBody = JSON.stringify({ title: this.newTodoTitle });

            fetch("https://futuristic-balsam-situation.glitch.me/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            })
                .then(response => response.json())
                .then(() => {
                    this.newTodoTitle = '';
                    this.fetchAndDisplayTodos();
                })
                .catch(error => console.error("Error adding todo:", error));
        },
        completeTodo(id) {
            fetch(`https://futuristic-balsam-situation.glitch.me/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isDone: true }),
            })
                .then(response => response.json())
                .then(() => {
                    this.fetchAndDisplayTodos();
                })
                .catch(error => console.error("Error completing todo:", error));
        },
        deleteTodo(id) {
            fetch(`https://futuristic-balsam-situation.glitch.me/api/todos/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    this.fetchAndDisplayTodos();
                })
                .catch(error => console.error("Error deleting todo:", error));

            },

            toggleIsDone(id) {
                const todo = this.todos.find(todo => todo.id === id);
                if (todo) {
                    todo.isDone = !todo.isDone;
                    fetch(`https://futuristic-balsam-situation.glitch.me/api/todos/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ isDone: todo.isDone }),
                    })
                        .then(() => {
                            this.fetchAndDisplayTodos();
                        })
                        .catch(error => console.error("Error toggling todo:", error));
                }}
    }
});
