// Notification logic

// Request notification permission on load
function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }
  
  // Show a notification to the user
  function notifyUser(task) {
    if (Notification.permission === "granted") {
      new Notification("🟢 Task Available!", {
        body: `Task matched: "${task}"`,
        icon: "yang.png"
      });
    }
  }
  
  // Play a notification sound
  function playSound() {
    const audio = new Audio(chrome.runtime.getURL("icq.mp3"));
    console.log("Playing notification sound");
    audio.play();
  }

  export {requestNotificationPermission, notifyUser, playSound};