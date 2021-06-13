import firebase from "firebase"
import {CaptionList} from "./caption-list";

export class TranslatedCaptionsRepository {
    db : firebase.firestore.Firestore

    constructor() {
        this.db = firebase.firestore()
    }

    hasCaption(videoId : string, language: string) : Promise<boolean> {
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .collection("Languages")
                .doc(language)
                .get()
                .then(x => {
                    resolve(x.exists)
                })
        })
    }

    getCaptionsJson(videoId:string, language:string) : Promise<string> {
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .collection("Languages")
                .doc(language)
                .get()
                .then(x => {
                    const data = x.data()
                    if(data == undefined){
                        return
                    }
                    resolve(data["captions"])
                })
        })
    }

    saveCaptionsJson(videoId:string, language:string, captionList:CaptionList) : Promise<void> {
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .collection("Languages")
                .doc(language)
                .set({captions: JSON.stringify(captionList)})
                .then(() => {
                    resolve()
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    resolve()
                    console.error("Error writing document: ", error);
                })
        })
    }
}
