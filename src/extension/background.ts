chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (
        info.status === "complete" &&
        tab.url.indexOf("https://www.youtube.com") !== -1
    ) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: ["./contentScript.js"],
        });
    }
});
