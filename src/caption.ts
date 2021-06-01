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

}