chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === 'updateDisabledIcon') {
        chrome.browserAction.setIcon({path: "../icons/toolbar-disabled-128x128.png"});
    }
    else if (request === 'updateEnabledIcon') {
        chrome.browserAction.setIcon({path: "../icons/toolbar-128x128.png"});
    }
});
  