chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    if (details.url === "https://yang.yandex-team.ru/") {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["content.js"]
      });
    }
  });