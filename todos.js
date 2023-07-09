const input = document.getElementById("input-todo");
const add_btn = document.getElementById("btn");
const complete_all = document.getElementById("complete");
const clear_completed = document.getElementById("clear-completed");
const todos = document.getElementById("todos");
const tasks_left_count = document.getElementById("task-left");

let Mytodos = JSON.parse(localStorage.getItem("TODOS")) || [];
let interval;
// listening for todos
add_btn.addEventListener("click", handleClickToAdd);
document.addEventListener("click", handleClickEvents);

// for add todo icon
input.addEventListener("focus", () => {
    clearTimeout(interval)
    add_btn.style.display = "block";
})
input.addEventListener("blur", () => {
    interval = setTimeout(() => {
        add_btn.style.display = "none";
    },1000);
})

function handleClickToAdd(e) {
    // e.preventDefault();
    if (input.value.trim()) {
        let todo = input.value;
        addTodo(todo);
        input.value = "";
    }
}

// handling all click events
function handleClickEvents(e) {
    // console.log(e.target)
    if (e.target.className == "delete-img") {
        const id = e.target.id;
        deleteTodo(id);
    }
    if (e.target.className == "check-box") {
        const id = e.target.id;
        toggleStatus(id);
    }
    if (e.target.className == "completeAll") {
        commpleteAllTodos();
    }
    if (e.target.className == "clear") {
        clearCompleted();
    }
    if (e.target.id == "all" || e.target.id == "completed" || e.target.id == "uncompleted") {
        let filter = e.target.id;
        filterTodos(filter);
    }
}

// rendering the app
function renderTodos(todosRender = Mytodos) {
    let count = 0;
    if (todosRender.length > 0) {
        let str = "";
        todosRender.map(item => {
            if (!item.done) {
                count += 1;
            }
            str += `
            <li>
                <input type="checkbox" id=${item.id} ${item.done ? "checked" : null} class="check-box"/>
                <label for=${item.id}>${item.text}</label>
                <div id="delete"><img src="./images/delete.png" alt="delete" class="delete-img" id=${item.id} /></div>
            </li>
            `
        })
        todos.innerHTML = str;
    }
    else {
        todos.innerHTML = `<h3>No Todos added!</h3>`
    }
    tasks_left_count.innerHTML = `${count} task left`
}
// adding todos
function addTodo(todo) {
    const list = {
        text: todo,
        id: Date.now().toString(),
        done: false,
    }
    Mytodos.push(list);
    localStorage.setItem("TODOS", JSON.stringify(Mytodos));
    renderTodos();
}

// delete todos
function deleteTodo(id) {
    let updatedTodos = Mytodos.filter(todo => todo.id != id);
    Mytodos = updatedTodos;
    localStorage.setItem("TODOS", JSON.stringify(Mytodos));
    renderTodos();
}

// toggle todo status
function toggleStatus(id) {
    Mytodos.map(todo => {
        if (todo.id == id) {
            todo.done = !todo.done;
        }
    })
    localStorage.setItem("TODOS", JSON.stringify(Mytodos));
    renderTodos();
}

function commpleteAllTodos() {
    Mytodos.map(todo => {
        todo.done = true;
    })
    localStorage.setItem("TODOS", JSON.stringify(Mytodos));
    renderTodos();
}

function clearCompleted() {
    const updatedTodos = Mytodos.filter(todo => todo.done != true);
    Mytodos = updatedTodos;
    localStorage.setItem("TODOS", JSON.stringify(Mytodos));
    renderTodos();
}
renderTodos();

// filters - All ,Uncompleted, Completed
function filterTodos(filter) {
    console.log(filter)
    if (filter == "uncompleted") {
        const updatedTodos = Mytodos.filter(todo => todo.done != true);
        renderTodos(updatedTodos);
    }
    else if (filter == "completed") {
        const updatedTodos = Mytodos.filter(todo => todo.done == true);
        renderTodos(updatedTodos);
    }
    else {
        renderTodos();
    }
}