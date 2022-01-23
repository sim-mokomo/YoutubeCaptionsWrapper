export class Youtube
{
    static getCurrentUrlVideoId() : string {
        return this.getVideoIdFromUrl(location.href)
    }

    static getVideoIdFromUrl(url:string) : string{
        let videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId
    }

    static getCurrentCaptionLanguage() : string {
        // note: フォーマット例: <div id="label-text" class="style-scope yt-dropdown-menu">英語</div>
        const captionLanguageDOM = document.getElementById("label-text")
        const language = captionLanguageDOM != null ? captionLanguageDOM.innerText : ""
        return language
    }
}