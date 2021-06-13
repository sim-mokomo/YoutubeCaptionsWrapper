export class Youtube {
    static getCurrentUrlVideoId() {
        return this.getVideoIdFromUrl(location.href);
    }
    static getVideoIdFromUrl(url) {
        let videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    }
    static getCurrentCaptionLanguage() {
        const captionLanguageDOM = document.getElementById("label-text");
        const language = captionLanguageDOM != null ? captionLanguageDOM.innerText : "";
        return language;
    }
}
