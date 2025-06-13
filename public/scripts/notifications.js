document.addEventListener("DOMContentLoaded", async function() {
  try {
    const res = await fetch("/notifications");
    const data = await res.json();
    if (data.count && data.count > 0) {
      const notifDiv = document.querySelector('.header__notifs');
      const notifNumber = document.querySelector('.header__notifs_number');
      if (notifDiv && notifNumber) {
        notifDiv.style.display = 'flex';
        notifNumber.textContent = data.count > 9 ? '9+' : data.count;
      }
    }
  } catch (e) {
  }
});