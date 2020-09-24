// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

// event listners
window.addEventListener('load', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") {
        alert("Enter some text in add task section");
    } else {
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Add todo to local
        saveLocalTodos(todoInput.value);

        // Check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></li>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        completedButton.addEventListener('click', completedTodo);
        // Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></li>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list 
        todoList.appendChild(todoDiv);
        // Clear Input
        todoInput.value = "";
    }

}

function deleteCheck(e) {
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
        // todo.remove(); 
    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
                break;
        }
    })
}

// Chicking do i have already some task in there
function checkTodo(todosName) {
    let todos;
    if (localStorage.getItem(todosName) == null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem(todosName));
    }
    return todos;
}
function saveLocalTodos(todo) {

    let todos = checkTodo('todos');
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = checkTodo('todos');
    todos.forEach(todo => {
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></li>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        completedButton.addEventListener('click', completedTodo);
        // Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></li>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list 
        todoList.appendChild(todoDiv);
    });

    let completedTodos = checkTodo('completedTodos');

    completedTodos.forEach(completeTodo => {
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        todoDiv.classList.add("completed");
        const newTodo = document.createElement("li");
        newTodo.innerText = completeTodo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></li>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        completedButton.addEventListener('click', completedTodo);
        // Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></li>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list 
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = checkTodo('todos');
    let completedTodos = checkTodo('completedTodos');


    // Checking if todos or completed todos contains element to delete
    if (todos.includes(todo.children[0].innerText)) {
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else if (completedTodos.includes(todo.children[0].innerText)) {
        const completedTodoIndex = todo.children[0].innerText;
        completedTodos.splice(completedTodos.indexOf(completedTodoIndex), 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }
}

function completedTodo(e) {
    completedItem = e.target.parentElement;
    let todo = completedItem.children[0].innerHTML;

    let todos = checkTodo('todos');

    // local stroage of completed todos
    let completedTodos = checkTodo('completedTodos');


    // Removing completed element from todos
    if (todos.includes(todo)) {
        let indexOfTodoInTodos = todos.indexOf(todo);
        todos.splice(indexOfTodoInTodos, 1);
        // Updating Todos
        localStorage.setItem('todos', JSON.stringify(todos));

        // Adding to completedTodos
        completedTodos.push(todo);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    } else if (completedTodos.includes(todo)) {
        todos.indexOf(todo);
        let indexOfCompletedTodos = completedTodos.indexOf(todo);
        completedTodos.splice(indexOfCompletedTodos, 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));

        // Adding to totos
        todos.push(todo);
        // Updating Todos
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
