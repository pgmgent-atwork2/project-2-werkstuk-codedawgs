document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.edit-task-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const taskId = btn.getAttribute('data-task-id');
      const form = document.getElementById('form-' + taskId);
      const saveBtn = form.querySelector('.save-task-btn');
      // Select all inputs/selects in this row with the correct form attribute
      const row = form.closest('tr');
      row.querySelectorAll('input[form], select[form]').forEach(function (input) {
        if (input.getAttribute('form') === 'form-' + taskId) {
          input.disabled = false;
        }
      });
      btn.style.display = 'none';
      saveBtn.style.display = '';
    });
  });
});