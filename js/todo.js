const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");
const savedTodos = localStorage.getItem("todos");

let todos = [];

// li id는 newTodoObj.id(Date값)이고
// li 내부 span의 값은 newTodoObj.text(할 일)
function paintTodos(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  //   입력칸
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "checkbox";
  input.id = newTodoObj.id;

  if (newTodoObj.checked) {
    input.checked = true;
  }
  const label = document.createElement("label");
  label.innerText = newTodoObj.text;
  //   삭제 버튼
  const button1 = document.createElement("button");
  button1.innerText = "Delete";
  button1.addEventListener("click", deleteTodo);
  //   수정 버튼
  //   const button2 = document.createElement("button");
  //   button2.innerText = "Edit";
  //   button2.id = "editBtn";
  //   button2.addEventListener("click", editTodo);

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button1);
  //   li.appendChild(button2);

  todoList.appendChild(li);
}

function deleteTodo(event) {
  const li = event.target.parentElement;

  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    checked: false,
  };
  todos.push(newTodoObj);
  paintTodos(newTodoObj);
  saveTodos();
}

function saveTodos() {
  //   checked 반영하기
  const checkboxs = document.querySelectorAll("input[name=checkbox]");
  for (let i = 0; i < checkboxs.length; i++) {
    todos[i].checked = checkboxs[i].checked;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoForm.addEventListener("submit", handleTodoSubmit);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodos);
}

// 새로고침 하기 전에 현재 상태 저장
window.addEventListener("beforeunload", saveTodos);

// // 할 일 수정하기
// function editTodo(event) {
//   // edit 버튼 잠시 사라지게
//   const li = event.target.parentElement;
//
//   const editBtn = li.querySelector("#editBtn");
//   editBtn.disabled = true;
//   //   텍스트 수정을 위한 틀 만들기
//   const editForm = document.querySelector(".edit-form");
//   const prevTodoText = li.querySelector("label").innerText;
//   const input = document.createElement("input");
//   input.type = "text";
//   input.placeholder = prevTodoText;
//   editForm.appendChild(input);
//   li.appendChild(input);
//

//   //   텍스트 수정 반영하기
//   editForm.addEventListener("submit", handleTodoSubmit);
//   //   editForm.addEventListener("submit", function (e) {
//   //     e.preventDefault();
//   //     const editTodoText = input.value;
//   //
//   //   });
//   //   완료되면 다시 editBtn 생김
//   editBtn.disabled = false;
// }
