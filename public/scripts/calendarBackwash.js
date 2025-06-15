document.addEventListener("DOMContentLoaded", async function () {
  const backwashAqua = document.getElementById("selectAquasplash");

  let events = [];
  let resources = [];

  const backwashSelect = document.getElementById("backwashSelect");

  let currentDepartment = 1;
  let generalTaskLogs = [];

  async function generateSelect() {
    const departments = await fetchData("departments");
    if (!backwashAqua) {
      departments.forEach((department) => {
        backwashSelect.innerHTML += `
          <option value=${department.id}>
            ${department.title}
          </option>
          `;
      });
    }
  }

  if (!backwashAqua) {
    backwashSelect.addEventListener("change", function () {
      currentDepartment = parseInt(backwashSelect.value);
      regenerateTable();
    });
  }

  async function regenerateTable() {
    const calendarEl = document.getElementById("calendarBackwash");
    calendarEl.innerHTML = "";
    generateTableWeek();
  }

  generateSelect();
  generateTableWeek();

  async function fetchData(slug) {
    try {
      const response = await fetch(`/api/${slug}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }      
      return await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function postData(id, completed) {
    try {
      const response = await fetch(`/tasks/${id}/completed`, {
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

    const tasks = await fetchData("tasks");
    const filters = await fetchData("filters");
    const taskLogs = await fetchData("tasklogs");
    const subDepartments = await fetchData("subdepartments");
    const departments = await fetchData("departments");

    const generalTasks = tasks.filter((task) => task.title === "Backwash");
    const generalTaskIds = new Set(generalTasks.map((task) => task.id));
    generalTaskLogs = taskLogs.filter((tasklog) =>
      generalTaskIds.has(tasklog.task_id)
    );

    if (!generalTasks.length) {
      return [];
    }

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    filters.forEach((filter, filterIndex) => {
      let task = generalTasks[filterIndex];

      if (!task) return;

      for (let i = 0; i < 7; i++) {
        const eventDate = new Date(monday);
        eventDate.setDate(monday.getDate() + i);
        const formattedDate = eventDate.toLocaleDateString('en-CA');

        let subDepartment = subDepartments[filter.sub_department_id - 1];
        let department = departments[subDepartment.department_id - 1];

        if(backwashAqua) {
          department = departments[3]
        }

        

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
    const filters = await fetchData("filters");
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

    let filteredResources = resources.filter((res) =>
      matchingResourceIds.has(res.id)
    );

    if(backwashAqua) {
      // Only show the resource with id "faq1"
      filteredResources = resources.filter(res => res.id === "faq1");
      currentDepartment = 4;
    }    

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

      days.push(date.toLocaleDateString('en-CA'));

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");

      const th = document.createElement("th");
      th.textContent = `${day}/${month}`;

      const todayDate = new Date().toLocaleDateString('en-CA');
      if (date.toLocaleDateString('en-CA') === todayDate) {
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
            const logDate = new Date(log.task_date).toLocaleDateString('en-CA');
            return (
              String(log.task_id) === eventTaskId &&
              logDate === eventDate
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

          const todayDate = new Date().toLocaleDateString('en-CA');

          if (event.date !== todayDate) {
            checkbox.disabled = true;
          }

          checkbox.checked = isCompleted;
          checkbox.dataset.eventId = event.id;

          checkbox.addEventListener("change", function () {
            const id = String(event.id).split("-")[0];
            postData(id, checkbox.checked);            
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
