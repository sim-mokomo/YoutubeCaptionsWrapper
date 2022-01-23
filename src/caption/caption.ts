export class Caption
{
    static empty : Caption = new Caption(0, "")
    renderSeconds : number
    text : string

    constructor(renderSeconds:number, text:string) {
        this.renderSeconds = renderSeconds
        this.text = Caption.decodeEntityReferenceCode(text)
    }

    static decodeEntityReferenceCode(text: string) : string{
        class EntityReferenceCode {
            reference : string
            text : string

            constructor(reference:string, text:string) {
                this.reference = reference
                this.text = text
            }
        }

        const entityReferenceCodeList = [
            new EntityReferenceCode("&lt;", "<"),
            new EntityReferenceCode("&gt;", ">"),
            new EntityReferenceCode("&amp;", "&"),
            new EntityReferenceCode("&quot;", '"')
        ]

        entityReferenceCodeList.forEach(x => {
            const regex = new RegExp(x.reference, 'g')
            text = text.replace(regex, x.text)
        })
        return text
    }

    getMoldingText(rowNum:number) : string[] {
        const ret : string[] = []
        const maximumCharacterCountInRow = this.text.length / rowNum;
        for(let i = 0; i < rowNum; i++){
            ret.push(this.text.substr(i * maximumCharacterCountInRow, maximumCharacterCountInRow))
        }
        return ret
    }

    // note: 想定されるformat は 00:00
    static parseSecondsString(secondsString: string) : number
    {
        const numbers = secondsString
            .trim()
            .split(':')
            .map(x => parseInt(x));
        return numbers[0] * 60 + numbers[1]
    }

    // todo: 名前と処理が一致していないのでリネームする
    static parseCaptionString(captionString: string) : string
    {
        return captionString
            .trim()
            .split('\n')
            .join(' ');
    }
}