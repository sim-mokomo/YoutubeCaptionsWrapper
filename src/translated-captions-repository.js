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
}
