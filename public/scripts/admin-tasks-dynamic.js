document.addEventListener("DOMContentLoaded", () => {  
  const taskTypeInputs = document.querySelectorAll(
    ".admintask__object_type"
  );
  const taskIdInputs = document.querySelectorAll(
    ".admintask__object_id"
  );

  taskTypeInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      updateObjectIdOptions(input, taskIdInputs[index]);
    });
  });

  async function updateObjectIdOptions(typeSelect, idSelect) {
    idSelect.innerHTML = "<option>Loading...</option>";
    try {
      const res = await fetch(
        `/admin/tasks/object-options?type=${encodeURIComponent(
          typeSelect.value
        )}`
      );
      const options = await res.json();

      idSelect.innerHTML = `<option value="">All</option>` +
        options
          .map(
            (option) => `<option value="${option.id}">${option.title}</option>`
          )
          .join("");
    } catch {
      idSelect.innerHTML = "<option>Error</option>";
    }
  }
});