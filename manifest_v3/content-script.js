"use strict";

const BARD = "bard";
const CGPT = "cgpt";

const aiToQuerySelector = {
  [BARD]: [`[data-placeholder="Enter a prompt here"]`, '[aria-label="Send message"]'],
  [CGPT]: [`#prompt-textarea`, '[data-testid="send-button"]'],
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  const [query, aiName] = request;
  const decodedQuery = decodeURI(query);
  typeQuery(decodedQuery, aiName, false);
});

function main() {
  const queryFromUrl = getQueryFromURL();
  if (queryFromUrl) {
    const currentURL = window.location.href;
    let aiName;
    if (currentURL.startsWith("https://bard.google.com")) {
      aiName = BARD;
    }
    else if (currentURL.startsWith("https://chat.openai.com")) {
      aiName = CGPT;
    }
    else {
      return;
    }
    window.addEventListener("load", () => {
      typeQuery(queryFromUrl, aiName, true);
    });
  }
}

async function typeQuery(query, aiName, isInitialPageLoad) {
  // Allow the page to fully load before trying to manipulate it.
  await (async () => {
    await new Promise(resolve => setTimeout(resolve, isInitialPageLoad === true ? 1500 : 0));
  })();
  const [ queryBox, button ] = aiToQuerySelector[aiName];
  if (aiName == BARD) {
    document.querySelector(queryBox).innerText = query;
    // Bard now waits for text to be entered before enabling the submit button.
    await new Promise(r => setTimeout(r, 200));
  }
  else if (aiName == CGPT) {
    document.querySelector(queryBox).value = query;
    document.querySelector(queryBox).dispatchEvent(new InputEvent("input", { bubbles: true }));
  }
  document.querySelector(button).click();
}

function getQueryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("hookMeUpBro");
}

main();
