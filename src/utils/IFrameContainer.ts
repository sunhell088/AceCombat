/**
 * WebView
 * 适配FIXED_WIDTH、FIXED_HEIGHT、NO_BORDER、SHOW_ALL四种缩放模式
 * 暂未考虑屏幕大小改变、屏幕旋转以及单页面多Webplay实例的情形
 * Created by yxiao on 2015/9/30.
 */
class IFrameContainer extends egret.DisplayObjectContainer {
    //iframe加载成功，分发消息
    public static IFRAME_ONLOAD:string = "onIFrameOnload";
    //iframe关闭
    public static IFRAME_DESTROY:string = "onIFrameDestroy";

    private iFrameName:string;

    private _x:number = 0;
    private _y:number = 0;
    private _width:number = 0;
    private _height:number = 0;
    private _src:string = "";

    private _scaleMode:string = egret.MainContext.instance.stage.scaleMode;
    private _stageW:number;
    private _stageH:number;
    private _windowW:number;
    private _windowH:number;
    private _displayH:number;
    private _displayW:number;
    private _designH:number;
    private _designW:number;

    private _iframeWrapper:HTMLDivElement = null;
    public _iframe:HTMLIFrameElement = null;

    /**
     * @param src
     */
    public constructor(iFrameName:string) {
        super();
        this.iFrameName = iFrameName;
        var parentDom:HTMLElement = document.getElementById("StageDelegateDiv");
        // //设置大厅canvas父节点的层比自己的canvas层高（iframe里的游戏全屏时，依然可以看到大厅的返回按钮）----但在点击事件处要处理点击层级关系
        // if (window.location.toString().indexOf("localhost") < 0) {
        //     parentDom.style.zIndex = "1";
        //     (<NodeListOf<HTMLCanvasElement>>document.getElementsByTagName("canvas"))[0].style.zIndex = "2";
        // }
        this._iframeWrapper = <HTMLDivElement>document.getElementById("iframe-wrapper" + this.iFrameName);
        if (!this._iframeWrapper) {
            this._iframeWrapper = document.createElement("div");
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;overflow-y: scroll;';//解决iframe在ios下的显示问题
            this._iframeWrapper.id = "iframe-wrapper" + this.iFrameName;
            parentDom.appendChild(this._iframeWrapper);
        }
        this._iframeWrapper.style.opacity = "0";

        var iframe = document.createElement("iframe");
        // iframe.src=src;
        iframe.id = "webview-iframe-" + this.iFrameName;
        iframe.name = "webview-iframe-" + this.iFrameName;
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.opacity = "0";
        iframe.style.display = 'none';
        iframe.frameBorder = '0';
        iframe.border = "0";
        // this._iframeWrapper.appendChild(iframe);

        this._iframe = iframe;
        // this._iframe=<HTMLIFrameElement>document.getElementById("webview-iframe-"+t);
        var self = this;
        this._iframe.onload = function () {
            self._iframeWrapper.style.opacity = "1";
            self._iframe.style.opacity = "1";

            ObserverManager.sendNotification(IFrameContainer.IFRAME_ONLOAD, self._iframe);
        }

        this._stageW = egret.MainContext.instance.stage.stageWidth;
        this._stageH = egret.MainContext.instance.stage.stageHeight;
        this._windowW = window.innerWidth;
        this._windowH = window.innerHeight;
        this._designH = parseInt(parentDom.parentElement.attributes['data-content-height'].value);
        this._designW = parseInt(parentDom.parentElement.attributes['data-content-width'].value);

        var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
        this._displayH = stageSize.displayHeight;
        this._displayW = stageSize.displayWidth;
    }

    public show(src):Window {
        if (src.indexOf("?") > 0) {
            src += "&versionTime=" + window["mainMinJSVer"];
        } else {
            src += "?versionTime=" + window["mainMinJSVer"];
        }
        this._iframe.style.display = 'block';
        this._iframeWrapper.style.display = 'block';
        this._iframe.src = src;
        this._iframeWrapper.appendChild(this._iframe);
        return this._iframe.contentWindow;
    }

    public destroy():void {
        if (this._iframe) {
            ObserverManager.sendNotification(IFrameContainer.IFRAME_DESTROY, this._iframe);
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.removeChild(this._iframe);
        }
    }

    //获得正在显示中的iframe对象
    public getShowingIFrame():HTMLIFrameElement {
        if (this._iframeWrapper.style.display == "none") return null;
        return this._iframe;
    }

    public get width():number {
        return this._width;
    }

    public set width(value:number) {
        this._width = value;
        if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
            this._iframe.width = this._width / this._stageW * this._windowW + "px";
            this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
        }
        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
            if (this._windowW == this._displayW) {
                this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            } else {
                this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
            }
        }
    }

    public get height():number {
        return this._height;
    }

    public set height(value:number) {
        this._height = value;
        if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
            this._iframe.height = this._height / this._stageH * this._windowH + "px";
            this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
        }
        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
            if (this._windowH == this._displayH) {
                this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            } else {
                this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
            }
        }
    }

    public set x(value:number) {
        this._x = value;
        if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
            this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
        }
        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
            if (this._windowW == this._displayW) {
                this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            } else {
                this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
            }
        }
    }

    public set y(value:number) {
        this._y = value;
        if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
            this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
        }
        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
            if (this._windowH == this._displayH) {
                this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            } else {
                this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
            }
        }
    }

    public get x():number {
        return this._x;
    }

    public get y():number {
        return this._y;
    }

    public get src():string {
        return this._src;
    }

    public set src(value:string) {
        this._src = value;
    }
}