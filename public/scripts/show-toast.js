document.addEventListener("DOMContentLoaded", () => {
  window.showToast = function showToast(message, duration = 3000) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    const progress = document.createElement("div");
    progress.className = "progress";
    toast.appendChild(progress);

    container.appendChild(toast);

    void toast.offsetHeight;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");

      toast.addEventListener("transitionend", () => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      });
    }, duration);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const toastMessageFromCookie = getCookie('toast');
  if (toastMessageFromCookie) {
    showToast(decodeURIComponent(toastMessageFromCookie));
    document.cookie = "toast=; Max-Age=0; path=/";
    return; 
  }

  const params = new URLSearchParams(window.location.search);
  const message = params.get('message');
  const firstName = params.get('first_name');
  const role = params.get('role');

    if (message === 'userAdded' && firstName && role) {
    showToast(`Succesfully added ${decodeURIComponent(firstName)} (${decodeURIComponent(role)})!`);
    } else if (message === 'userDeleted' && firstName && role) {
    showToast(`Succesfully deleted ${decodeURIComponent(firstName)} (${decodeURIComponent(role)})!`);
    }
    if (message === 'taskAdded') {
      const taskTitle = params.get('task_title');
      if (taskTitle) {
        showToast(`Succesfully added task "${decodeURIComponent(taskTitle)}"!`);
      }
    }
});
