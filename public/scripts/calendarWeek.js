document.addEventListener("DOMContentLoaded", function () {
  async function fetchTaskLogs() {
    try {
      const response = await fetch(`api/tasklogs`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error(error.message);
    }
  }

});
