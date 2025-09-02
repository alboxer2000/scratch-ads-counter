// Function to check the page content for links
function checkPageContent() {
  const textToFind = "https://scratch.mit.edu/projects";
  const excludedText = "https://scratch.mit.edu/projects/editor/";
  const excludedRemix = "/remixes";
  let count = 0;

  // Find all <a> tags (links) on the page
  const links = document.querySelectorAll('a');

  // Loop through all links to check their href attribute and text content
  links.forEach(link => {
    // First, check if the link has an href property before trying to read it
    const href = link.href || '';
    const textContent = link.textContent || '';
    
    // Check if the href contains the text to find, and if it does not contain the texts to exclude.
    if (href.includes(textToFind) &&
        !href.includes(excludedText) &&
        !href.endsWith('#') &&
        !href.endsWith(excludedRemix) &&
        textContent.includes(textToFind)) { // Check if the visible text includes the URL
      count++;
      // Highlight the link
      link.style.border = "2px solid red";
      link.style.backgroundColor = "yellow";
    }
  });

  // Send a message to the extension with the result
  browser.runtime.sendMessage({
    action: "updateCount",
    count: count
  });

  // Update the browser action badge with the count
  browser.runtime.sendMessage({
    action: "updateBadge",
    count: count
  });
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "startCounting") {
    // Execute the function for the first time
    checkPageContent();

    // Execute the function every 5 seconds
    setInterval(checkPageContent, 5000);
  }
});
