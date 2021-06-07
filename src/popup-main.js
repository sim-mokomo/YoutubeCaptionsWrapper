import { Deepl } from "./deepl.js";
import {CaptionList} from "./caption-list.js";
import {Caption} from "./caption.js";
import {Chrome} from "./chrome.js"
import {TranslatedCaptionsRepository} from "./translated-captions-repository.js";
import {ConfigsRepository} from "./configs-repository.js";

const configRepository = new ConfigsRepository()
console.log("initializing firebase")
const config = await configRepository.loadFirebaseConfig()
firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
});

console.log("initialize firebase")

const translatedButton = document.getElementById("translated-by-deepL");
if (translatedButton) {
    translatedButton.onclick = async () => {
        }
    }
}

async function getCurrentPageVideoId(tabId) {
    const response = await new Chrome().sendMessageSync(tabId, {
        methodName: "requestCurrentPageVideoId"
    })
    return response.videoId
}

async function createReplaceCaptions() {
    const customChrome = new Chrome()
    const tab = await customChrome.getCurrentTabSync()
    const response = await customChrome.sendMessageSync(tab.id, {
        methodName: "requestCurrentPageCaptionList"
    })
    const captionList = new CaptionList()
    Object.assign(captionList,JSON.parse(response.captionListJson))

    const videoId = await getCurrentPageVideoId(tab.id)
    // note: 日本語に変換する
    const deepL = new Deepl()
    const translatedCaptions = new CaptionList()
    for (const caption of captionList.captions) {
        deepL.translate(caption.text, "JA", translatedText => {
            translatedCaptions.addList(new Caption(caption.renderSeconds, translatedText))
            console.log(`${caption.renderSeconds} : ${caption.text}`)
            if(translatedCaptions.captions.length == captionList.captions.length) {
                translatedCaptions.captions.sort((x,y) => {return x.renderSeconds - y.renderSeconds})
                console.log("completed translated")
                new TranslatedCaptionsRepository().saveCaptionsJson(videoId, translatedCaptions)
            }
        })
    }
}

async function requestReplaceCaptions() {
    const customChrome = new Chrome()
    const tab = await customChrome.getCurrentTabSync()
    const videoId = await getCurrentPageVideoId(tab.id)
    console.log(`${videoId} で字幕を差し替え`)

    const json = await new TranslatedCaptionsRepository().getCaptionsJson(videoId)
    console.log(json)
    await customChrome.sendMessageSync(tab.id, {
        methodName: "sendReplaceCaptionsData",
        captionListJson: json
    })
}

