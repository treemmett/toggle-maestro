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

export {};
