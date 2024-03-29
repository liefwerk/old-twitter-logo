// ==UserScript==
// @name        Old twitter logo - twitter.com
// @namespace   Violentmonkey Scripts
// @match       https://twitter.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 7/24/2023, 11:38:49 AM
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

console.log('script loaded');

// The old twitter SVG icon
const oldTwitterSVG = '<g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>';

// Gets and replaces the new loading logo with the old one
const twitterLoaderLogo = document.querySelector('div[aria-label="Loading…"]');
twitterLoaderLogo.firstChild.innerHTML = oldTwitterSVG;

// Gets and replaces the new favicon with the old one
const twitterFaviconLogo = document.querySelector('link[rel~=icon]');
twitterFaviconLogo.href = "https://abs.twimg.com/favicons/twitter.2.ico";

const disconnectLogoLink = VM.observe(document.body, () => {

  // Gets the new twitter home logo (at the top left of the app)
  const twitterLogoLink = document.querySelector('a[aria-label="X"]');


  // Waits for the logo to appear
  if (twitterLogoLink) {

    const twitterLogoWrapper = twitterLogoLink.firstChild;

    for (const child of twitterLogoWrapper.children) {
      if(child.tagName == "svg") {
        // Replaces the new twitter logo with the old one
        child.innerHTML = oldTwitterSVG;
      }
    }

    // disconnect observer
    return true;
  }
});

const disconnectLogoLeftPanel = VM.observe(document.body, () => {
  // Gets the new twitter logo (from the left panel)
  const twitterLogoLeftPanel = document.querySelector('a[href~="/i/verified-choose"]');

  if (twitterLogoLeftPanel) {

    const twitterLogoLeftPanelWrapper = twitterLogoLeftPanel.firstChild;

    for (const child of twitterLogoLeftPanelWrapper.children) {
      if(child.tagName == "svg") {
        // Replaces the new twitter logo with the old one
        child.innerHTML = oldTwitterSVG;
      } else if (child.tagName == "DIV") {
        for (const grandchild of child.children) {
          if(grandchild.tagName == "svg") {
            // Replaces the new twitter logo with the old one
            grandchild.innerHTML = oldTwitterSVG;
          }
        }
      }
    }

    // disconnect observer
    return true;
  }

});

const disconnectTwitterTitle = VM.observe(document.body, () => {

  const twitterTitle = document.querySelector("title");

  if (twitterTitle) {
    const observer = new MutationObserver(() => {
      if (twitterTitle && twitterTitle.innerHTML.includes("/ X")) {

        const oldtwitterTitle = twitterTitle.innerHTML.replace("/ X", "/ Twitter");
        twitterTitle.innerHTML = oldtwitterTitle;

      } else if (twitterTitle && twitterTitle.innerHTML === "X") {
        const oldtwitterTitle = twitterTitle.innerHTML.replace("X", "Twitter");
        twitterTitle.innerHTML = oldtwitterTitle;
      }
    });

    observer.observe(twitterTitle, { subtree: true, childList: true });

    // disconnect observer
    return true;
  }
});
