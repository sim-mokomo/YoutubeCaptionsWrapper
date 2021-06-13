import { Youtube } from "../../utility/youtube.js";
export class CurrentPageVideoIdRequest {
    constructor(parameterJson) {
    }
    Response() {
        return {
            videoId: Youtube.getCurrentUrlVideoId()
        };
    }
}
