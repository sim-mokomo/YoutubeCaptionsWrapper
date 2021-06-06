import { Deepl } from "./deepl.js";
import {CaptionList} from "./caption-list.js";
import {Caption} from "./caption.js";
import {FirebaseFacade} from "./firebase-facade.js";
import {Chrome} from "./chrome.js"
import {TranslatedCaptionsRepository} from "./translated-captions-repository.js";

const firebaseFacade = new FirebaseFacade()
firebaseFacade.initialize()

const translatedButton = document.getElementById("translated-by-deepL");
if (translatedButton) {
    translatedButton.onclick = () => {
        new Chrome().getCurrentTabSync(tab => {
            chrome.tabs.sendMessage(tab.id, {
                methodName: "createTranslatedCaptions"
            }, response => {
                // note: 日本語に変換する
                const deepL = new Deepl()
                const translatedCaptions = new CaptionList()

                for (const captionObj of response.captionObjs) {
                    console.log(`${captionObj.second} ${captionObj.content}`)
                    deepL.translate(captionObj.content, "JA", translatedText => {
                        console.log(`${captionObj.second} ${translatedText}`)
                        const seconds = parseInt(captionObj.second)
                        const translatedCaption = new Caption(seconds, translatedText)
                        translatedCaptions.addList(translatedCaption)

                        if(translatedCaptions.captions.length == response.captionObjs.length){
                            translatedCaptions.captions.sort((x,y) => {return x.renderSeconds - y.renderSeconds})
                            console.log(translatedCaptions)
                            // import firebase from "firebase"
                            const db = firebase.firestore()
                            db
                                .collection("translated_captions")
                                .doc(response.videoId)
                                .set({captions: JSON.stringify(translatedCaptions)})
                                .then(() => {
                                    console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });
                        }
                    })
                }
            });
        })
    };
}

const replaceButton = document.getElementById("replace-by-deepL")
if(replaceButton){
    replaceButton.onclick = async () =>{
        const chrome = new Chrome()
        const tab = await chrome.getCurrentTabSync()
        const response = await chrome.sendMessageSync(tab.id, {
            methodName: "requestReplaceCaptions"
        })

        const videoId = response.videoId
        console.log(`${videoId} で字幕を差し替え`)

        const json = await new TranslatedCaptionsRepository().getCaptionsJson(videoId)
        console.log(json)

        await chrome.sendMessageSync(tab.id, {
            methodName: "sendReplaceCaptionsData",
            captionListJson: json
        })
    }
}
