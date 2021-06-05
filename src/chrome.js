export class Chrome {
    getCurrentTab(callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            callback(tabs[0]);
        });
    }
}
