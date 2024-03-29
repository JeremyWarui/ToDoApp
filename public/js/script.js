// "use strict";
const checkBoxes = document.querySelectorAll(".check-box");
const body = document.querySelector("body");
const taskContainer = document.querySelector(".task-container");
const toggleIcon = document.querySelector("#toggleIcon");
const headerContain = document.querySelector("header");
const items = document.querySelectorAll(".item");
const taskItems = document.querySelectorAll(".item p");
const addNewItem = document.querySelector(".addNewItem");
const deleteBtns = document.querySelectorAll(".delete-button");
const newTask = document.querySelector("#newTask");
const taskList = document.querySelector(".tasks");
const clearCompletedBtn = document.querySelector("#clearCompleted");

/*
----------------------- ADD NEW ITEMS -----------------
*/
addNewItem.addEventListener("submit", (e) => {
  e.preventDefault();
  let list_item = {
    task: newTask.value,
    completed: false,
  };

  addNewItem.reset();

  fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list_item),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.task);
      const new_item = document.createElement("div");
      new_item.classList.add("item");
      new_item.setAttribute("draggable", "true");
      new_item.setAttribute("data-value", "list-item");
      new_item.innerHTML = `
  <div>
    <label class="check-container">
      <input class="check-box" type="checkbox" name="" id="" />
      <span class="checkmark"></span>
    </label>
    <p>${data.task}</p>
  </div>
  <button class="delete-button" aria-label="close-button">
    <img
      class="close-item icon"
      src="./assets/images/icon-cross.svg"
      alt="cancel icon"
    />
  </button>
`;

      taskList.appendChild(new_item);
    });
});

/*
----------------------- UPDATE COMPLETE TASKS -----------------
*/

/* 
----------------------  CHECK BOXES ---------------------
*/

// checkbox to add a strikethrough on the list
for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", function () {
    const itemSelected = checkBox.parentElement.nextElementSibling;
    itemSelected.classList.toggle("checked-item");
    // let checkedItem = itemSelected;
    // console.log(checkedItem);
    let itemId = checkBox.getAttribute("data-id");
    console.log(itemId);

    let complete_item;
    // update the task : done or not done
    itemSelected.classList.contains("checked-item")
      ? (complete_item = {
          _id: itemId,
          task: newTask.value,
          completed: true,
        })
      : (complete_item = {
          _id: itemId,
          task: newTask.value,
          completed: false,
        });

    fetch(`/update/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complete_item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
}

/* check if item has class checked-item, if it does when app loads from server
 * 1. set input attribute to :checked to true
 * 2. Else set to false
 */

for (const item of taskItems) {
  let checkItem = item.parentElement.firstElementChild.firstElementChild;
  item.classList.contains("checked-item")
    ? (checkItem.checked = true)
    : (checkItem.checked = false);
}

/* delete an item/task when deleteis clicked */

for (const task of deleteBtns) {
  task.addEventListener("click", function () {
    const itemSelected = task.parentElement;

    let selectedId = itemSelected.getAttribute("data-id");
    // console.log(selectedId);
    itemSelected.style.display = "none";

    fetch(`/delete/${selectedId}`, {
      method: "DELETE",
    });
  });
}

/* clear completed tasks using a button */

clearCompletedBtn.addEventListener("click", (e) => {
  // console.log(taskItems);
  for (let item of taskItems) {
    let checkItem = item.parentElement.parentElement;
    if (item.classList.contains("checked-item")) {
      checkItem.style.display = "none";
      let selectedId = checkItem.getAttribute("data-id");

      fetch(`/delete/${selectedId}`, {
        method: "DELETE",
      });
    }
  }
});

/* 

SET DEFAULT THEME AFTER RELOAD DEPENDING ON PREV SESSION 

*/
window.onload = (event) => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
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

  // console.log(current_theme);
  localStorage.setItem("theme", current_theme);
}

/*
fetch changes from the checkboxes
*/
// fetch()

// ----------------------drag and drop --------------------
