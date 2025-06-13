document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.querySelector("#userSelect");
  const pinEnter = document.querySelector("#pinEnter");
  const back = document.querySelector("#backButton");
  const register = document.querySelector(".login__register");

  const pinInput = document.getElementById("pinInput");
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
    pinAmount = 0;
    document.querySelector(".login__error-msg").innerHTML = "";
    pincodeDisplay.forEach((display) => {
      display.classList.remove("pincode-display__circle--filled");
    });
    pinInput.value = "";

    const selectedRadio = document.querySelector(
      'input[name="first_name"]:checked'
    );
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

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        pinInput.value = "";
        window.location.href = result.redirectUrl;
      } else {
        pinInput.value = "";
        document
          .querySelectorAll(".pincode-display__circle")
          .forEach((display) => {
            display.classList.remove("pincode-display__circle--filled");
          });
        console.error(result.message || "An error occurred");
      }
    } catch (error) {
      pinInput.value = "";
      document
        .querySelectorAll(".pincode-display__circle")
        .forEach((display) => {
          display.classList.remove("pincode-display__circle--filled");
        });
      pinAmount = 0;
      document.getElementById("pinError").innerHTML = "Incorrect Pin";
      console.error("Error:", error);
    }
  });
});
