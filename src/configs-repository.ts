import {DeeplConfig} from "./deepl-config.js";
import {FirebaseConfig} from "./firebase-config.js";

export class ConfigsRepository
{
    loadDeepLConfig(){
        chrome.storage.sync.get({
            deepL_config: "",
            firebase_config: ""
        }, (items) => {
            const deepLConfigJson = items["deepL_config"];
            if (deepLConfigJson.length > 0) {
                return JSON.parse(deepLConfigJson);
            }
        });
        return new DeeplConfig()
    }

    loadFirebaseConfig(){
        chrome.storage.sync.get({
            deepL_config: "",
            firebase_config: ""
        }, (items) => {
            const firebaseConfigJson = items["firebase_config"];
            if (firebaseConfigJson.length > 0) {
                return JSON.parse(firebaseConfigJson);
            }
        });
        return new FirebaseConfig()
    }
}