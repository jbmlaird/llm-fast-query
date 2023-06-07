# LLMFastQuery

Query popular web LLMs directly in your address bar with `bard/query` and `cgpt/query`.

You must be logged in to the LLM web UI for this to work.

**NOTE: This is a third party extension and is not associated with Google or OpenAI in any way.**

![demo showing the extension](https://i.imgur.com/uVkkxtI.gif)

## Installation

### Chrome Webstore

You can install the manifest v3 version of this extension directly from the Chrome
Webstore [here](https://chrome.google.com/webstore/detail/llmfastquery/gffndjjgopnaccnkmbjhogdighmifmmg).

### Source

You can install either manifest version from source:

1. `git clone https://github.com/jbmlaird/llm-fast-query.git`
2. In Chrome, go to chrome://extensions/
3. Click `Load Unpacked`
4. Navigate inside the folder where you downloaded `llm-fast-query`, open the `manifest_v2` or `manifest_v3` folder,
   then click `Select`
5. In your address bar type `bard/why is this extension so good?` or `cgpt/how is Josh Laird such a legend?`. Make sure
   you click the URL option, not the `Google Search` option

![url_not_google_search.jpg](https://i.imgur.com/bMDt1aU.jpeg)

## FAQ

**Why am I getting Google search results for `bard/` and `cgpt/` rather than being redirected?**

Make sure you're pressing the URL option, not the `Google Search` option (see step 5 above).

**Should I install Manifest v2 or v3 from source?**

Manifest v2 is deprecated
and [will be phased out in 2023](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E?pli=1).
In line with the security, privacy, and performance improvements with manifest V3, blocking web requests have been
replaced with the Declarative Net Request API (see
more [here](https://developer.chrome.com/docs/extensions/migrating/blocking-web-requests/)) which is more private.

**Why include manifest v2?**

I was curious how this would work in both versions. Both are included purely for academic reasons; one can see steps
required to migrate.

**Why is the code so bad?**

This was a quick side project and I only write JavaScript when I have to 💀

**Where are the tests?**

![you_write_tests_question_mark_meme](https://i.imgur.com/TcVlA8n.png)

**Why didn't you use the [Omnibox API](https://developer.chrome.com/docs/extensions/reference/omnibox) for a nicer user
experience?**

The Omnibox API allows you to directly manipulate the address bar like having `Search Bard` or `Search ChatGPT`:

![omnibox gif](https://i.imgur.com/wa0zTGG.gif)

Unfortunately, the Omnibox API [only supports one keyword](https://bugs.chromium.org/p/chromium/issues/detail?id=75890).
Ideally, I'd want a keyword for Bard and another keyword for ChatGPT that forwards to the relevant chat bot. However,
since only one keyword is supported, one would need to type in `llmq` (or some other keyword) then
`(bard|cgpt) how many Korok seeds are in Tears of the Kingdom?` and the extension would forward depending on the first
word. The user would need to remember an additional abbreviation ☠️

You can, however, set it up like in the GIF manually by using
[site search shortcuts](https://support.google.com/chrome/answer/95426).

1. Go to [chrome://settings/searchEngines](chrome://settings/searchEngines) in Chrome
2. Scroll down to Site Search and click `Add`

<img src="https://i.imgur.com/UcflC9E.png" width="60%" alt="site search page on Chrome">

3. Enter details for both Bard & ChatGPT as per the pictures:

<img src="https://i.imgur.com/vTj2Pn2.png" width="25%" alt="Bard details">
<img src="https://i.imgur.com/FTKMoE6.png" width="25%" alt="ChatGPT details">

4. Enter `bard` or `cgpt` into your address bar and press tab
5. Query away 🚀

**Will this extension work forever?**

Definitely not. As soon as the websites change the JS selector for their respective text box, this will break. Feel
free to ping me directly if that happens (jbmlaird@gmail.com) or create a PR! 