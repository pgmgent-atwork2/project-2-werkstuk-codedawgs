document.addEventListener("DOMContentLoaded", async function() {
  try {
    const res = await fetch("/notifications");
    const data = await res.json();
    if (data.hasNew) {
      const notifSpan = document.querySelector('.header__notifs');
      if (notifSpan) {
        notifSpan.style.display = 'block';
      }
    }
  } catch (e) {
    console.error("Error fetching notifications:", e);
}
});