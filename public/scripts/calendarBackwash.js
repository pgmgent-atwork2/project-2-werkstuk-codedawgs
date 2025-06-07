document.addEventListener("DOMContentLoaded", function () {

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

    async function postData(url, id, completed) {
    try {
      const response = await fetch(`${url}/tasks/${id}/completed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }
    } catch (error) {
      console.error("error:", error.message);
    }
  }
});
