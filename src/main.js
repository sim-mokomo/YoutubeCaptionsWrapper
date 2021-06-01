import { CaptionList } from "./caption-list.js";
import { Caption } from "./caption.js";
import { Connection } from "./connection.js";
import { AppConfig } from "./app-config.js";
window.addEventListener("load", function () {
    const videos = document.getElementsByTagName("video");
    if (videos.length <= 0) {
        return;
    }
    // todo: 文字起こしから翻訳ファイルを作成する
    const appConfig = new AppConfig;
    Connection.postRequest(appConfig.deepLAPIKey, "https://api-free.deepl.com/v2/translate");
    const captionList = new CaptionList;
    captionList.addList(new Caption(0, "2019年の間、インターネット上のゲームの言説に注目していた方や"));
    captionList.addList(new Caption(3, "2020,"));
    captionList.addList(new Caption(4, "あなたは、空想上の種に関する議論が繰り返されていることに気づいているかもしれません。"));
    captionList.addList(new Caption(999999, ""));
    console.log(JSON.stringify(captionList, null, "\t"));
    const video = videos[0];
    video.ontimeupdate = (event) => {
        // memo: caption-window
        // css では left を無効, mergin-leftを無効, width 100%を追加で一面の字幕
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
        console.log(`current time ${seconds}`);
        const translatedTexts = captionList
            .findCaptionBySeconds(seconds)
            .getMoldingText();
        const captions = document.getElementsByClassName("ytp-caption-segment");
        for (let i = 0; i < captions.length; i++) {
            const caption = captions[i];
            // todo: 字幕は差し替えた後に表示させるように
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
