const taskBox = document.getElementById('taskList');
const saveBtn = document.getElementById('saveBtn');

// Load saved whitelist
chrome.storage.sync.get(["whiteList"], (result) => {
  taskBox.value = (result.whiteList || []).join('\n');
});

// Save updated whitelist
saveBtn.addEventListener('click', () => {
  const tasks = taskBox.value.split('\n').map(t => t.trim()).filter(Boolean);
  chrome.storage.sync.set({ whiteList: tasks }, () => {
    alert("Whitelist saved!");
  });
});