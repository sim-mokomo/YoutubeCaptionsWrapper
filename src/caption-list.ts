import {Caption} from "./caption.js";

export class CaptionList {
    readonly list : Caption[]

    constructor() {
        this.list = []
    }

    addList(caption : Caption) : void {
        this.list.push(caption)
    }

    findCaptionBySeconds(seconds:number) : Caption{
        const caption = this.list.find(x => x.renderSeconds == seconds)
        if(caption == null){
            const nearMaxSecondsCaptionIndex = this.list.findIndex(x => x.renderSeconds >= seconds)
            return this.list[nearMaxSecondsCaptionIndex - 1]
        }
        return caption
    }
}
