import { DeeplConfig } from "../config/deepl-config.js";
import { FirebaseConfig } from "../config/firebase-config.js";
import { ConfigsRepository } from "../config/configs-repository.js";
const deeplAPIKeyInputDOM = document.getElementById("deepl-key-input");
const firebaseAPIKeyInputDOM = document.getElementById("firebase-apikey-input");
const authDomainInputDOM = document.getElementById("auth-domain-input");
const projectIDInputDOM = document.getElementById("project-id-input");
const storageBucketInputDOM = document.getElementById("storage-bucket-input");
const messagingSenderIDInputDOM = document.getElementById("messaging-sender-id-input");
const appIDInputDOM = document.getElementById("app-id-input");
const measurementIDInputDOM = document.getElementById("measurement-id-input");
function saveOptions() {
    const deepLConfig = new DeeplConfig();
    deepLConfig.deepLAPIKey = deeplAPIKeyInputDOM.value;
    const firebaseConfig = new FirebaseConfig();
    firebaseConfig.apiKey = firebaseAPIKeyInputDOM.value;
    firebaseConfig.authDomain = authDomainInputDOM.value;
    firebaseConfig.projectId = projectIDInputDOM.value;
    firebaseConfig.storageBucket = storageBucketInputDOM.value;
    firebaseConfig.messagingSenderId = messagingSenderIDInputDOM.value;
    firebaseConfig.appId = appIDInputDOM.value;
    firebaseConfig.measurementId = measurementIDInputDOM.value;
    chrome.storage.sync.set({
        deepL_config: JSON.stringify(deepLConfig),
        firebase_config: JSON.stringify(firebaseConfig)
    }, () => {
        console.log("save configs");
    });
}
async function loadOptions() {
    const repository = new ConfigsRepository();
    const deepLConfig = await repository.loadDeepLConfig();
    const firebaseConfig = await repository.loadFirebaseConfig();
    applyDeepLConfigView(deepLConfig);
    applyFirebaseConfigView(firebaseConfig);
}
function applyDeepLConfigView(config) {
    deeplAPIKeyInputDOM.value = config.deepLAPIKey;
}
function applyFirebaseConfigView(config) {
    firebaseAPIKeyInputDOM.value = config.apiKey;
    authDomainInputDOM.value = config.authDomain;
    projectIDInputDOM.value = config.projectId;
    storageBucketInputDOM.value = config.storageBucket;
    messagingSenderIDInputDOM.value = config.messagingSenderId;
    appIDInputDOM.value = config.appId;
    measurementIDInputDOM.value = config.measurementId;
}
document.addEventListener('DOMContentLoaded', loadOptions);
const saveButtonDOM = document.getElementById("save");
if (saveButtonDOM) {
    saveButtonDOM.addEventListener("click", saveOptions);
}
