document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.edit-task-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const taskId = btn.getAttribute('data-task-id');
      const form = document.getElementById('form-' + taskId);
      const saveBtn = form.querySelector('button[type="submit"]');
      const titleInput = document.querySelector('.task-input--title[form="form-' + taskId + '"]');
      const completedInput = document.querySelector('.task-input--completed[form="form-' + taskId + '"]');

      titleInput.disabled = false;
      completedInput.disabled = false;
      btn.style.display = 'none';
      saveBtn.style.display = '';
    });
  });
});