document.addEventListener("DOMContentLoaded", function () {
  const events = [];

  generateEvents();

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

  function toLocalISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  async function generateEvents() {
    const tasks = await fetchTaskLogs();
    tasks.forEach((task) => {
      const date = new Date(task.task_date);
      const startDate = new Date(date.getTime());
      startDate.setMinutes(startDate.getMinutes() - 5);

      const localISOString = toLocalISOString(date);
      const startDateISO = toLocalISOString(startDate);

      events.push({
        id: task.id,
        title: "my event",
        start: startDateISO,
        end: localISOString,
      });
    });
    generateCalenderWeek();
  }
});
