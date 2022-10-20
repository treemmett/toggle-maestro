/// <reference types="chrome"/>

chrome.runtime.onInstalled.addListener(() => {
  // Make extension work on all pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        actions: [new chrome.declarativeContent.ShowPageAction()],
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      },
    ]);
  });
});

export async function main() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;

    chrome.scripting.executeScript({
      files: ['content.js'],
      target: { tabId: tab.id },
    });
  });
}

main();
