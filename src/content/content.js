import { CaptionList } from "../caption/caption-list.js";
import { RequestFactory, RequestFactoryRequest } from "../connections/request-factory.js";
import { Caption } from "../caption/caption.js";
import { CaptionListReceiver } from "../connections/contents-script/caption-list-receiver.js";
async function run() {
    let captionList = new CaptionList();
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        // note: req/res処理
        const request = new RequestFactory().create(new RequestFactoryRequest(message.methodName, ""));
        if (request != null) {
            sendResponse(request.Response());
            return true;
        }
        // note: receive 処理
        // todo: req/resと統合
        if (message.methodName == CaptionListReceiver.requestMethodName) {
            new CaptionListReceiver(receiveCaptionList => {
                captionList = receiveCaptionList;
            }).receive(message.captionListJson);
        }
        return false;
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
        Object.assign(targetCaption, captionList.findCaptionBySeconds(seconds));
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
    console.log("initialize content script");
}
void run();
