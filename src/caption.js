export class Caption {
    constructor(renderSeconds, text) {
        this.renderSeconds = renderSeconds;
        this.text = text;
    }
    getMoldingText() {
        const ret = [];
        const maximumCharacterCountInRow = 42;
        for (let i = 0; i < this.text.length / maximumCharacterCountInRow; i++) {
            ret.push(this.text.substr(i * maximumCharacterCountInRow, maximumCharacterCountInRow));
        }
        return ret;
    }
}
Caption.empty = new Caption(0, "");
