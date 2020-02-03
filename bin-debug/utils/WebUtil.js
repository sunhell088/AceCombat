var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 统一web访问类(如：http)
 * 请使用静态方法load
 * */
var WebUtil = (function (_super) {
    __extends(WebUtil, _super);
    function WebUtil() {
        var _this = _super.call(this) || this;
        _this.isRunning = false;
        _this.isDisposed = false;
        _this.addEventListener(egret.Event.COMPLETE, _this.onClomplet, _this);
        _this.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onIoErr, _this);
        return _this;
    }
    WebUtil.prototype.call = function (url, data, callBack, thisObj, method) {
        if (thisObj === void 0) { thisObj = null; }
        if (method === void 0) { method = egret.HttpMethod.POST; }
        this.isRunning = true;
        this._callBack = callBack;
        this._thisObj = thisObj;
        this.open(url, method);
        this.send(data);
    };
    WebUtil.prototype.dispose = function () {
        this.isRunning = false;
        this.abort();
        this.isDisposed = true;
        this._callBack = null;
        this.addEventListener(egret.Event.COMPLETE, this.onClomplet, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoErr, this);
    };
    WebUtil.prototype.onIoErr = function (e) {
        this.isRunning = false;
        if (this._callBack != null)
            this._callBack.apply(this._thisObj, [null]);
        this.response = null;
        this._callBack = null;
        this._thisObj = null;
        console.log(e.toString());
    };
    WebUtil.prototype.onClomplet = function (e) {
        this.isRunning = false;
        if (this._callBack != null)
            this._callBack.apply(this._thisObj, [this.response]);
        this._callBack = null;
        this._thisObj = null;
    };
    WebUtil.load = function (url, data, callBack, thisObj, method, dataFormat) {
        if (data === void 0) { data = ""; }
        if (callBack === void 0) { callBack = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (method === void 0) { method = egret.HttpMethod.POST; }
        if (dataFormat === void 0) { dataFormat = egret.HttpResponseType.TEXT; }
        var one;
        var worker;
        for (var i = WebUtil._netWorkers.length - 1; i >= 0; i--) {
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
    };
    //发送Http请求
    WebUtil.httpRequest = function (url, data, callbackFuc, thisObj, httpMethod, error_callbackFuc) {
        if (callbackFuc === void 0) { callbackFuc = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (httpMethod === void 0) { httpMethod = egret.HttpMethod.POST; }
        if (error_callbackFuc === void 0) { error_callbackFuc = null; }
        var request = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE, callbackFuc, thisObj);
        if (!error_callbackFuc) {
            var resendTime = 10;
            error_callbackFuc = function () {
                ViewManager.instance.showFlowHint(Game.getLanguage("httpRequestError"));
                egret.setTimeout(function () {
                    ViewManager.instance.alert(Game.getLanguage("httpRequestError_resend"), WebUtil.httpRequest, thisObj, false, false, resendTime, url, data, callbackFuc, thisObj, httpMethod, error_callbackFuc);
                }, null, 3000);
            };
        }
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error_callbackFuc, thisObj);
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, httpMethod);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data);
    };
    WebUtil._netWorkers = [];
    return WebUtil;
}(egret.HttpRequest));
__reflect(WebUtil.prototype, "WebUtil");
