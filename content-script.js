const BARD = "bard";
const CGPT = "cgpt";

const aiToQuerySelector = {
    [BARD]: "#mat-input-0",
    [CGPT]: "#prompt-textarea"
}

function main() {
    const query = getQueryFromURL();
    if (query) {
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
            typeQuery(query, aiName);
        });
    }
}

// Type the query into the AI's query box and press enter.
async function typeQuery(query, aiName) {
    // Allow the page to fully load before trying to manipulate it.
    await (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    })();
    const queryBox = document.querySelector(aiToQuerySelector[aiName]);
    queryBox.value = query;
    queryBox.dispatchEvent(new Event("input", { bubbles: true }));
    queryBox.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
}

// Extract the query from the URL.
function getQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("hookMeUpBro");
}

main();
