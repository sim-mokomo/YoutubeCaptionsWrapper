'use strict';

void (async () => {
    const CaptionModule = await import(chrome.runtime.getURL("caption.js"));
    const CaptionListModule = await import(chrome.runtime.getURL("caption-list.js"));
    let captionList = new CaptionListModule.CaptionList();

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if(message.methodName == "createTranslatedCaptions"){
            sendResponse(createTranslatedCaptions());
        }else if(message.methodName == "requestReplaceCaptions"){
            const videoId = getVideoId()
            sendResponse({
                videoId: videoId
            })
        }else if(message.methodName == "sendReplaceCaptionsData"){
            Object.assign(captionList, JSON.parse(message.captionListJson["captions"]))
            captionList.addList(new CaptionModule.Caption(999999, ""));
            sendResponse({})
        }
        return true;
    });
    window.addEventListener("load", function () {
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
            const targetCaption = new CaptionModule.Caption(0, "");
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
    }, false);
})();


function createTranslatedCaptions() {
    const body = document.getElementById("body");
    if (body == null) {
        return;
    }
    let videoId = getVideoId()
    // note: 表示されている文字起こしを変換用の字幕に変換
    const captionContainer = body.getElementsByClassName("ytd-transcript-renderer")[0];
    const captionObjs = [];
    for (const caption of captionContainer.children) {
        if (caption.children[0].innerHTML) {
            const captionSecondNumbers = caption
                .children[0]
                .innerHTML
                .trim()
                .split(':')
                .map(x => parseInt(x));
            const captionSecond = captionSecondNumbers[0] * 60 + captionSecondNumbers[1];
            const captionContent = caption
                .children[1]
                .getElementsByClassName("cue ytd-transcript-body-renderer")[0]
                .innerHTML
                .trim()
                .split('\n')
                .join(' ');
            const captionObj = {
                second: captionSecond,
                content: captionContent
            };
            captionObjs.push(captionObj);
        }
    }

    return {
        videoId: videoId,
        captionObjs: captionObjs
    }
}

function getVideoId(){
    const url = location.href;
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId
}