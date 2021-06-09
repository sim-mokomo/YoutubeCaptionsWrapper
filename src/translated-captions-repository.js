export class TranslatedCaptionsRepository {

    constructor() {
        this.db = firebase.firestore()
    }
    
    hasCaption(videoId, language){
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

    getCaptionsJson(videoId, language) {
        return new Promise(resolve => {
            this.db
                .collection("translated_captions")
                .doc(videoId)
                .collection("Languages")
                .doc(language)
                .get()
                .then(x => {
                    resolve(x.data()["captions"])
                })
        })
    }

    saveCaptionsJson(videoId, language, captionList){
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
