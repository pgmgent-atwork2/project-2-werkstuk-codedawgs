
document.addEventListener("DOMContentLoaded", async function () {
  const URL = `http://localhost:3005`;
  let events = [];

  let generalTaskLogs = [];

  generateEvents()

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

  async function generateEvents() {
    events = [];

    const tasks = await fetchData(URL, "tasks");
    const filters = await fetchData(URL, "filters");
    const taskLogs = await fetchData(URL, "tasklogs");
    const subDepartments = await fetchData(URL, "subdepartments");
    const departments = await fetchData(URL, "departments");

    const generalTasks = tasks.filter((task) => task.title === "Backwash");
    const generalTaskIds = new Set(generalTasks.map((task) => task.id));
    generalTaskLogs = taskLogs.filter((tasklog) =>
      generalTaskIds.has(tasklog.task_id)
    );

    if (!generalTasks.length) {
      console.error("No Backwash tasks found");
      return [];
    }

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    filters.forEach((filter, filterIndex) => {
      const task = generalTasks[filterIndex];

      if (!task) return;

      for (let i = 0; i < 7; i++) {
        const eventDate = new Date(monday);
        eventDate.setDate(monday.getDate() + i);
        const formattedDate = eventDate.toISOString().split("T")[0];

        const subDepartment = subDepartments[filter.sub_department_id - 1];
        const department = departments[subDepartment.department_id - 1];

        events.push({
          id: `${task.id}-${i + 1}`,
          resourceId: filter.title.toLowerCase(),
          date: formattedDate,
          department: department.id,
        });
      }
    });
    console.log(events);
  }
});
