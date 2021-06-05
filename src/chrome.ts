export class Chrome
{
    getCurrentTab(callback: (tab:chrome.tabs.Tab)=>void ): void{
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            callback(tabs[0])
        })
    }
}