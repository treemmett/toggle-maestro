const root = document.getElementById('root');

export async function boot() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;
  if (!root) return;

  root.innerText = 'Maestro not initialized';

  chrome.runtime.onMessage.addListener(() => {
    root.innerText = 'Maestro initialized';
  });

  chrome.scripting.executeScript({
    files: ['content.js'],
    target: { tabId: tab.id },
  });
}

boot();
