import {AppConfig} from "./app-config.js";
import {Connection} from "./connection.js";

export class Deepl
{
    appConfig : AppConfig

    constructor() {
        this.appConfig = new AppConfig()
    }

    translate(text:string, targetLanguage:string, callback: (translatedText:string)=>void){
        Connection.postRequest(
    `auth_key=${this.appConfig.deepLAPIKey}&text=${text}&target_lang=${targetLanguage}`,
    "https://api-free.deepl.com/v2/translate",
            response => {
                const obj = JSON.parse(response)
                callback(obj["translations"][0]["text"])
            })
    }
}