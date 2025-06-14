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
    }

    const params = new URLSearchParams(window.location.search);
    const message = params.get('message');

    if (message === 'userAdded') {
        showToast('Succesfully added user!');
    } else if (message === 'userDeleted') {
        showToast('Succesfully deleted user!');
    }
});