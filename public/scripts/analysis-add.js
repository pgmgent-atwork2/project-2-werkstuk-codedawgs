document.addEventListener('DOMContentLoaded', function () {
    const newButton = document.querySelector(".analysis__new");
    const closeButton = document.querySelector(".analysis__close");
    const newForm = document.querySelector(".analysis__form");
    const inputs = document.querySelectorAll('input');

    newForm.style.display = "none"

    newButton.addEventListener('click',() => {
        newForm.style.display = "block"
    })
    closeButton.addEventListener('click',() => {
        newForm.style.display = "none"
            inputs.forEach(input => {
        input.value = '';
    });
    })
})