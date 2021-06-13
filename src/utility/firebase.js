import { ConfigsRepository } from "../config/configs-repository";
import firebase from "firebase";
export var Utility;
(function (Utility) {
    class Firebase {
        static async initialize() {
            const config = await new ConfigsRepository().loadFirebaseConfig();
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
    Utility.Firebase = Firebase;
})(Utility || (Utility = {}));
