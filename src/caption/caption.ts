export class Caption
{
    static empty : Caption = new Caption(0, "")
    renderSeconds : number
    text : string

    constructor(renderSeconds:number, text:string) {
        this.renderSeconds = renderSeconds
        this.text = text
    }

    getMoldingText() : string[] {
        const ret : string[] = []
        const maximumCharacterCountInRow = 42
        for(let i = 0; i < this.text.length / maximumCharacterCountInRow; i++){
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