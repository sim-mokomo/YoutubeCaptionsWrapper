export class Caption {
    constructor(renderSeconds, text) {
        this.renderSeconds = renderSeconds;
        this.text = Caption.decodeEntityReferenceCode(text);
    }
    static decodeEntityReferenceCode(text) {
        class EntityReferenceCode {
            constructor(reference, text) {
                this.reference = reference;
                this.text = text;
            }
        }
        const entityReferenceCodeList = [
            new EntityReferenceCode("&lt;", "<"),
            new EntityReferenceCode("&gt;", ">"),
            new EntityReferenceCode("&amp;", "&"),
            new EntityReferenceCode("&quot;", '"')
        ];
        entityReferenceCodeList.forEach(x => {
            const regex = new RegExp(x.reference, 'g');
            text = text.replace(regex, x.text);
        });
        return text;
    }
    getMoldingText(rowNum) {
        const ret = [];
        const maximumCharacterCountInRow = this.text.length / rowNum;
        for (let i = 0; i < rowNum; i++) {
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
    // todo: 名前と処理が一致していないのでリネームする
    static parseCaptionString(captionString) {
        return captionString
            .trim()
            .split('\n')
            .join(' ');
    }
}
Caption.empty = new Caption(0, "");
