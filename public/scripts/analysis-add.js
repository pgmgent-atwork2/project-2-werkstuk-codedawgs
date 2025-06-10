document.addEventListener("DOMContentLoaded", async function () {
  const URL = "http://localhost:3005";

  async function fetchData(url, slug) {
    try {
      const response = await fetch(`${url}/api/${slug}`);
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
  postAnalysis.addEventListener("click", () => {
    calcValues();
  });

  async function calcValues() {
    const data = await fetchData(URL, "measurement-definitions");
    values.forEach((value, index) => {
        const min = data[index].min_value;
        const max = data[index].max_value;
        const val = parseFloat(value.value)        
        if(val < min || val > max) {
            const error = val<min ? "low" : "high";
            console.log(`${val}is too ${error}`);              
        }
    });
  }
});
