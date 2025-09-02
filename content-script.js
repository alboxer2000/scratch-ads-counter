// Function to check the page content for links
function checkPageContent() {
  const textToFindProjects = "https://scratch.mit.edu/projects/";
  const textToFindStudios = "https://scratch.mit.edu/studios/";
  const excludedText = "https://scratch.mit.edu/projects/editor/";
  const excludedRemix = "/remixes";
  const excludedCharacter = "#";
  let count = 0;

  // Find all <a> tags (links) on the page
  const links = document.querySelectorAll('a');

  // Loop through all links to check their href attribute and text content
  links.forEach(link => {
    // Check if the link is inside a div with the class "project-description"
    const isInsideProjectDescription = link.closest('.project-description');
    if (isInsideProjectDescription) {
      return; // Skip this link
    }
    
    // First, check if the link has an href property before trying to read it
    const href = link.href || '';
    const textContent = link.textContent || '';
    
    // Check if the link is a project link
    const isProjectLink = href.includes(textToFindProjects) &&
                         !href.includes(excludedText) &&
                         !href.endsWith(excludedRemix) &&
                         !href.endsWith(excludedCharacter) &&
                         textContent.includes(textToFindProjects);
    
    // Check if the link is a studio link
    const isStudioLink = href.includes(textToFindStudios) &&
                         textContent.includes(textToFindStudios);

    if (isProjectLink || isStudioLink) {
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
