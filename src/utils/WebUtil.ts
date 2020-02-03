/**
 * 统一web访问类(如：http)
 * 请使用静态方法load
 * */
class WebUtil extends egret.HttpRequest {
    private _callBack:Function;
    private _thisObj:any;
    public isRunning:boolean = false;
    public isDisposed:boolean = false;
    private static _netWorkers:WebUtil[] = [];

    public constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE, this.onClomplet, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoErr, this);
    }

    public call(url:string, data:any, callBack:Function, thisObj:any = null, method:string = egret.HttpMethod.POST):void {
        this.isRunning = true;
        this._callBack = callBack;
        this._thisObj = thisObj;
        this.open(url, method);
        this.send(data);
    }

    public dispose() {
        this.isRunning = false;
        this.abort();
        this.isDisposed = true;
        this._callBack = null;
        this.addEventListener(egret.Event.COMPLETE, this.onClomplet, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoErr, this);
    }

    protected onIoErr(e:egret.IOErrorEvent):void {
        this.isRunning = false;
        if (this._callBack != null)
            this._callBack.apply(this._thisObj, [null]);
        this.response = null;
        this._callBack = null;
        this._thisObj = null;
        console.log(e.toString());
    }

    protected onClomplet(e:egret.Event):void {
        this.isRunning = false;
        if (this._callBack != null)
            this._callBack.apply(this._thisObj, [this.response]);
        this._callBack = null;
        this._thisObj = null;
    }

    public static load(url:string, data:any = "", callBack:Function = null, thisObj:any = null, method:string = egret.HttpMethod.POST, dataFormat:string = egret.HttpResponseType.TEXT):void {
        var one:WebUtil;
        var worker:WebUtil;
        for (var i:number = WebUtil._netWorkers.length - 1; i >= 0; i--) {
            one = WebUtil._netWorkers[i];
            if (one.isRunning == false) {
                worker = one;
                break;
            }
        }
        if (worker == null) {
            worker = new WebUtil();
            WebUtil._netWorkers.push(worker);
        }
        worker.responseType = dataFormat;
        worker.call(url, data, callBack, thisObj, method);
    }

    //发送Http请求
    public static httpRequest(url:string, data:any, callbackFuc:Function = null, thisObj:any = null, httpMethod:string = egret.HttpMethod.POST,
                              error_callbackFuc:Function = null):void {
        var request = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE, callbackFuc, thisObj);
        if(!error_callbackFuc){
            var resendTime:number = 10;
            error_callbackFuc = function () {
                ViewManager.instance.showFlowHint(Game.getLanguage("httpRequestError"));
                egret.setTimeout(function () {
                    ViewManager.instance.alert(Game.getLanguage("httpRequestError_resend"), WebUtil.httpRequest, thisObj, false, false, resendTime,
                        url, data, callbackFuc, thisObj, httpMethod, error_callbackFuc);
                }, null, 3000);
            }
        }
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error_callbackFuc, thisObj);
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, httpMethod);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data);
    }
}

