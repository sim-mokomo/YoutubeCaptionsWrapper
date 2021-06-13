import {Chrome} from "../utility/chrome.js"

async function run()
{
    chrome.runtime.onMessage.addListener(async (message) => {
        console.log(message)
        if(message.methodName == "onUpdateTranslatedProgress"){
            getProgressBar().value = message.value
        }
    })

    const translatedButton = document.getElementById("translated-by-deepL");
    if (translatedButton) {
        translatedButton.onclick = async () => {
            const tab = await new Chrome().getCurrentTabSync()
            if(tab.id == null){
                return
            }
            await applyTranslatedCaptionCSS(tab.id)
            await notifyConvert(tab.id)
        }
    }
}

void run()

function getProgressBar() : HTMLProgressElement {
    return (<HTMLProgressElement>document.getElementById("upload-translated-caption-progress-bar"))
}

async function notifyConvert(tabId:number) : Promise<void>{
    const customChrome = new Chrome()
    const tab = await customChrome.getCurrentTabSync()
    if(tab.id == null){
        return
    }

    await customChrome.sendMessageSync(tabId, {
        methodName: "onNotifyConvert"
    })
}

async function applyTranslatedCaptionCSS(tabId:number){
    const code =
        `.ytp-caption-segment{
                visibility: hidden;
            }
            
            .ytp-deepl-caption-segment{
                visibility: visible !important;
            }
        `
    // note: removeCSSが型定義ファイルに存在しない
    // @ts-ignore
    chrome.tabs.removeCSS(tabId, {code: code})
    chrome.tabs.insertCSS(tabId, {code: code})
}