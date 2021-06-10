import { Youtube } from "../../youtube.js";
export class CurrentPageVideoIdRequest {
    constructor(parameterJson) {
    }
    Response() {
        return {
            videoId: Youtube.getCurrentUrlVideoId()
        };
    }
}
