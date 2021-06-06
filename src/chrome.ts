export class Chrome
{
    getCurrentTabSync(): Promise<chrome.tabs.Tab>{
        return new Promise(resolve => {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                resolve(tabs[0])
            })
        })
    }

    sendMessageSync(tabId:number, sendObj:any) : Promise<any>{
        return new Promise(resolve => {
            chrome.tabs.sendMessage(tabId,sendObj, response => {
                resolve(response)
            })
        })
    }
}