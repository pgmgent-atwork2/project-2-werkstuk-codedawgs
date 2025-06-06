const pincodeKeys = document.querySelectorAll(".pincode-panel__key");
const input = document.querySelector(".login__pin-input");

const pinInput = document.getElementById("pinInput");

const pincodeDisplay = document.querySelectorAll(".pincode-display__circle");

let pinAmount = 0;

pincodeKeys.forEach((key) => {
  key.addEventListener("click", () => {
    document.querySelector(".login__error-msg").innerHTML = "";

    if (key.classList.contains("pincode-panel__key--del")) {
      input.value = input.value.slice(0, -1);
      pinAmount--;
      if (pinAmount <= 0) {
        pinAmount = 0;
      }
    } else {
      input.value += key.dataset.id;
      pinAmount++;
    }

    if (pinInput.value.length === 4) {
      document.querySelector("form").requestSubmit();
    }

    pincodeDisplay.forEach((display) => {
      display.classList.remove("pincode-display__circle--filled");
    });
    for (let i = 0; i < pinAmount; i++) {
      pincodeDisplay[i].classList.add("pincode-display__circle--filled");
    }
  });
});

const delKey = document.querySelector(".pincode-panel__key--del");
