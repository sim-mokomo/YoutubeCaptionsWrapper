import { CaptionList } from "../caption/caption-list.js";
import { RequestFactory, RequestFactoryRequest } from "../connections/request-factory.js";
import { Caption } from "../caption/caption.js";
async function run() {
    let captionList = new CaptionList();
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.methodName == "requestCurrentPageCaptionList") {
            const request = new RequestFactory().create(new RequestFactoryRequest(RequestFactoryRequest.Type.CurrentCaptionListRequest, ""));
            sendResponse(request?.Response());
        }
        else if (message.methodName == "sendReplaceCaptionsData") {
            Object.assign(captionList, JSON.parse(message.captionListJson));
            captionList.addList(new Caption(999999, ""));
            return false;
        }
        else if (message.methodName == "requestCurrentPageVideoId") {
            const request = new RequestFactory().create(new RequestFactoryRequest(RequestFactoryRequest.Type.CurrentPageVideoID, ""));
            sendResponse(request?.Response());
        }
        else if (message.methodName == "requestCaptionLanguage") {
            const request = new RequestFactory().create(new RequestFactoryRequest(RequestFactoryRequest.Type.CurrentCaptionLanguageRequest, ""));
            sendResponse(request?.Response());
        }
        return true;
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
