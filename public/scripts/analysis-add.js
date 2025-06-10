document.addEventListener("DOMContentLoaded", async function () {
  const URL = "http://localhost:3005";

  async function fetchData(url, slug) {
    try {
      const response = await fetch(`${url}/${slug}`);
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

  //calc chlorine
  const freeCl = document.getElementById("4");
  const totalCl = document.getElementById("5");
  const combCl = document.getElementById("6");

  totalCl.addEventListener("input", () => {
    combCl.value = totalCl.value - freeCl.value;
  });

  //calc min and max
  const values = document.querySelectorAll(".value-input");
  const postAnalysis = document.querySelector(".analysis__add");


  async function calcValues() {
    const definitions = await fetchData(URL, "api/measurement-definitions");
    const errors = [];
    values.forEach((value, index) => {
      const min = definitions[index].min_value;
      const max = definitions[index].max_value;
      const val = parseFloat(value.value);
      if (val < min || val > max) {
        const error = val < min ? "low" : "high";
        errors.push({
          error,
          def_id: index,
        });
      } else {
        errors.push({
          error: "none",
          def_id: index+1,
        });
      }
    });    
    return errors;
  }

  document.getElementById("analysisForm").addEventListener("submit", async function (event) {
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
        

      } catch (error) {
        console.error("error:", error.message);
      }
    });
});
