import { Deepl } from "../utility/deepl.js";
import { CaptionList } from "../caption/caption-list.js";
import { Caption } from "../caption/caption.js";
import { Chrome } from "../utility/chrome.js";
import { TranslatedCaptionsRepository } from "../caption/translated-captions-repository.js";
import { ConfigsRepository } from "../config/configs-repository.js";
import firebase from "firebase";
import { RequestFactoryRequest } from "../connections/request-factory.js";
import { CaptionListReceiver } from "../connections/contents-script/caption-list-receiver.js";
async function run() {
    const configRepository = new ConfigsRepository();
    console.log("initializing firebase");
    const config = await configRepository.loadFirebaseConfig();
    firebase.initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
        measurementId: config.measurementId
    });
    console.log("initialize firebase");
    const progressBar = getProgressBar();
    progressBar.value = 0;
    const translatedButton = document.getElementById("translated-by-deepL");
    if (translatedButton) {
        translatedButton.onclick = async () => {
            const tab = await new Chrome().getCurrentTabSync();
            if (tab.id == null) {
                return;
            }
            applyDeepLCaptionCSS(tab.id);
            const videoId = await getCurrentPageVideoId(tab.id);
            const captionsRepository = new TranslatedCaptionsRepository();
            const captionLanguage = await getCaptionLanguageSync(tab.id);
            const hasCaption = await captionsRepository.hasCaption(videoId, captionLanguage);
            if (hasCaption) {
                // note: 字幕を取得
                progressBar.value = 100;
                void await requestReplaceCaptions();
            }
            else {
                // note: 字幕を作る
                void await createReplaceCaptions();
                void await requestReplaceCaptions();
            }
        };
    }
}
void run();
async function getCaptionLanguageSync(tabId) {
    const response = await new Chrome().sendMessageSync(tabId, {
        methodName: RequestFactoryRequest.Type.CurrentCaptionLanguageRequest
    });
    return response.language;
}
async function getCurrentPageVideoId(tabId) {
    const response = await new Chrome().sendMessageSync(tabId, {
        methodName: RequestFactoryRequest.Type.CurrentPageVideoID
    });
    return response.videoId;
}
async function createReplaceCaptions() {
    const customChrome = new Chrome();
    const tab = await customChrome.getCurrentTabSync();
    if (tab.id == undefined) {
        return;
    }
    const response = await customChrome.sendMessageSync(tab.id, {
        methodName: RequestFactoryRequest.Type.CurrentCaptionListRequest
    });
    const captionList = new CaptionList();
    Object.assign(captionList, JSON.parse(response.captionListJson));
    const videoId = await getCurrentPageVideoId(tab.id);
    const captionLanguage = await getCaptionLanguageSync(tab.id);
    const progressBar = getProgressBar();
    await translateCaptionProcess(captionList, videoId, captionLanguage, translatedCaptions => {
        progressBar.value = (translatedCaptions.captions.length / captionList.captions.length) * 100;
    });
}
async function translateCaptionProcess(originCaptionList, videoId, originLanguage, perTranslateCallback) {
    const deepL = new Deepl();
    await deepL.initialize();
    const translatedCaptions = new CaptionList();
    return new Promise(resolve => {
        for (const caption of originCaptionList.captions) {
            deepL.translate(caption.text, "JA", async (translatedText) => {
                translatedCaptions.addList(new Caption(caption.renderSeconds, translatedText));
                console.log(`${caption.renderSeconds} : ${caption.text}`);
                if (translatedCaptions.captions.length == originCaptionList.captions.length) {
                    translatedCaptions.captions.sort((x, y) => { return x.renderSeconds - y.renderSeconds; });
                    console.log("completed translated");
                    const captionRepository = new TranslatedCaptionsRepository();
                    await captionRepository.saveCaptionsJson(videoId, originLanguage, translatedCaptions);
                    resolve();
                }
                perTranslateCallback(translatedCaptions);
            });
        }
    });
}
async function requestReplaceCaptions() {
    const customChrome = new Chrome();
    const tab = await customChrome.getCurrentTabSync();
    if (tab.id == null) {
        return;
    }
    const videoId = await getCurrentPageVideoId(tab.id);
    console.log(`${videoId} で字幕を差し替え`);
    const captionLanguage = await getCaptionLanguageSync(tab.id);
    const json = await new TranslatedCaptionsRepository().getCaptionsJson(videoId, captionLanguage);
    console.log(json);
    if (tab.id == undefined) {
        return;
    }
    await customChrome.sendMessageSync(tab.id, {
        methodName: CaptionListReceiver.requestMethodName,
        captionListJson: json
    });
}
function getProgressBar() {
    return document.getElementById("upload-translated-caption-progress-bar");
}
function applyDeepLCaptionCSS(tabId) {
    const code = `.ytp-caption-segment{
                visibility: hidden;
            }
            
            .ytp-deepl-caption-segment{
                visibility: visible !important;
            }
        `;
    // note: removeCSSが型定義ファイルに存在しない
    // @ts-ignore
    chrome.tabs.removeCSS(tabId, {
        code: code
    });
    chrome.tabs.insertCSS(tabId, {
        code: code
    });
}
