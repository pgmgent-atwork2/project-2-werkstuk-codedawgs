document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".admin-tasks__edit-btn").forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const form = editBtn.closest("form");
      const cancelBtn = form.querySelector(".admin-tasks__cancel-btn");
      const saveBtn = form.querySelector(".admin-tasks__save-btn");
      const row = editBtn.closest("tr");
      const inputs = row.querySelectorAll(
        'input[form="' + form.id + '"], select[form="' + form.id + '"]'
      );
      inputs.forEach((input) => {
        input.disabled = false;
      });
      editBtn.style.display = "none";
      saveBtn.style.display = "";
      cancelBtn.style.display = "";
    });
  });

  document.querySelectorAll(".admin-tasks__cancel-btn").forEach((cancelBtn) => {
    cancelBtn.addEventListener("click", () => {
      window.location.reload()
    });
  });

  document.querySelectorAll('form[id^="form-"]').forEach((form) => {
    form.addEventListener("submit", () => {
      const row = form.closest("tr");
      const inputs = row.querySelectorAll(
        'input[form="' + form.id + '"], select[form="' + form.id + '"]'
      );
      inputs.forEach((input) => {
        input.disabled = false;
      });
    });
  });

  //Load Task type name
  const taskTypeInputs = document.querySelectorAll(
    ".admin-tasks__select--object-type"
  );
  const taskIdInputs = document.querySelectorAll(
    ".admin-tasks__select--object-id"
  );

  taskTypeInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      updateObjectIdOptions(input, taskIdInputs[index]);
    });
  });

  async function updateObjectIdOptions(typeSelect, idSelect) {
    idSelect.innerHTML = "<option>Loading...</option>";
    try {
      const res = await fetch(`/admin/tasks/object-options?type=${encodeURIComponent(typeSelect.value)}`, {
        headers: {
          "api-key": apiKey,
        }
      });
      const options = await res.json();

      idSelect.innerHTML = options
        .map(
          (option) => `<option value="${option.id}">${option.title}</option>`
        )
        .join("");
    } catch {
      idSelect.innerHTML = "<option>Error</option>";
    }
  }
});
