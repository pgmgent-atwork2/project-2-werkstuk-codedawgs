document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.task__check');
    const inputs = document.querySelectorAll('.task__comment');
    inputs.forEach(input => input.style.display = 'none');

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', () => {
            inputs.forEach(input => input.style.display = 'none');
            inputs[index].style.display = 'block';
        });
    });
});