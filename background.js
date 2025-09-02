browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updateBadge") {
    browser.browserAction.setBadgeText({ text: message.count.toString() });
    browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    browser.browserAction.setBadgeTextColor({ color: "#FFFFFF" });
  }
});
