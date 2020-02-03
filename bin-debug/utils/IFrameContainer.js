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
 * WebView
 * 适配FIXED_WIDTH、FIXED_HEIGHT、NO_BORDER、SHOW_ALL四种缩放模式
 * 暂未考虑屏幕大小改变、屏幕旋转以及单页面多Webplay实例的情形
 * Created by yxiao on 2015/9/30.
 */
var IFrameContainer = (function (_super) {
    __extends(IFrameContainer, _super);
    /**
     * @param src
     */
    function IFrameContainer(iFrameName) {
        var _this = _super.call(this) || this;
        _this._x = 0;
        _this._y = 0;
        _this._width = 0;
        _this._height = 0;
        _this._src = "";
        _this._scaleMode = egret.MainContext.instance.stage.scaleMode;
        _this._iframeWrapper = null;
        _this._iframe = null;
        _this.iFrameName = iFrameName;
        var parentDom = document.getElementById("StageDelegateDiv");
        // //设置大厅canvas父节点的层比自己的canvas层高（iframe里的游戏全屏时，依然可以看到大厅的返回按钮）----但在点击事件处要处理点击层级关系
        // if (window.location.toString().indexOf("localhost") < 0) {
        //     parentDom.style.zIndex = "1";
        //     (<NodeListOf<HTMLCanvasElement>>document.getElementsByTagName("canvas"))[0].style.zIndex = "2";
        // }
        _this._iframeWrapper = document.getElementById("iframe-wrapper" + _this.iFrameName);
        if (!_this._iframeWrapper) {
            _this._iframeWrapper = document.createElement("div");
            _this._iframeWrapper.style.display = "none";
            _this._iframeWrapper.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;overflow-y: scroll;'; //解决iframe在ios下的显示问题
            _this._iframeWrapper.id = "iframe-wrapper" + _this.iFrameName;
            parentDom.appendChild(_this._iframeWrapper);
        }
        _this._iframeWrapper.style.opacity = "0";
        var iframe = document.createElement("iframe");
        // iframe.src=src;
        iframe.id = "webview-iframe-" + _this.iFrameName;
        iframe.name = "webview-iframe-" + _this.iFrameName;
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.opacity = "0";
        iframe.style.display = 'none';
        iframe.frameBorder = '0';
        iframe.border = "0";
        // this._iframeWrapper.appendChild(iframe);
        _this._iframe = iframe;
        // this._iframe=<HTMLIFrameElement>document.getElementById("webview-iframe-"+t);
        var self = _this;
        _this._iframe.onload = function () {
            self._iframeWrapper.style.opacity = "1";
            self._iframe.style.opacity = "1";
            ObserverManager.sendNotification(IFrameContainer.IFRAME_ONLOAD, self._iframe);
        };
        _this._stageW = egret.MainContext.instance.stage.stageWidth;
        _this._stageH = egret.MainContext.instance.stage.stageHeight;
        _this._windowW = window.innerWidth;
        _this._windowH = window.innerHeight;
        _this._designH = parseInt(parentDom.parentElement.attributes['data-content-height'].value);
        _this._designW = parseInt(parentDom.parentElement.attributes['data-content-width'].value);
        var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, _this._windowW, _this._windowH, _this._designW, _this._designH);
        _this._displayH = stageSize.displayHeight;
        _this._displayW = stageSize.displayWidth;
        return _this;
    }
    IFrameContainer.prototype.show = function (src) {
        if (src.indexOf("?") > 0) {
            src += "&versionTime=" + window["mainMinJSVer"];
        }
        else {
            src += "?versionTime=" + window["mainMinJSVer"];
        }
        this._iframe.style.display = 'block';
        this._iframeWrapper.style.display = 'block';
        this._iframe.src = src;
        this._iframeWrapper.appendChild(this._iframe);
        return this._iframe.contentWindow;
    };
    IFrameContainer.prototype.destroy = function () {
        if (this._iframe) {
            ObserverManager.sendNotification(IFrameContainer.IFRAME_DESTROY, this._iframe);
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.removeChild(this._iframe);
        }
    };
    //获得正在显示中的iframe对象
    IFrameContainer.prototype.getShowingIFrame = function () {
        if (this._iframeWrapper.style.display == "none")
            return null;
        return this._iframe;
    };
    Object.defineProperty(IFrameContainer.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframe.width = this._width / this._stageW * this._windowW + "px";
                this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                }
                else {
                    this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IFrameContainer.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframe.height = this._height / this._stageH * this._windowH + "px";
                this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                }
                else {
                    this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IFrameContainer.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                }
                else {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IFrameContainer.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                }
                else {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IFrameContainer.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    //iframe加载成功，分发消息
    IFrameContainer.IFRAME_ONLOAD = "onIFrameOnload";
    //iframe关闭
    IFrameContainer.IFRAME_DESTROY = "onIFrameDestroy";
    return IFrameContainer;
}(egret.DisplayObjectContainer));
__reflect(IFrameContainer.prototype, "IFrameContainer");
