import {IRequest} from "./request.js";
import {CurrentPageVideoIdRequest} from "./contents-script/current-page-video-id-request.js";
import {CurrentCaptionLanguageRequest} from "./contents-script/current-caption-language-request";

export class RequestFactory
{
    create(request : RequestFactoryRequest) : IRequest | null {
        switch (request.methodName){
            case RequestFactoryRequest.Type.CurrentPageVideoID :
                return new CurrentPageVideoIdRequest(request.parameterJson)
            case RequestFactoryRequest.Type.CurrentCaptionLanguageRequest:
                return new CurrentCaptionLanguageRequest(request.parameterJson)
            default:
                return null
        }
    }
}

export class RequestFactoryRequest
{
    methodName : string
    parameterJson : string

    constructor(methodName:string, parameterJson:string) {
        this.methodName = methodName
        this.parameterJson = parameterJson
    }

    public static Type = class extends RequestFactoryRequest {
        static CurrentPageVideoID = "requestCurrentPageVideoId"
        static CurrentCaptionLanguageRequest = "requestCaptionLanguage"
    }
}