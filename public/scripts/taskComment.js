document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".task__check");
  const inputs = document.querySelectorAll(".task__comment");
  inputs.forEach((input) => (input.style.display = "none"));

  let lastOpenCheckbox = null;

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => {
      if (lastOpenCheckbox === index && inputs[index].style.display === "flex") {
        inputs[index].style.display = "none";
        checkbox.checked = false;
        lastOpenCheckbox = null;
        return;
      }
      if (lastOpenCheckbox !== null && lastOpenCheckbox !== index) {
        inputs[lastOpenCheckbox].style.display = "none";
        checkboxes[lastOpenCheckbox].checked = false;
      }
      inputs[index].style.display = "flex";
      lastOpenCheckbox = index;
    });
  });
});