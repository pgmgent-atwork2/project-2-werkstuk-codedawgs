document.addEventListener("DOMContentLoaded", async function () {
  const URL = `http://localhost:3005`;
  let events = [];
  let resources = [];

  const backwashSelect = document.getElementById("backwashSelect");

  let currentDepartment = 1;
  let generalTaskLogs = [];

  async function generateSelect() {
    const departments = await fetchData(URL, "departments");
    departments.forEach((department) => {
      backwashSelect.innerHTML += `
      <option value=${department.id}>
        ${department.title}
      </option>
      `;
    });
  }

  backwashSelect.addEventListener("change", function () {
    currentDepartment = parseInt(backwashSelect.value);
    regenerateTable();
  });

  async function regenerateTable() {
    const calendarEl = document.getElementById("calendarBackwash");
    calendarEl.innerHTML = "";
    generateTableWeek();
  }

  generateSelect();
  generateTableWeek();

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
  }

  async function generateResources() {
    resources = [];
    const filters = await fetchData(URL, "filters");
    filters.forEach((filter) => {
      resources.push({
        id: filter.title.toLowerCase(),
        title: filter.title,
      });
    });
  }

  async function generateTableWeek() {
    const calendarBackwash = document.getElementById("calendarBackwash");
    calendarBackwash.innerHTML = "";
    await generateResources();
    await generateEvents();

    const matchingResourceIds = new Set(
      events
        .filter((event) => event.department === currentDepartment)
        .map((event) => event.resourceId)
    );

    const filteredResources = resources.filter((res) =>
      matchingResourceIds.has(res.id)
    );

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const firstTh = headerRow.appendChild(document.createElement("th"));
    firstTh.textContent = "Filter";

    const days = [];

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      days.push(date.toISOString().split("T")[0]);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");

      const th = document.createElement("th");
      th.textContent = `${day}/${month}`;

      const todayDate = new Date().toISOString().split("T")[0];
      if (date.toISOString().split("T")[0] === todayDate) {
        th.className = "table__today";
      }

      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    filteredResources.forEach((resource) => {
      const row = document.createElement("tr");
      const rowTitle = document.createElement("td");
      rowTitle.textContent = resource.title;

      row.appendChild(rowTitle);

      for (let day of days) {
        const cell = document.createElement("td");
        const event = events.find(
          (event) =>
            event.resourceId === resource.id &&
            event.date === day &&
            event.department === currentDepartment
        );

        if (event) {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = event.id;

          const eventTaskId = event.id.split("-")[0];
          const eventDate = event.date;


          const logsForTaskDate = generalTaskLogs.filter((log) => {
            const logDate = new Date(log.task_date);
            const localLogDate = new Date(
              logDate.getFullYear(),
              logDate.getMonth(),
              logDate.getDate()
            )
              .toISOString()
              .split("T")[0];
            return (
              String(log.task_id) === eventTaskId && localLogDate === eventDate
            );
          });

          let isCompleted = false;
          
          if (logsForTaskDate.length > 0) {
              let latestLog = logsForTaskDate[0];

            for (let i = 1; i < logsForTaskDate.length; i++) {
              if (
                new Date(logsForTaskDate[i].task_date) >
                new Date(latestLog.task_date)
              ) {
                latestLog = logsForTaskDate[i];
              }
            }

            isCompleted = latestLog.action === "completed";
          }

          const todayDate = new Date().toISOString().split("T")[0];

          if (event.date !== todayDate) {
            checkbox.disabled = true;
          }

          checkbox.checked = isCompleted;
          checkbox.dataset.eventId = event.id;

          checkbox.addEventListener("change", function () {
            const id = String(event.id).split("-")[0];
            postData(URL, id, checkbox.checked);            
          });

          cell.appendChild(checkbox);
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    calendarBackwash.appendChild(table);
  }
});
