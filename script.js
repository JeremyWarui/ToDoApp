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
  toggleIcon.src = "./images/icon-sun.svg";
  if (!body.classList.contains("dark")) {
    toggleIcon.src = "./images/icon-moon.svg";
  }
}

// ----------------------drag and drop --------------------
console.log(items);
//add eventlisteners for drag and drop
items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  // item.addEventListener("dragover", dragOver);
  // item.addEventListener("dragenter", dragEnter);
  // item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", dragDrop);
});

function dragStart(ev) {
  console.log("drag started", ev.target);
  ev.dataTransfer.setData("text", ev.target);
  ev.dataTransfer.effectAllowed = "move";
}

function dragEnd(ev) {
  console.log("drag ended", ev.target);
}

// function dragOver() {
//   console.log("drag over");
// }
// function dragEnter() {
//   console.log("drag entered");
// }
// function dragLeave() {
//   console.log("drag left");
// }
// 
