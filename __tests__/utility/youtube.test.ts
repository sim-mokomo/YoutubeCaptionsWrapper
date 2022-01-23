import {Youtube} from "../../src/utility/youtube";

test('getVideoIdFromUrl:単発動画URLからビデオIDを取得', () => {
    expect(Youtube.getVideoIdFromUrl('https://www.youtube.com/watch?v=Z4kkTI4OFqs'))
        .toBe('Z4kkTI4OFqs')
})

test('getVideoIdFromUrl:リストの動画URLからビデオIDを取得', () =>{
    expect(Youtube.getVideoIdFromUrl('https://www.youtube.com/watch?v=Y92XOjNxBXs&list=RDCMUCzXjPL7zo0bxhOYDxLJ9YEg&index=2'))
        .toBe('Y92XOjNxBXs')
})