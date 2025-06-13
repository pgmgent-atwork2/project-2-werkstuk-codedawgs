document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.querySelector("#userSelect");
  const pinEnter = document.querySelector("#pinEnter");
  const back = document.querySelector("#backButton");
  const register = document.querySelector(".login__register");
  const pinInput = document.getElementById("pinInput");
  const pincodeDisplay = document.querySelectorAll(".pincode-display__circle");

  let pinAmount = 0;

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

  document.addEventListener("keydown", (event) => {   
    if(userSelect.style.display !== "grid") {
      document.querySelector(".login__error-msg").innerHTML = "";
      const key = event.key;
  
      if (/^\d$/.test(key)) {
        if (pinAmount < 4) {
          pinInput.value += key;
          pincodeDisplay[pinAmount].classList.add("pincode-display__circle--filled");
          pinAmount++;
  
          if (pinAmount === 4) {
            document.querySelector("form").requestSubmit();
          }
        }
      } else if (key === "Backspace") {
        if (pinAmount > 0) {
          pinAmount--;
          pinInput.value = pinInput.value.slice(0, -1);
          pincodeDisplay[pinAmount].classList.remove("pincode-display__circle--filled");
        }
      }

    }
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
        pincodeDisplay.forEach((display) => {
          display.classList.remove("pincode-display__circle--filled");
        });
        pinAmount = 0;
        document.getElementById("pinError").innerHTML = result.message || "Incorrect Pin";
      }
    } catch (error) {
      pinInput.value = "";
      pincodeDisplay.forEach((display) => {
        display.classList.remove("pincode-display__circle--filled");
      });
      pinAmount = 0;
      document.getElementById("pinError").innerHTML = "Incorrect Pin";
      console.error("Error:", error);
    }
  });
});
