if (document.body.querySelector(".toolbar-menu-administration .toolbar-menu") === null) {
    chrome.runtime.sendMessage('updateDisabledIcon', function(response) {});
}
else {
    if (!document.body.classList.contains('path-admin')) {
        document.body.querySelector('#toolbar-administration').style.display = 'none';
        document.body.classList.remove('toolbar-icon-9','gin--dark-mode', 'gin--vertical-toolbar', 'toolbar-tray-open', 'toolbar-fixed', 'toolbar-vertical', 'toolbar-horizontal');
        document.body.style.paddingTop = 0;
    }

    chrome.runtime.sendMessage('updateEnabledIcon', function(response) {});
}

