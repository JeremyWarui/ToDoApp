"use strict";
const checkBoxes = document.querySelectorAll(".check-box");
const body = document.querySelector("body");
const taskContainer = document.querySelector(".task-container");
const toggleIcon = document.querySelector("#toggleIcon");
const headerContain = document.querySelector("header");
// const headerImage = document.querySelector("");

// checkbox to add a strikethrough on the list
for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", function () {
    const itemSelected = checkBox.parentElement.nextElementSibling;
    itemSelected.classList.toggle("checked-item");
  });
}

// change the theme of the app whe toggle icon is clicked
// dark mode
/*
1. toggle icon when clicked change the icon to sun icon
2. change background color f the body and task container
*/

toggleIcon.addEventListener("click", changeTheme);

function changeTheme() {
  body.classList.toggle("dark");
  taskContainer.classList.toggle("dark");

  // change icon
  toggleIcon.src = "./images/icon-sun.svg";
  if (!body.classList.contains("dark")) {
    toggleIcon.src = "./images/icon-moon.svg";
  }
}
