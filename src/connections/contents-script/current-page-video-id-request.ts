import {IRequest} from "../request.js";
import {Youtube} from "../../youtube.js";

export class CurrentPageVideoIdRequest implements IRequest
{
    constructor(parameterJson:string) {

    }

    Response(): any {
        return {
            videoId: Youtube.getCurrentUrlVideoId()
        }
    }
}