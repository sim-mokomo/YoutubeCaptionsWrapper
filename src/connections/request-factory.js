var _a;
import { CurrentPageVideoIdRequest } from "./contents-script/current-page-video-id-request.js";
import { CurrentCaptionLanguageRequest } from "./contents-script/current-caption-language-request";
export class RequestFactory {
    create(request) {
        switch (request.methodName) {
            case RequestFactoryRequest.Type.CurrentPageVideoID:
                return new CurrentPageVideoIdRequest(request.parameterJson);
            case RequestFactoryRequest.Type.CurrentCaptionLanguageRequest:
                return new CurrentCaptionLanguageRequest(request.parameterJson);
            default:
                return null;
        }
    }
}
export class RequestFactoryRequest {
    constructor(methodName, parameterJson) {
        this.methodName = methodName;
        this.parameterJson = parameterJson;
    }
}
RequestFactoryRequest.Type = (_a = class extends RequestFactoryRequest {
    },
    _a.CurrentPageVideoID = "requestCurrentPageVideoId",
    _a.CurrentCaptionLanguageRequest = "requestCaptionLanguage",
    _a);
