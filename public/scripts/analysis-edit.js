document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".measurement-action-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const minInput = row.querySelector(".measurement-input--min");
      const maxInput = row.querySelector(".measurement-input--max");

      if (btn.textContent === "Edit") {
        minInput.disabled = false;
        maxInput.disabled = false;
        btn.textContent = "Save";
      } else {
        minInput.disabled = true;
        maxInput.disabled = true;
        btn.textContent = "Edit";
      }
    });
  });
});
