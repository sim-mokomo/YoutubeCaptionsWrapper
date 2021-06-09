import { DeeplConfig } from "./deepl-config.js";
import { Connection } from "./connection.js";
import { ConfigsRepository } from "./configs-repository.js";
export class Deepl {
    constructor() {
        this.config = new DeeplConfig();
    }
    async initialize() {
        const repository = new ConfigsRepository();
        this.config = await repository.loadDeepLConfig();
    }
    translate(text, targetLanguage, callback) {
        Connection.postRequest(`auth_key=${this.config.deepLAPIKey}&text=${text}&target_lang=${targetLanguage}`, "https://api-free.deepl.com/v2/translate", response => {
            const obj = JSON.parse(response);
            callback(obj["translations"][0]["text"]);
        });
    }
    translateSync(text, targetLanguage) {
        return new Promise(resolve => {
            this.translate(text, targetLanguage, translatedText => {
                resolve(translatedText);
            });
        });
    }
}
