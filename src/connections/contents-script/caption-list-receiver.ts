import {CaptionList} from "../../caption/caption-list";
import {Caption} from "../../caption/caption";

export class CaptionListReceiver {
    static requestMethodName = "sendCaptionList"
    callback: (json: string) => void

    constructor(receiveCallback: (CaptionList: CaptionList) => void) {
        this.callback = (json: string) => {
            const captionList: CaptionList = new CaptionList()
            Object.assign(captionList, JSON.parse(json))
            captionList.addList(new Caption(999999, ""));
            receiveCallback(captionList)
        }
    }

    receive(json: string) {
        this.callback(json)
    }
}