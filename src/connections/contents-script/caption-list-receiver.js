import { CaptionList } from "../../caption/caption-list";
import { Caption } from "../../caption/caption";
export class CaptionListReceiver {
    constructor(receiveCallback) {
        this.callback = (json) => {
            const captionList = new CaptionList();
            Object.assign(captionList, JSON.parse(json));
            captionList.addList(new Caption(999999, ""));
            receiveCallback(captionList);
        };
    }
    receive(json) {
        this.callback(json);
    }
}
CaptionListReceiver.requestMethodName = "sendCaptionList";
