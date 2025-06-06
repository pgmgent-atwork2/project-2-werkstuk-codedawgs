document.addEventListener("DOMContentLoaded", () => {
    const userSelect = document.querySelector("#userSelect");
    const pinEnter = document.querySelector("#pinEnter");
    const back = document.querySelector("#backButton");
    const register = document.querySelector('.login__register');

    const pinInput = document.getElementById('pinInput')
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
        pincodeDisplay.forEach(display => {
            display.classList.remove('pincode-display__circle--filled')
        });
        pinInput.value = '';

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

   
});