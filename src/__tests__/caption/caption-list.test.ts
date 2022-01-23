import {CaptionList} from "../../caption/caption-list";
import {Caption} from "../../caption/caption";

test('addList', () => {
    const captionList = new CaptionList()
    captionList.addList(new Caption(1, 'test'))
    expect(captionList.length()).toBe(1)
})

test('empty', () => {
    const captionList = new CaptionList()
    expect(captionList.empty()).toBeTruthy()

    captionList.addList(new Caption(1, ''))
    expect(captionList.empty()).toBeFalsy()
})

test('findCaptionBySeconds', ()=>{
    const captionList = new CaptionList()
    captionList.addList(new Caption(15, 'test2'))
    captionList.addList(new Caption(10, 'test1'))

    {
        const caption = captionList.findCaptionBySeconds(10)
        expect(caption.text).toBe('test1')
        expect(caption.renderSeconds).toBe(10)
    }

    {
        const caption = captionList.findCaptionBySeconds(15)
        expect(caption.text).toBe('test2')
        expect(caption.renderSeconds).toBe(15)
    }
})