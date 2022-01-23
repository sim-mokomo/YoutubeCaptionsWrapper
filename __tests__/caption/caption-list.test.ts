import {CaptionList} from "../../src/caption/caption-list";
import {Caption} from "../../src/caption/caption";

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

test('combinePerPeriod', ()=> {
    {
        const captionList = new CaptionList()
        captionList.addList(new Caption(0, '[MUSIC]'))
        captionList.addList(new Caption(3, '&gt;&gt; Kubernetes was founded almost seven years ago my guess,'))
        captionList.addList(new Caption(7, 'depending on when you start the clock when it'))
        captionList.addList(new Caption(9, 'publicly released or when development started.'))
        captionList.addList(new Caption(12, 'It was the three of us,'))
        captionList.addList(new Caption(14, 'Joe Beda, Craig McLuckie, and myself.'))

        const combinedCaptionList = captionList.combinePerPeriod()
        expect(combinedCaptionList.captions[0].renderSeconds).toBe(9)
        expect(combinedCaptionList.captions[0].text).toBe(
            '[MUSIC]\n' +
            '&gt;&gt; Kubernetes was founded almost seven years ago my guess,\n' +
            'depending on when you start the clock when it\n' +
            'publicly released or when development started.')
        expect(combinedCaptionList.captions[1].renderSeconds).toBe(14)
        expect(combinedCaptionList.captions[1].text).toBe(
            'It was the three of us,\nJoe Beda, Craig McLuckie, and myself.'
        )
    }

    {
        const captionList = new CaptionList()
        captionList.addList(new Caption(0, '[MUSIC]'))
        captionList.addList(new Caption(3, '&gt;&gt; Kubernetes was founded almost seven years ago my guess,'))
        captionList.addList(new Caption(7, 'depending on when you start the clock when it'))
        captionList.addList(new Caption(9, 'publicly released or when development started.'))
        captionList.addList(new Caption(12, 'It was the three of us,'))
        captionList.addList(new Caption(14, 'Joe Beda, Craig McLuckie, and myself'))

        const combinedCaptionList = captionList.combinePerPeriod()
        expect(combinedCaptionList.captions[0].renderSeconds).toBe(9)
        expect(combinedCaptionList.captions[0].text).toBe(
            '[MUSIC]\n' +
            '&gt;&gt; Kubernetes was founded almost seven years ago my guess,\n' +
            'depending on when you start the clock when it\n' +
            'publicly released or when development started.')
        expect(combinedCaptionList.captions[1].renderSeconds).toBe(14)
        expect(combinedCaptionList.captions[1].text).toBe(
            'It was the three of us,\nJoe Beda, Craig McLuckie, and myself'
        )
    }
})
