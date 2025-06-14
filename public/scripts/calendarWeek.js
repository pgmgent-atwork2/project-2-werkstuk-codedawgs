document.addEventListener("DOMContentLoaded", function () {
  const events = [];
  const aquasplashUser = document.querySelector(".aqua");

  generateEvents();

  async function fetchData(slug) {
    try {
      const response = await fetch(`/api/${slug}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      return data;
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
    const taskLogs = await fetchData("tasklogs");
    const tasks = await fetchData("tasks");
    const users = await fetchData("users");

    const departments = await fetchData("departments");
    const subdepartments = await fetchData("subdepartments");
    const filters = await fetchData("filters");
    const pumps = await fetchData("pumps");

    const latestTasks = new Map();

    taskLogs.forEach((task) => {
      latestTasks.set(task.task_id, task);
    });

    latestTasks.forEach((task) => {
      if (task.action === "completed") {
        const date = new Date(task.task_date);
        const startDate = new Date(date.getTime());
        startDate.setMinutes(startDate.getMinutes() - 1);

        const localISOString = toLocalISOString(date);
        const startDateISO = toLocalISOString(startDate);

        const interval = tasks[task.task_id - 1].interval;
        let circleColor = "";
        if (interval === "daily") {
          circleColor = "green";
        } else if (interval === "weekly") {
          circleColor = "blue";
        } else if (interval === "monthly") {
          circleColor = "red";
        }

        let type = "";

        if (task.object_type === "department") {
          type = departments[task.object_id - 1].title;
        } else if (task.object_type === "sub_department") {
          type = subdepartments[task.object_id - 1].title;
        } else if (task.object_type === "pump") {
          type = pumps[task.object_id - 1].title;
        } else if (task.object_type === "filter") {
          type = filters[task.object_id - 1].title;
        }
        if(users[task.user_id - 1]) {
          events.push({
            id: task.id,
            type: type,
            title: tasks[task.task_id - 1].title,
            user: users[task.user_id - 1].first_name,
            circleColor: circleColor,
            start: startDateISO,
            end: localISOString,
          });
        }
      }
    });

    generateCalenderWeek();
  }

  function generateCalenderWeek() {
    const calendarEl = document.getElementById("calendarWeek");
    const calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: "local",
      initialView: "dayGridMonth",
      firstDay: 1,
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      events: events,
      dayMaxEvents: 2,

      eventContent: function (arg) {
        const time = arg.event.start.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const title = arg.event.title;
        const user = arg.event.extendedProps.user;
        const color = arg.event.extendedProps.circleColor;
        const type = arg.event.extendedProps.type;

        return {
          html: `
          <div class="calendar-event">
            <span class="${color}"></span>
            ${time}
            <strong>${type} :</strong>
            ${title}
            <strong>${user}</strong> 
          </div>`,
        };
      },
    });
    calendar.render();
  }
});
