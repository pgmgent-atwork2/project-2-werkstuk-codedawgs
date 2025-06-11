document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.analysis-table__form').forEach(function (form) {
    const editBtn = form.querySelector('.analysis-table__btn[type="button"]');
    const saveBtn = form.querySelector('.analysis-table__btn[type="submit"]');
    const minInput = form.closest('tr').querySelector('.analysis-table__input--min');
    const maxInput = form.closest('tr').querySelector('.analysis-table__input--max');

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