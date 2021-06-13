import {IRequest} from "../request.js";
import {CaptionList} from "../../caption/caption-list";
import {Caption} from "../../caption/caption";

export class CurrentCaptionListRequest implements IRequest
{
    constructor(parameterJson:string) {

    }

    Response(): any {
        const body = document.getElementById("body");
        if (body == null) {
            return;
        }

        // note: 表示されている文字起こしを変換用の字幕に変換
        const captionContainer = body.getElementsByClassName("ytd-transcript-renderer")[0];
        const captions = new CaptionList()
        for (const caption of captionContainer.children) {
            if (caption.children[0].innerHTML) {
                const renderSeconds = Caption.parseSecondsString(caption.children[0].innerHTML)
                const text = Caption.parseCaptionString(caption.children[1].getElementsByClassName("cue ytd-transcript-body-renderer")[0].innerHTML)
                captions.addList(new Caption(renderSeconds,text))
            }
        }

        return { captionListJson: JSON.stringify(captions) }
    }
}