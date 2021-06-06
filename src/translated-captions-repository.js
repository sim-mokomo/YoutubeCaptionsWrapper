export class TranslatedCaptionsRepository {
    getCaptionsJson(videoId) {
        return new Promise(resolve => {
            const db = firebase.firestore()
            db
                .collection("translated_captions")
                .doc(videoId)
                .get()
                .then(x => {
                    resolve(x.data()["captions"])
                })
        })
    }

    saveCaptionsJson(videoId, captionList){
        const db = firebase.firestore()
        db
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
