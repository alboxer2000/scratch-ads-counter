// Function to check the page content for links
function checkPageContent() {
  const textToFind = "https://scratch.mit.edu/projects";
  let count = 0;

  // Find all <a> tags (links) on the page
  const links = document.querySelectorAll('a');

  // Loop through all the links to check their href attribute
  links.forEach(link => {
    if (link.href && link.href.includes(textToFind)) {
      count++;
    }
  });

  // Sends a message to the extension with the result
  browser.runtime.sendMessage({
    action: "updateCount",
    count: count
  });
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "startCounting") {
    // Executes the function for the first time
    checkPageContent();

    // Executes the function every 5 seconds
    setInterval(checkPageContent, 5000);
  }
});
