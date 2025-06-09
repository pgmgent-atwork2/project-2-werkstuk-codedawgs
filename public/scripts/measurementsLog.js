document.addEventListener("DOMContentLoaded", () => {
    const subDepartmentSelect = document.querySelector(".subDepartmentSelect");

    subDepartmentSelect.addEventListener('change', () => {
    const value = subDepartmentSelect.value;
        document.querySelectorAll('tr.row').forEach(row => {            
            if (value === 'all') {
                row.style.display = '';
            } else if (row.dataset.subDepartmentId === value) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            } 
        });
    })
});