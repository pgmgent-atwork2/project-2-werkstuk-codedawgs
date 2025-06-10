document.addEventListener('DOMContentLoaded', function () {
  const objectTypeSelect = document.getElementById('object_type');
  const objectIdSelect = document.getElementById('object_id');

  function updateObjectIdOptions() {
    const type = objectTypeSelect.value;
    let options = [];
    if (type === 'department') {
      options = window.departments.map(d => ({ value: d.id, label: d.title }));
    } else if (type === 'sub_department') {
      options = window.sub_departments.map(d => ({ value: d.id, label: d.title }));
    } else if (type === 'pumps') {
      options = window.pumps.map(d => ({ value: d.id, label: d.title }));
    } else if (type === 'filters') {
      options = window.filters.map(d => ({ value: d.id, label: d.title }));
    }
    objectIdSelect.innerHTML = options.map(opt =>
      `<option value="${opt.value}">${opt.label}</option>`
    ).join('');
  }

  objectTypeSelect.addEventListener('change', updateObjectIdOptions);

  updateObjectIdOptions();
});