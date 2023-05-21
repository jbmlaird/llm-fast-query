const BARD_BASE_URL = "https://bard.google.com/";
const CGPT_BASE_URL = "https://chat.openai.com/";

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // Ensure the request is being made from the address bar.
        if (details.type === "main_frame") {
            let url = removeProtocol(details.url);

            const bardMatch = url.match(/^bard\/(.*)/);
            if (bardMatch) {
              return generateRedirectUrl(BARD_BASE_URL, bardMatch);
            }

            const chatGptMatch = url.match(/^cgpt\/(.*)/);
            if (chatGptMatch) {
              return generateRedirectUrl(CGPT_BASE_URL, chatGptMatch);
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