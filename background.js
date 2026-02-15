function shouldInjectScript(url) {
    const baseUrl = "https://yang.yandex-team.ru/";
    return url === baseUrl || url === `${baseUrl}?activeTab=all`;
}

// Handle SPA navigation (pushState/replaceState)
chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    if (shouldInjectScript(details.url)) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["content.js"]
        });
    }
});

// Handle initial page loads with query parameters
chrome.webNavigation.onCompleted.addListener(details => {
    if (details.frameId === 0 && shouldInjectScript(details.url)) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["content.js"]
        });
    }
}, { url: [{ hostEquals: "yang.yandex-team.ru" }] });
