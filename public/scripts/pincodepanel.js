const pincodeKeys = document.querySelectorAll(".pincode-panel__key");
const input = document.querySelector(".login__pin-input");
const pinInput = document.getElementById("pinInput");

const pincodeDisplay = document.querySelectorAll(".pincode-display__circle");
const pinError = document.getElementById('pinError');
const userSelect = document.querySelector("#userSelect");

let pinAmount = 0;

function resetPin() {
  pinInput.value = "";
  input.value = "";
  pinAmount = 0;
  pincodeDisplay.forEach((display) => {
    display.classList.remove("pincode-display__circle--filled");
  });
}

function updateDisplay() {
  pincodeDisplay.forEach((display) => {
    display.classList.remove("pincode-display__circle--filled");
  });
  for (let i = 0; i < pinAmount; i++) {
    pincodeDisplay[i].classList.add("pincode-display__circle--filled");
  }
}


pincodeKeys.forEach((key) => {
  key.addEventListener("click", () => {
    pinError.innerHTML = "";

    if (key.classList.contains("pincode-panel__key--del")) {
      input.value = input.value.slice(0, -1);
      pinInput.value = pinInput.value.slice(0, -1);
      pinAmount = Math.max(0, pinAmount - 1);
    } else {
      input.value += key.dataset.id;
      pinInput.value += key.dataset.id;
      pinAmount++;
    }

    if (pinAmount === 4) {
      document.querySelector("form").requestSubmit();
    }

    updateDisplay();
    console.log(pinAmount);
  });
});

document.addEventListener("keydown", (event) => {
  if (userSelect.style.display !== "grid") {
    pinError.innerHTML = "";
    const key = event.key;

    if (/^\d$/.test(key)) {
      if (pinAmount < 4) {
        input.value += key;
        pinInput.value += key;
        pinAmount++;
        if (pinAmount === 4) {
          document.querySelector("form").requestSubmit();
        }
      }
    } else if (key === "Backspace") {
      if (pinAmount > 0) {
        input.value = input.value.slice(0, -1);
        pinInput.value = pinInput.value.slice(0, -1);
        pinAmount--;
      }
    }
    updateDisplay();
    console.log(pinAmount);
  }
});

window.resetPin = resetPin;
