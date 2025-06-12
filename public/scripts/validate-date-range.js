document.addEventListener("DOMContentLoaded", function () {
    function addDateRangeValidation(formId) {
        const form = document.getElementById(formId);
        const errorSpan = document.getElementById('dateRangeError');
        if (!form || !errorSpan) return;

        form.addEventListener('submit', function (e) {
            const sm = form.querySelector('[name="startMonth"]').value.padStart(2, '0');
            const sy = form.querySelector('[name="startYear"]').value;
            const em = form.querySelector('[name="endMonth"]').value.padStart(2, '0');
            const ey = form.querySelector('[name="endYear"]').value;

            if (sm && sy && em && ey) {
                const start = new Date(`${sy}-${sm}-01`);
                const end = new Date(`${ey}-${em}-01`);
                end.setMonth(end.getMonth() + 1);
                end.setDate(0);

                if (start > end) {
                    errorSpan.textContent = 'Start date must be before or equal to end date.';
                    errorSpan.style.display = 'inline';
                    e.preventDefault();
                } else {
                    errorSpan.textContent = '';
                    errorSpan.style.display = 'none';
                }
            } else {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        });
    }

    addDateRangeValidation('logFilterForm');
    addDateRangeValidation('analysisFilterForm');
});