import { FirebaseConfig } from "./firebase-config.js";
export class FirebaseFacade {
    initialize() {
        const config = new FirebaseConfig();
        firebase.initializeApp({
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId,
            appId: config.appId,
            measurementId: config.measurementId
        });
    }
}
