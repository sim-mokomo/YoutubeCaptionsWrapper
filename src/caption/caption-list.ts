import {Caption} from "./caption.js";

export class CaptionList {
    readonly captions : Caption[]

    constructor() {
        this.captions = []
    }

    addList(caption : Caption) : void {
        this.captions.push(caption)
    }

    empty() : boolean{
        return this.captions.length <= 0
    }

    length() :number{
        return this.captions.length
    }

    findCaptionBySeconds(seconds:number) : Caption{
        const caption = this.captions.find(x => x.renderSeconds == seconds)
        if(caption == null){
            const nearMaxSecondsCaptionIndex = this.captions.findIndex(x => x.renderSeconds >= seconds)
            return this.captions[nearMaxSecondsCaptionIndex - 1]
        }
        return caption
    }
}
