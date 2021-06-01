export class Connection
{
    static postRequest(parameter : string, url :string) : void {
        const request = new XMLHttpRequest()
        request.onload = function (){
            if(request.readyState === request.DONE){
                if(request.status === 200){
                    console.log(request.response)
                    console.log(request.responseText)
                }
            }
        }
        console.log(parameter)
        request.open("POST", url, false);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        request.send(parameter)
    }
}

