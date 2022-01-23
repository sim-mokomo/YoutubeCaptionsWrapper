import { Caption } from "./caption.js";
export class CaptionList {
    constructor() {
        this.captions = [];
    }
    addList(caption) {
        this.captions.push(caption);
    }
    empty() {
        return this.captions.length <= 0;
    }
    length() {
        return this.captions.length;
    }
    findCaptionBySeconds(seconds) {
        const caption = this.captions.find(x => x.renderSeconds == seconds);
        if (caption == null) {
            const nearMaxSecondsCaptionIndex = this.captions.findIndex(x => x.renderSeconds >= seconds);
            return this.captions[nearMaxSecondsCaptionIndex - 1];
        }
        return caption;
    }
    combinePerPeriod() {
        const combineCaptionList = new CaptionList();
        let caption = new Caption(0, '');
        this.captions.forEach(x => {
            caption.text += x.text;
            const endPeriod = x.text.endsWith('.');
            const isEndCaption = x.renderSeconds ==
                this.captions[this.captions.length - 1].renderSeconds;
            if (endPeriod || isEndCaption) {
                caption.renderSeconds = x.renderSeconds;
                combineCaptionList.addList(caption);
                caption = new Caption(0, '');
            }
            else {
                caption.text += ' ';
            }
        });
        return combineCaptionList;
    }
}
