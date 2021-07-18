const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const renameBtn = document.querySelector("#renameBtn");
const savedUserName = localStorage.getItem("username");

// localStorage username 검사
if (savedUserName === null) {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", logInSubmit);
} else {
  greetings(savedUserName);
}

// login
function logInSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem("username", username);
  loginForm.classList.add("hidden");
  greetings(username);
}

// greeting
function greetings(username) {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove("hidden");
  renameBtn.classList.remove("hidden");
  renameBtn.addEventListener("submit", modifyUsername);
}

// modify username (from localStorage) - 미완성
function modifyUsername() {
  localStorage.removeItem("username");
  // preventDefault()를 없애서 브라우저 새로고침 되도록 함
  // 전부 새로고침하지 않고 이름만 바꿀 수는 없을까?
}
