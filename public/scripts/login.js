document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.querySelector(".login");
  const userSelect = document.querySelector("#userSelect");
  const pinEnter = document.querySelector("#pinEnter");
  const back = document.querySelector("#backButton");
  const register = document.querySelector(".login__register");
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");
  const loginTitle = document.querySelector(".login__title");

  pinInput.style.display = "none";
  userSelect.classList.add("login__content");
  pinEnter.classList.add("login__content", "login__content--hidden");
  back.style.display = "none";
  register.style.display = "block";

  loginSection.classList.add("login--wide");

  back.addEventListener("click", () => {
    
    userSelect.classList.remove("login__content--hidden");
    pinEnter.classList.add("login__content--hidden");
    
      loginTitle.classList.remove('down');
      back.style.display = "none";
      register.style.display = "block";
      pinError.innerHTML = "";
      resetPin();
      
      const selectedRadio = document.querySelector('input[name="id"]:checked');
      if (selectedRadio) selectedRadio.checked = false;


    loginSection.classList.remove("login--narrow");
    loginSection.classList.add("login--wide");
  });

  userSelect.addEventListener("click", (e) => {
    if (e.target.closest(".login__user")) {
      
      userSelect.classList.add("login__content--hidden");
      pinEnter.classList.remove("login__content--hidden");

        back.style.display = "block";
        register.style.display = "none";
        loginTitle.classList.add('down');

        loginSection.classList.remove("login--wide");
        loginSection.classList.add("login--narrow");
 
    }
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
