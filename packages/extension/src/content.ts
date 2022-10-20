console.log('wow', window.location.href);
chrome.runtime.sendMessage({ manifest: global.__MAESTRO_EXTENSION_MANIFEST__ });

export {};
