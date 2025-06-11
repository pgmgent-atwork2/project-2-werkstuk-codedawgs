document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", function () {
      if (details.open) {
        document.querySelectorAll("details").forEach((element) => {
          if (element !== details && d.open) {
            element.open = false;
            element.classList.remove("is-open");
          }
        });
        details.classList.add("is-open");
      } else {
        details.classList.remove("is-open");
      }
    });
  });
});
