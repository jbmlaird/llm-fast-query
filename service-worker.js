const BARD_BASE_URL = "https://bard.google.com/";
const CGPT_BASE_URL = "https://chat.openai.com/";

const BARD = "bard";
const CGPT = "cgpt";

let bardTabId;
let chatGptTabId;

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
        if (bardTabId === tabId) {
            getExistingTabIfExists(BARD_BASE_URL)
                .then(result => {
                    bardTabId = result;
                });
        } else if (chatGptTabId === tabId) {
            getExistingTabIfExists(CGPT_BASE_URL)
                .then(result => {
                    chatGptTabId = result;
                });
        }
    }
);

chrome.webRequest.onBeforeRequest.addListener(details => {
        // Ensure the request is being made from the address bar.
        if (details.type === "main_frame") {
            let url = removeProtocol(details.url);

            const bardMatch = url.match(/^bard\/(.*)/);
            if (bardMatch) {
              return handleUrlMatch(bardMatch, bardTabId, details.tabId, BARD, BARD_BASE_URL);
            }

            const chatGptMatch = url.match(/^cgpt\/(.*)/);
            if (chatGptMatch) {
              return handleUrlMatch(chatGptMatch, chatGptTabId, details.tabId, CGPT, CGPT_BASE_URL);
            }
        }
    },
    {
        urls: [
            "http://cgpt/*",
            "http://bard/*"
        ]
    },
    ["blocking"]
);

function handleUrlMatch(regexMatch, aiTabId, currentTabId, aiName, aiBaseUrl) {
  if (aiTabId !== undefined && aiTabId !== currentTabId) {
    chrome.tabs.update(aiTabId, { active: true });
    Promise.resolve(chrome.tabs.remove(currentTabId));
    chrome.tabs.sendMessage(aiTabId, [regexMatch[1], aiName]);
    return
  }
  updateAiVar(aiName, currentTabId);
  return generateRedirectUrl(aiBaseUrl, regexMatch);
}

function updateAiVar(aiName, newTabId) {
  if (aiName == BARD) {
    bardTabId = newTabId;
  } else if (aiName == CGPT) {
    chatGptTabId = newTabId;
  }
}

function getExistingTabIfExists(baseUrl) {
  return new Promise(resolve => {
    chrome.tabs.query({}, (tabs) => {
      const matchingTab = tabs.find((tab) => tab.url && tab.url.startsWith(baseUrl));
      const tabId = matchingTab ? matchingTab.id : undefined;
      resolve(tabId);
    });
  });
}

function generateRedirectUrl(baseUrl, match) {
    const query = match[1];
    if (query) {
        return { redirectUrl: `${baseUrl}?hookMeUpBro=${query}` };
    } else {
        return { redirectUrl: `${baseUrl}` };
    }
}

function removeProtocol(url) {
    url = url.replace(/^(https?:\/\/)/, '');
    return url;
}