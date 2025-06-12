function formatDateCell(text) {
    const match = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (match) {
        return `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${match[3]}, ${match[4].padStart(2, '0')}:${match[5]}`;
    }
    return text;
}

function cleanTableDates(tableClass) {
    const table = document.querySelector(`table.${tableClass}`);
    if (!table) return;
    table.querySelectorAll('td').forEach(td => {
        td.textContent = formatDateCell(td.textContent.trim());
    });
}

function downloadTableAsExcel(tableClass, filename = "export.xlsx") {
    cleanTableDates(tableClass);
    const table = document.querySelector(`table.${tableClass}`);
    if (!table) {
        alert("Table not found!");
        return;
    }
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, filename);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".export-excel-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const tableClass = btn.getAttribute("data-table");
            const table = document.querySelector(`table.${tableClass}`);
            
            const startMonth = document.getElementById("startMonth")?.value || "";
            const startYear = document.getElementById("startYear")?.value || "";
            const endMonth = document.getElementById("endMonth")?.value || "";
            const endYear = document.getElementById("endYear")?.value || "";

            const subDeptSelect = document.getElementById("filter_sub_department");
            let subDeptText = "";
            if (subDeptSelect) {
                const selectedOption = subDeptSelect.options[subDeptSelect.selectedIndex];
                if (selectedOption) {
                    const parts = selectedOption.text.split("|");
                    subDeptText = parts.length > 1 ? parts[1].trim().replace(/\s+/g, "_") : parts[0].trim().replace(/\s+/g, "_");
                }
            }

            let tableName = "";
            if (table && table.getAttribute("name")) {
                tableName = table.getAttribute("name").replace(/\s+/g, "_");
            }

            let filename = "data";
            if (startMonth && startYear) filename += `_${startMonth.padStart(2, "0")}-${startYear}`;
            if (endMonth && endYear) filename += `_${endMonth.padStart(2, "0")}-${endYear}`;
            if (subDeptText) filename += `_${subDeptText}`;
            if (tableName) filename += `_${tableName}`;
            filename += ".xlsx";

            downloadTableAsExcel(tableClass, filename);
        });
    });
});