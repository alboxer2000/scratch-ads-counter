document.addEventListener('DOMContentLoaded', () => {
  const countElement = document.getElementById('count');
  const errorElement = document.getElementById('error');

  // Request the content script to start counting when the popup is opened
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: "startCounting" });
  });

  // Listen for messages from the content script
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === "updateCount") {
      // Update the count displayed in the popup
      countElement.textContent = message.count;
      errorElement.style.display = 'none';
      countElement.style.display = 'block';
    } else if (message.action === "updateBadge") {
      // Update the badge on the extension icon
      browser.browserAction.setBadgeText({ text: message.count.toString() });
      browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    } else if (message.action === "showError") {
      // Show an error message in the popup
      errorElement.textContent = message.message;
      errorElement.style.display = 'block';
      countElement.style.display = 'none';
      browser.browserAction.setBadgeText({ text: "" });
    }
  });
});
