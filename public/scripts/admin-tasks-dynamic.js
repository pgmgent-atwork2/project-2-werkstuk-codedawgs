document.addEventListener("DOMContentLoaded", () => {  
  const taskTypeInputsAdd = document.querySelectorAll(".admintask__object_type--add");
  const taskIdInputsAdd = document.querySelectorAll(".admintask__object_id--add"); 

  const taskTypeInputsFilter = document.querySelectorAll(".admintask__object_type--filter");
  const taskIdInputsFilter = document.querySelectorAll(".admintask__object_id--filter");  

  taskTypeInputsAdd.forEach((input, index) => {
    input.addEventListener("change", () => {
      console.log("add");
      
      updateObjectIdOptions(input, taskIdInputsAdd[index]);
    });
  });
  
  taskTypeInputsFilter.forEach((input, index) => {
    input.addEventListener("change", () => {
            console.log("filter");

      updateObjectIdOptions(input, taskIdInputsFilter[index]);
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