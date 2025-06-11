document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.measurement-form').forEach(function (form) {
    const editBtn = form.querySelector('.measurement-action-btn[type="button"]');
    const saveBtn = form.querySelector('.measurement-action-btn[type="submit"]');
    const minInput = form.closest('tr').querySelector('.measurement-input--min');
    const maxInput = form.closest('tr').querySelector('.measurement-input--max');

    editBtn.addEventListener('click', function () {     
      minInput.disabled = false;
      maxInput.disabled = false;
      editBtn.style.display = 'none';
      saveBtn.style.display = '';
    });

    form.addEventListener('submit', function () {
      minInput.disabled = false;
      maxInput.disabled = false;
    });
  });
});