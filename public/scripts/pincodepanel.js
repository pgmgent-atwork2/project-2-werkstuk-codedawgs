const pincodeKeys = document.querySelectorAll(".pincode-panel__key");
const input = document.querySelector(".login__pin-input");

const pinInput = document.getElementById("pinInput");

const pincodeDisplay = document.querySelectorAll(".pincode-display__circle");

let pinAmount = 0;

function resetPin() {
  pinInput.value = "";
  input.value = "";
  pinAmount = 0;
  pincodeDisplay.forEach((display) => {
    display.classList.remove("pincode-display__circle--filled");
  });
}


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
    console.log(pinAmount);
  });
});

document.addEventListener("keydown", (event) => {
  if (userSelect.style.display !== "grid") {
    pinError.innerHTML = "";
    const key = event.key;

    if (/^\d$/.test(key)) {
      if (pinAmount < 4) {
        pinInput.value += key;
        pincodeDisplay[pinAmount].classList.add(
          "pincode-display__circle--filled"
        );
        pinAmount++;

        if (pinAmount === 4) {
          document.querySelector("form").requestSubmit();
        }

        pincodeDisplay.forEach((display) => {
          display.classList.remove("pincode-display__circle--filled");
        });
        for (let i = 0; i < pinAmount; i++) {
          pincodeDisplay[i].classList.add("pincode-display__circle--filled");
        }
      }
    } else if (key === "Backspace") {
      if (pinAmount > 0) {
        pinAmount--;
        pinInput.value = pinInput.value.slice(0, -1);
        pincodeDisplay[pinAmount].classList.remove(
          "pincode-display__circle--filled"
        );
      }
    }
  }

  console.log(pinAmount);
});

const delKey = document.querySelector(".pincode-panel__key--del");
