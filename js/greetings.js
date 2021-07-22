const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const ellipsisForm = document.querySelector("#ellipsis-form");
const ellipsis = ellipsisForm.querySelector("input");
const renameBtn = document.querySelector("#renameBtn");
const savedUserName = localStorage.getItem("username");
// 시간별 인사말
const date = new Date();
const currentHour = date.getHours();

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
  // 시간대 별 인사
  if (currentHour >= 6 && currentHour < 12) {
    greeting.innerText = `Good morning, ${username}`;
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting.innerText = `Good afternoon, ${username}`;
  } else if (currentHour >= 17 && currentHour < 20) {
    greeting.innerText = `Good evening, ${username}`;
  } else {
    greeting.innerText = `Good night, ${username}`;
  }
  greeting.classList.remove("hidden");
  ellipsisForm.classList.remove("hidden");
  ellipsis.addEventListener("click", showModifyUsername);
  renameBtn.addEventListener("submit", modifyUsername);
  // renameBtn.classList.remove("hidden");
}

function showModifyUsername(event) {
  renameBtn.classList.toggle("hidden");
}

// modify username (from localStorage)
function modifyUsername(event) {
  event.preventDefault();
  greeting.classList.add("hidden");
  ellipsisForm.classList.add("hidden");
  renameBtn.classList.add("hidden");
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", logInSubmit);
}
