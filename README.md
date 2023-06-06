# LLMFastQuery

Query popular web LLMs directly in your address bar with `bard/query` and `cgpt/query`.

You must be logged in to the LLM web UI for this to work.

**NOTE: This is a third party extension and is not associated with Google or OpenAI in any way.**

![demo showing the extension](https://i.imgur.com/XELleYd.gif)

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
