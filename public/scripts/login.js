document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.querySelector("#userSelect");
  const pinEnter = document.querySelector("#pinEnter");
  const back = document.querySelector("#backButton");
  const register = document.querySelector(".login__register");
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");

  pinInput.style.display = "none";
  userSelect.style.display = "grid";
  pinEnter.style.display = "none";
  back.style.display = "none";
  register.style.display = "block";

  back.addEventListener("click", () => {
    userSelect.style.display = "grid";
    pinEnter.style.display = "none";
    back.style.display = "none";
    register.style.display = "block";
    pinError.innerHTML = "";
    resetPin();

    const selectedRadio = document.querySelector('input[name="first_name"]:checked');
    if (selectedRadio) {
      selectedRadio.checked = false;
    }
  });

  userSelect.addEventListener("click", () => {
    userSelect.style.display = "none";
    pinEnter.style.display = "flex";
    back.style.display = "block";
    register.style.display = "none";
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    pinError.innerHTML = "";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        pinInput.value = "";
        resetPin();
        window.location.href = result.redirectUrl;
      } else {
        resetPin();
        pinError.innerHTML = result.message || "Incorrect Pin";
        pinError.classList.remove("shake");
        void pinError.offsetWidth;
        pinError.classList.add("shake");
      }
    } catch (error) {
      resetPin();
      pinError.innerHTML = "Incorrect Pin";
      pinError.classList.remove("shake");
      void pinError.offsetWidth;
      pinError.classList.add("shake");
      console.error("Error:", error);
    }
  });
});