// Funzione per controllare il contenuto della pagina per i link
function checkPageContent() {
  const textToFind = "https://scratch.mit.edu/projects";
  const excludedText = "https://scratch.mit.edu/projects/editor/";
  const excludedRemix = "/remixes";
  let count = 0;

  // Trova tutti i tag <a> (link) nella pagina
  const links = document.querySelectorAll('a');

  // Loop attraverso tutti i link per controllare il loro attributo href e il loro testo
  links.forEach(link => {
    // Prima, controlla se il link ha una proprietà href prima di provare a leggerla
    const href = link.href || '';
    const text = link.textContent || '';
    
    // Controlla se l'href o il testo contengono il testo da trovare, e se non contengono i testi da escludere.
    if ((href.includes(textToFind) || text.includes(textToFind)) &&
        !href.includes(excludedText) &&
        !href.endsWith('#') &&
        !href.endsWith(excludedRemix)) {
      count++;
      // Evidenzia il link
      link.style.border = "2px solid red";
      link.style.backgroundColor = "yellow";
    }
  });

  // Invia un messaggio all'estensione con il risultato
  browser.runtime.sendMessage({
    action: "updateCount",
    count: count
  });

  // Aggiorna il badge dell'azione del browser con il conteggio
  browser.browserAction.setBadgeText({ text: count.toString() });
  browser.browserAction.setBadgeBackgroundColor({ color: "blue" });
}

// Ascolta i messaggi dal popup
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "startCounting") {
    // Esegue la funzione per la prima volta
    checkPageContent();

    // Esegue la funzione ogni 5 secondi
    setInterval(checkPageContent, 5000);
  }
});
