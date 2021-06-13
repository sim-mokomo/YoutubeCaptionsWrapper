export class CurrentCaptionLanguageRequest {
    constructor(parameterJson) {
    }
    Response() {
        const captionDOM = document.getElementById("label-text");
        return {
            language: captionDOM != null ?
                captionDOM.innerText :
                ""
        };
    }
}
