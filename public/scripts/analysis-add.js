document.addEventListener("DOMContentLoaded", async function () {
  async function fetchData(slug) {
    try {
      const response = await fetch(`${slug}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  // open and close form
  const newButton = document.querySelector(".analysis__new");
  const closeButton = document.querySelector(".analysis__close");
  const newForm = document.querySelector(".analysis__form");
  const inputs = document.querySelectorAll("input");

  newForm.style.display = "none";

  newButton.addEventListener("click", () => {
    newForm.style.display = "block";
  });
  closeButton.addEventListener("click", () => {
    newForm.style.display = "none";
    inputs.forEach((input) => {
      input.value = "";
    });
  });

  //calc ecoli and coliform
  const coliform = document.getElementById("9");
  const ecoli = document.getElementById("10");
  coliform.addEventListener('blur', () => {
    coliform.value = coliform.value * 100;
  });
  ecoli.addEventListener('blur', () => {
    ecoli.value = ecoli.value * 100;
  });

  //calc chlorine
  const freeCl = document.getElementById("4");
  const totalCl = document.getElementById("5");
  const combCl = document.getElementById("6");

  totalCl.addEventListener("input", () => {
    const total = parseFloat(totalCl.value) || 0;
    const free = parseFloat(freeCl.value) || 0;
    const combined = total - free;
    combCl.value = combined.toFixed(2);
  });

  //calc min and max
  const values = document.querySelectorAll(".value-input");

  async function calcValues() {
    const definitions = await fetchData("/api/measurement-definitions");
    const errors = [];
    values.forEach((value, index) => {
      const val = parseFloat(value.value);
      const min = definitions[index].min_value;
      const max = definitions[index].max_value;

      if (index === 5) {
        const maxCl = parseFloat(values[4].value) * 0.2;
        if (val > maxCl) {
          errors.push({ error: "high", def_id: index + 1 });
        } else {
          errors.push({ error: "none", def_id: index + 1 });
        }
      } else {
        const isBelowMin = min !== null && val < min;
        const isAboveMax = max !== null && val > max;

        if (isBelowMin || isAboveMax) {
          const error = isBelowMin ? "low" : "high";
          errors.push({ error, def_id: index + 1 });
        } else {
          errors.push({ error: "none", def_id: index + 1 });
        }
      }
    });
    return errors;
  }

  document
    .getElementById("analysisForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = {};

      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      try {
        const response1 = await fetch("/tasks/analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response1.ok) {
          throw new Error(`error: ${response1.status}`);
        }

        const result = await response1.json();

        const calculations = await calcValues();
        const promises = calculations.map(async (calc) => {
          if (calc.error !== "none") {
            const data = await fetch("/analysis/notification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                measurement_log_id: result.id.id,
                measurement_def_id: calc.def_id,
                message: calc.error,
              }),
            });
            return data;
          }
        });
        window.location.reload();
      } catch (error) {
        console.error("error:", error.message);
      }
    });

  const timeSelect = document.querySelector(".timeSelect");
  const measurementInputs = document.querySelectorAll(".measurement__input");
  const subDepartmentSelect = document.querySelector(".subDepartmentSelect");

  timeSelect.addEventListener("change", () => {
    changeInputsDisplay();
  });
  subDepartmentSelect.addEventListener("change", () => {
    changeInputsDisplay();
  });

  function changeInputsDisplay() {
    measurementInputs.forEach((input) => {
      if (subDepartmentSelect.value === "8") {
        measurementInputs[7].style.display = "none";
      } else {
        measurementInputs[7].style.display = "block";
      }

      if (timeSelect.value === "2") {
        if (input.querySelector("[required]") === null) {
          input.style.display = "none";
          measurementInputs[7].style.display = "none";
        }
      } else {
        input.style.display = "block";
      }
    });
  }
});
