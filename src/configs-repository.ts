import {DeeplConfig} from "./deepl-config.js";
import {FirebaseConfig} from "./firebase-config.js";

export class ConfigsRepository
{
    loadDeepLConfig() : Promise<DeeplConfig>{
        return new Promise(resolve => {
            chrome.storage.sync.get({
                deepL_config: "",
                firebase_config: ""
            }, (items) => {
                const json = items["deepL_config"];
                if (json.length > 0) {
                    const config = new DeeplConfig()
                    Object.assign(config, JSON.parse(json));
                    resolve(config)
                }
            });
        })
    }

    loadFirebaseConfig() : Promise<FirebaseConfig>{
        return new Promise(resolve => {
            chrome.storage.sync.get({
                deepL_config: "",
                firebase_config: ""
            }, (items) => {
                const json = items["firebase_config"];
                if (json.length > 0) {
                    const config = new FirebaseConfig()
                    Object.assign(config, JSON.parse(json));
                    resolve(config)
                }
            });
        })
    }
}