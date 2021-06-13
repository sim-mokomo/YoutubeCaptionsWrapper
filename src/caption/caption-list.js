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
}
