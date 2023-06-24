"use strict";
const checkBoxes = document.querySelectorAll(".check-box");
const body = document.querySelector("body");
const taskContainer = document.querySelector(".task-container");
const toggleIcon = document.querySelector("#toggleIcon");
const headerContain = document.querySelector("header");
const items = document.querySelectorAll(".item");
const taskItems = document.querySelectorAll(".item p");

// checkbox to add a strikethrough on the list
for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", function () {
    const itemSelected = checkBox.parentElement.nextElementSibling;
    itemSelected.classList.toggle("checked-item");
  });
}

/* check if item has class checked-item, if it does
 * 1. set input attribute to :checked to true
 * 2. Else set to false
 */
for (const item of taskItems) {
  let checkItem = item.parentElement.firstElementChild.firstElementChild;
  item.classList.contains("checked-item")
    ? (checkItem.checked = true)
    : (checkItem.checked = false);
}

/* 

SET DEFAULT THEME AFTER RELOAD DEPENDING ON PREV SESSION 

*/
window.onload = (event) => {
  const theme = localStorage.getItem("theme");
  console.log(theme);
  if (theme === "dark"){
    body.classList.add("dark");
    taskContainer.classList.add("dark");
  } else {
    body.classList.remove("dark");
    taskContainer.classList.remove("dark");
  }  
};


// change the theme of the app whe toggle icon is clicked
// dark mode

toggleIcon.addEventListener("click", changeTheme);

function changeTheme() {
  body.classList.toggle("dark");
  taskContainer.classList.toggle("dark");

  // change icon
  toggleIcon.src = "./assets/images/icon-sun.svg";
  if (!body.classList.contains("dark")) {
    toggleIcon.src = "./assets/images/icon-moon.svg";
  }

  let current_theme;

  body.classList.contains("dark") && taskContainer.classList.contains("dark")
    ? (current_theme = "dark")
    : (current_theme = "light");

  console.log(current_theme);
  localStorage.setItem("theme", current_theme);
}

// ----------------------drag and drop --------------------
