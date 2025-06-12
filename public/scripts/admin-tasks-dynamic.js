document.addEventListener('DOMContentLoaded', function () {
  const objectTypeSelect = document.getElementById('object_type');
  const objectIdSelect = document.getElementById('object_id');

  async function updateObjectIdOptions() {
    const type = objectTypeSelect.value;
    objectIdSelect.innerHTML = '<option>Loading...</option>';
    try {
      const res = await fetch(`/admin/tasks/object-options?type=${encodeURIComponent(type)}`, {
        headers: { "api-key": apiKey }
      });
      const options = await res.json();
      objectIdSelect.innerHTML = options.map(opt =>
        `<option value="${opt.id}">${opt.title}</option>`
      ).join('');
    } catch {
      objectIdSelect.innerHTML = '<option>Error loading options</option>';
    }
  }

  objectTypeSelect.addEventListener('change', updateObjectIdOptions);
  updateObjectIdOptions();
});