document.addEventListener("DOMContentLoaded", () => {
    
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("pinInput").value = "";
        window.location.href = result.redirectUrl;
      } else {
        document.getElementById("pinInput").value = "";
        console.error(result.message || "An error occurred");
      }
    } catch (error) {
      document.getElementById("pinInput").value = "";
      document.getElementById("pinError").innerHTML = "Incorrect Pin";
      console.error("Error:", error);
    }
  });
});
