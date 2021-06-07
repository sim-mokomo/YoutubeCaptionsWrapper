import {ConfigsRepository} from "./configs-repository.js";

export class TranslatedCaptionsRepository {

    constructor() {
        this.db = firebase.firestore()
    }

    // todo: jsonであることを意識しない実装にする
    hasCaption(videoId){
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .get()
                .then(x => {
                    resolve(x.exists)
                })
        })
    }

    getCaptionsJson(videoId) {
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .get()
                .then(x => {
                    resolve(x.data()["captions"])
                })
        })
    }

    saveCaptionsJson(videoId, captionList){
        this.db
            .collection("translated_captions")
            .doc(videoId)
            .set({captions: JSON.stringify(captionList)})
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
    }
}
