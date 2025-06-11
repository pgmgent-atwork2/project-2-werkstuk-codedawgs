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
