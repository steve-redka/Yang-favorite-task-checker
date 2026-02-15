Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
  
function notifyUser(task) {
if (Notification.permission === "granted") {
    new Notification("🟢 Task Available!", {
    body: `Task matched: "${task}"`,
    icon: "yang.png"
    });
}
}

function playSound() {
    const audio = new Audio(chrome.runtime.getURL("icq.mp3"));
    console.log('audio')
    audio.play();
}

chrome.storage.sync.get(["whiteList"], (result) => {
    const whiteList = result.whiteList || [];
    let alertShown = false;
  
    const observer = new MutationObserver(() => {
      const taskDivs = document.querySelectorAll('.tutorial-tasks-page__snippets');
      let found = false;
  
      taskDivs.forEach(div => {
        whiteList.forEach(task => {
            if (!alertShown && div.textContent.toLowerCase().includes(task.toLowerCase())) {
                notifyUser(`🟢 Task Found: "${task}"`);
                playSound();
                alertShown = true;
                observer.disconnect(); // Stop watching further changes
              }
        });
      });
  
      if (found) {
        observer.disconnect(); // Stop watching further changes
      } else {
        console.log("No matching tasks found. Will retry in 5 minutes.");
        setTimeout(() => {
            // Check location.href right before reloading
            if (window.location.href === "https://yang.yandex-team.ru/?activeTab=all") {
                location.reload();
            } else {
                console.log("Not on the main page, skipping reload.");
            }
        }, 5 * 60 * 1000);
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });