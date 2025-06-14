window.addEventListener("load", () => {
    const splash = document.getElementById("splashscreen");
    if (splash) {
        setTimeout(() => {
            splash.classList.add("hidden");
            setTimeout(() => splash.remove(), 500);
        }, 3000); 
    }
});