document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.edit-task-btn').forEach(function (editBtn) {
    editBtn.addEventListener('click', function () {
      const form = editBtn.closest('form');
      const saveBtn = form.querySelector('.save-task-btn');
      const row = editBtn.closest('tr');
      const inputs = row.querySelectorAll('input[form="' + form.id + '"], select[form="' + form.id + '"]');
      inputs.forEach(function (input) {
        input.disabled = false;
      });
      editBtn.style.display = 'none';
      saveBtn.style.display = '';
    });
  });

  document.querySelectorAll('form[id^="form-"]').forEach(function (form) {
    form.addEventListener('submit', function () {
      const row = form.closest('tr');
      const inputs = row.querySelectorAll('input[form="' + form.id + '"], select[form="' + form.id + '"]');
      inputs.forEach(function (input) {
        input.disabled = false;
      });
    });
  });
});