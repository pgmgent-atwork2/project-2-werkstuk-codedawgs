document.addEventListener("DOMContentLoaded", () => {
  const tokenInput = document.querySelector(".register__token");
  const pincodeInput = document.querySelector(".register__pincode");
  const imageSelect = document.querySelector(".image-select");
  const nextButton = document.querySelector(".button--register-next");
  const title = document.querySelector(".register__title");

  tokenInput.style.display = "none";
  imageSelect.style.display = "none";
  pincodeInput.style.display = "block";
  nextButton.style.display = "block";
  title.style.display = "block";

  pincodeInput.addEventListener("click", () => {
    document.querySelector(".register__error-msg").innerHTML = "";
  });
  nextButton.addEventListener("click", () => {
    if (pincodeInput.value.length === 4) {
      imageSelect.style.display = "flex";
      pincodeInput.style.display = "none";
      nextButton.style.display = "none";
      title.style.display = "none";
    } else {
      document.querySelector(".register__error-msg").innerHTML =
        "Pincode must be 4 digits long.";
    }
  });
});
