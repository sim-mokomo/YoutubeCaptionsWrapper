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
    // note: 想定されるformat は 00:00
    static parseSecondsString(secondsString) {
        const numbers = secondsString
            .trim()
            .split(':')
            .map(x => parseInt(x));
        return numbers[0] * 60 + numbers[1];
    }
    static parseCaptionString(captionString) {
        return captionString
            .trim()
            .split('\n')
            .join(' ');
    }
}
Caption.empty = new Caption(0, "");
