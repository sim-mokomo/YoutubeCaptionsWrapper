export class Chrome {
    getCurrentTabSync() {
        return new Promise(resolve => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                resolve(tabs[0]);
            });
        });
    }
    sendMessageSync(tabId, sendObj) {
        return new Promise(resolve => {
            chrome.tabs.sendMessage(tabId, sendObj, response => {
                resolve(response);
            });
        });
    }
}
