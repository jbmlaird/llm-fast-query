"use strict";

const BARD = "bard";
const CGPT = "cgpt";

const aiToQuerySelector = {
  [BARD]: "#mat-input-0",
  [CGPT]: "#prompt-textarea"
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
  const queryBox = document.querySelector(aiToQuerySelector[aiName]);
  queryBox.value = query;
  queryBox.dispatchEvent(new Event("input", { bubbles: true }));
  queryBox.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
}

function getQueryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("hookMeUpBro");
}

main();
