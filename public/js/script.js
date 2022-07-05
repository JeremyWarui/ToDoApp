"use strict";
const checkBoxes = document.querySelectorAll(".check-box");
const body = document.querySelector("body");
const taskContainer = document.querySelector(".task-container");
const toggleIcon = document.querySelector("#toggleIcon");
const headerContain = document.querySelector("header");
const items = document.querySelectorAll(".item");

// checkbox to add a strikethrough on the list
for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", function () {
    const itemSelected = checkBox.parentElement.nextElementSibling;
    itemSelected.classList.toggle("checked-item");
  });
}

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
}

// ----------------------drag and drop --------------------
