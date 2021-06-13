import {IRequest} from "../request.js";

export class CurrentCaptionLanguageRequest implements IRequest
{
    constructor(parameterJson:string) {

    }

    Response(): any {
        const captionDOM = document.getElementById("label-text")
        return {
            language: captionDOM != null ?
                captionDOM.innerText :
                ""
        }
    }
}