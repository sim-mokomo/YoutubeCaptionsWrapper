import {Caption} from "../../caption/caption";

test('getMoldingText:42文字以上の文字列が分割されているかどうか', ()=>{
    const caption = new Caption(10, "01234567890123456789012345678901234567890123456789")
    const texts = caption.getMoldingText()
    expect(texts[0]).toBe('012345678901234567890123456789012345678901')
    expect(texts[1]).toBe('23456789')
})

test('getMoldingText:42文字以下の文字列がそのまま返されているか', ()=>{
    const caption = new Caption(10, "01234567890123456789012345678901")
    const texts = caption.getMoldingText()
    expect(texts.length).toBe(1)
    expect(texts[0]).toBe('01234567890123456789012345678901')
})

test('parseSecondsString:時刻フォーマット文字列が渡されたときに現在の時刻を数値で返すように', () => {
    expect(Caption.parseSecondsString('00:00')).toBe(0)
    expect(Caption.parseSecondsString('00:10')).toBe(10)
    expect(Caption.parseSecondsString('01:20')).toBe(80)
    expect(Caption.parseSecondsString('11:20')).toBe(680)
})

test('parseCaptionString:文言から改行を削除し、空白を追加することを確認', () => {
    expect(Caption.parseCaptionString('test1\ntest2\ntest3\ntest4')).toBe('test1 test2 test3 test4')
    expect(Caption.parseCaptionString('')).toBe('')
})