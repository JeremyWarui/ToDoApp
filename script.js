"use strict";
const checkBoxes = document.querySelectorAll("input");

// checkbox to add a strikethrough on the list
for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", function () {
    const itemSelected = checkBox.parentElement.nextElementSibling;
    itemSelected.classList.toggle("checked-item");
  });
}
