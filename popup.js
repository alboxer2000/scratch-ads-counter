document.addEventListener('DOMContentLoaded', () => {
  const linkCountElement = document.getElementById('linkCount');

  // Invia un messaggio allo script di contenuto per avviare il conteggio
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: "startCounting" });
  });

  // Riceve il messaggio dallo script di contenuto
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === "updateCount") {
      linkCountElement.textContent = message.count;
    }
  });
});
