export class CaptionList {
    constructor() {
        this.list = [];
    }
    addList(caption) {
        this.list.push(caption);
    }
    findCaptionBySeconds(seconds) {
        const caption = this.list.find(x => x.renderSeconds == seconds);
        if (caption == null) {
            const nearMaxSecondsCaptionIndex = this.list.findIndex(x => x.renderSeconds >= seconds);
            return this.list[nearMaxSecondsCaptionIndex - 1];
        }
        return caption;
    }
}
