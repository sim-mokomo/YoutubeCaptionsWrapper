import {Caption} from "../../src/caption/caption";

test('decodeEntityReferenceCode: 実体参照符号を実体に差し替える', ()=>{
    expect(Caption.decodeEntityReferenceCode("&lt;")).toBe("<")
    expect(Caption.decodeEntityReferenceCode("&gt;")).toBe(">")
    expect(Caption.decodeEntityReferenceCode("&amp;")).toBe("&")
    expect(Caption.decodeEntityReferenceCode("&quot;")).toBe('"')
    expect(Caption.decodeEntityReferenceCode(
        "[MUSIC] &gt;&gt; Kubernetes was founded almost seven years ago my guess, depending on when you start the clock when it publicly released or when development started."))
            .toBe('[MUSIC] >> Kubernetes was founded almost seven years ago my guess, depending on when you start the clock when it publicly released or when development started.')
})

test('getMoldingText:1行キャプションが存在する場合に分割表示されないか', ()=>{
    const caption = new Caption(10, "01234567890123456789012345678901234567890123456789")
    const texts = caption.getMoldingText(1)
    expect(texts.length).toBe(1)
    expect(texts[0]).toBe('01234567890123456789012345678901234567890123456789')
})

test('getMoldingText:2行キャプションが存在する場合に分割表示されるか', ()=>{
    const caption = new Caption(10, "012345678901234567890123456789")
    const texts = caption.getMoldingText(2)
    expect(texts.length).toBe(2)
    expect(texts[0]).toBe('012345678901234')
    expect(texts[1]).toBe('567890123456789')
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