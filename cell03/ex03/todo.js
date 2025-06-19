window.onload = function () {
  loadTodos();
};

function addTodo() {
  const task = prompt("Enter a TO DO:");
  if (task) {
    createTodo(task);
    saveTodos();
  }
}

function createTodo(text) {
  const todo = document.createElement("div");
  todo.className = "todo";
  todo.textContent = text;

  todo.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      todo.remove();
      saveTodos();
    }
  };

  const list = document.getElementById("ft_list");
  list.insertBefore(todo, list.firstChild); // แทรกด้านบนสุด
}

function saveTodos() {
  const list = document.getElementById("ft_list");
  const todos = [];
  for (let i = 0; i < list.children.length; i++) {
    todos.push(list.children[i].textContent);
  }
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("todos="));
  if (cookie) {
    const todos = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    todos.forEach(createTodo);
  }
}