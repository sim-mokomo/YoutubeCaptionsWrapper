export class Connection
{
    static postRequest(parameter : string, url :string, callback: (translatedText:string)=>void) : void {
        const request = new XMLHttpRequest()
        request.onload = function (){
            if(request.readyState === request.DONE){
                if(request.status === 200){
                    console.log(request.responseText)
                    callback(request.responseText)
                }
            }
        }
        console.log(parameter)
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        request.send(parameter)
    }
}

