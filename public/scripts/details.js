document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", function () {
      if (details.open) {
        document.querySelectorAll("details").forEach((element) => {
          if (element !== details && element.open) {
            element.open = false;
            element.classList.remove("is-open");
            element.classList.add("is-closed");
          }
        });

        details.classList.add("is-open");
        details.classList.remove("is-closed");

        details.querySelectorAll(".summary__link").forEach((link) => {
          const percentage = link.getAttribute("data-percentage");
          link.style.width = percentage + "%";
        });
      } else {
        details.classList.remove("is-open");
        details.classList.add("is-closed");

        details.querySelectorAll(".summary__link").forEach((link) => {
          link.style.width = "0%";
        });
      }
    });
  });
});
