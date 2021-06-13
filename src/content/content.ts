import {CaptionList} from "../caption/caption-list.js";
import {Caption} from "../caption/caption.js";
import {TranslatedCaptionsRepository} from "../caption/translated-captions-repository";
import {Youtube} from "../utility/youtube";
import {Utility} from "../utility/firebase";
import {Deepl} from "../utility/deepl";
import {Chrome} from "../utility/chrome";

async function run() {
    await Utility.Firebase.initialize()

    let captionList = new CaptionList()
    chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
        if(message.methodName == "onNotifyConvert"){
            const videoId = Youtube.getCurrentUrlVideoId()
            const captionLanguage = Youtube.getCurrentCaptionLanguage()
            const hasCaption = await new TranslatedCaptionsRepository().hasCaption(videoId, captionLanguage)
            if(hasCaption) {
                await replaceByJapaneseCaption(Youtube.getCurrentCaptionLanguage())
                notifyUpdateTranslatedProgress(100)
            }else{
                const currentCaptionList = getCurrentCaptionList()
                const japaneseCaptionList = await createTranslatedCaptionList(currentCaptionList,
                        translatedCaptionList => {
                    const progress = (translatedCaptionList.length() / currentCaptionList.length()) * 100
                    notifyUpdateTranslatedProgress(progress)
                })
                await saveTranslatedCaptionList(japaneseCaptionList, videoId, captionLanguage)
                await replaceByJapaneseCaption(Youtube.getCurrentCaptionLanguage())
            }
        }
        return false
    });

    const videos = document.getElementsByTagName("video");
    if (videos.length <= 0) {
        return;
    }

    const video = videos[0];
    video.ontimeupdate = (event) => {
        const captionWindows = document.getElementsByClassName("caption-window");
        if (captionWindows.length > 0) {
            const captionWindow = captionWindows[0];
            captionWindow.setAttribute("style", `touch-action:none;
                    text-align: center;
                    bottom: 2%;
                    left:0%;
                    margin-left:0px;
                    width:100%;`);
        }
        const seconds = Math.trunc(video.currentTime);
        if (captionList.empty()) {
            return;
        }
        const targetCaption = new Caption(0, "");
        Object.assign(targetCaption, captionList.findCaptionBySeconds(seconds))
        const translatedTexts = targetCaption.getMoldingText();
        const captions = document.getElementsByClassName("ytp-caption-segment");
        for (let i = 0; i < captions.length; i++) {
            const caption = captions[i];
            caption.classList.add("ytp-deepl-caption-segment");
            caption.setAttribute("style", `
                    display: inline-block;
                    white-space: pre-wrap;
                    background: rgba(8, 8, 8, 0.75);
                    font-size: 20px;
                    color: rgb(255, 255, 255);
                    fill: rgb(255, 255, 255);
                    font-family: "YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif;
                    width:100%
                `);
            if (i < translatedTexts.length) {
                caption.innerHTML = translatedTexts[i];
            }
            else {
                caption.innerHTML = "";
            }
        }
    };

    async function replaceByJapaneseCaption(originLanguage:string) {
        const json = await new TranslatedCaptionsRepository().getCaptionsJson(
            Youtube.getCurrentUrlVideoId(),
            originLanguage)
        Object.assign(captionList, JSON.parse(json))
    }

    function createTranslatedCaptionList(
        originCaptionList:CaptionList,
        perTranslatedCallback: (translatedCaptionList: CaptionList) => void) : Promise<CaptionList>{
        return new Promise(async resolve => {
            const deepL = new Deepl()
            await deepL.initialize()
            const translatedCaptionList = new CaptionList()
            for (const caption of originCaptionList.captions) {
                deepL.translate(caption.text, "JA", translatedText => {
                    translatedCaptionList.addList(new Caption(caption.renderSeconds, translatedText))
                    if(translatedCaptionList.length() == originCaptionList.length()) {
                        resolve(translatedCaptionList)
                    }
                    perTranslatedCallback(translatedCaptionList)
                })
            }
        })
    }

    async function saveTranslatedCaptionList(captionList: CaptionList, videoId:string, originLanguage:string) {
        captionList.captions.sort((x,y) => {return x.renderSeconds - y.renderSeconds})
        const captionRepository = new TranslatedCaptionsRepository()
        await captionRepository.saveCaptionsJson(videoId, originLanguage , captionList)
    }

    function notifyUpdateTranslatedProgress(progress:number){
        chrome.runtime.sendMessage({
            methodName: "onUpdateTranslatedProgress",
            value: progress
        })
    }

    function getCurrentCaptionList() : CaptionList
    {
        const body = document.getElementById("body");
        if (body == null) {
            return new CaptionList();
        }

        // note: 表示されている文字起こしを変換用の字幕に変換
        const captionContainer = body.getElementsByClassName("ytd-transcript-renderer")[0];
        const captions = new CaptionList()
        for (const caption of captionContainer.children) {
            if (caption.children[0].innerHTML) {
                const renderSeconds = Caption.parseSecondsString(caption.children[0].innerHTML)
                const text = Caption.parseCaptionString(caption.children[1].getElementsByClassName("cue ytd-transcript-body-renderer")[0].innerHTML)
                captions.addList(new Caption(renderSeconds,text))
            }
        }

        return captions
    }
}

void run()

