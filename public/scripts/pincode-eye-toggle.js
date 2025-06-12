document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".eye-toggle").forEach(function (icon) {
    const td = icon.closest("td");
    const input = td.querySelector(".pincode-input");

    function showPincode() {
      input.type = "text";
      icon.src = "/assets/svg/eye.svg";
    }

    function hidePincode() {
      input.type = "password";
      icon.src = "/assets/svg/eye-slash.svg";
    }

    icon.addEventListener("mousedown", showPincode);
    icon.addEventListener("mouseup", hidePincode);
    icon.addEventListener("mouseleave", hidePincode);

    icon.addEventListener("touchstart", function(e) {
      e.preventDefault();
      showPincode();
    });
    icon.addEventListener("touchend", function(e) {
      e.preventDefault();
      hidePincode();
    });

    icon.addEventListener("keydown", function(e) {
      if (e.key === " " || e.key === "Enter") {
        showPincode();
      }
    });
    icon.addEventListener("keyup", function(e) {
      if (e.key === " " || e.key === "Enter") {
        hidePincode();
      }
    });
  });
});