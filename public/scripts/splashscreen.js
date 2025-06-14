window.addEventListener("load", () => {
    const splash = document.getElementById("splashscreen");
    const loginSection = document.getElementById("loginSection");
    if (splash) {
        setTimeout(() => {
            splash.classList.add("hidden");
            loginSection.classList.add("hidden")
            setTimeout(() => splash.remove(), 500);
        }, 5000); 
    }
});