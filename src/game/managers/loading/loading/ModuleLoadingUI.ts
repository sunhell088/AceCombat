class ModuleLoadingUI extends eui.Component {
    private bgRect:eui.Rect = new eui.Rect();
    private loadingIcon:eui.Image = null;
    private progressText:eui.Label = null;

    private loadingGroupName:string = null;
    private loadingGroupCallback:Function = null;

    //回调函数对应的this对象
    private callbackThisObj:any;
    private callbackParameters:any;

    //旧的还没加载完时，将新的缓存在这里
    private cacheLoadRequest:any[] = [];

    //记录出现loading图标的时间(用于至少保证有1秒的loading显示)
    private loadingStartTime:number = -1;

    public constructor() {
        super();
        this.bgRect.fillAlpha = 0.35;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.left = this.bgRect.right = this.bgRect.top = this.bgRect.bottom = 0;
        this.addChild(this.bgRect);

        this.loadingIcon = new eui.Image();
        this.progressText = new eui.Label("0%");
        this.progressText.size = 24;
        this.progressText.textColor = 0xFFFFFF;
        this.progressText.fontFamily = "Microsoft YaHei";
        this.progressText.textAlign = "center";
        this.progressText.horizontalCenter = 0;
        this.progressText.verticalCenter = 0;
        this.progressText.visible = false;

        var group:eui.Group = new eui.Group();
        group.width = egret.MainContext.instance.stage.stageWidth;
        group.height = egret.MainContext.instance.stage.stageHeight;
        group.addChild(this.loadingIcon);
        group.addChild(this.progressText);
        group.horizontalCenter = 0;
        group.verticalCenter = 0;
        this.addChild(group);
    }

    public loadModuleGroupRes(...parameters):void {
        this.cacheLoadRequest.push(arguments);
        //在加载第一个时,第二个来了,根据this.visible是否可见来判断是否加载完
        if (!this.visible) {
            this.startLoadGroupRes.apply(this, this.cacheLoadRequest[0]);
        }
    }

    private startLoadGroupRes(groupName:string, callback:Function, thisObj, ...parameters):void {
        if (this.loadingGroupName) {
            egret.warn(this.loadingGroupName + " is not loaded complete! Only one set of resources can be loaded simultaneously! new groupName is:" + groupName);
            return;
        }
        if (!this.loadingIcon.source) {
            this.loadingIcon.source = "moduleLoadingIcon_png";  //放这里是因为初始化时，图片还没加载好
            egret.callLater(function () {
                this.loadingIcon.scaleX = this.loadingIcon.scaleY = 0.4;
                this.loadingIcon.anchorOffsetX = this.loadingIcon.width / 2;
                this.loadingIcon.anchorOffsetY = this.loadingIcon.height / 2;
                this.loadingIcon.x = this.loadingIcon.parent.width / 2;
                this.loadingIcon.y = this.loadingIcon.parent.height / 2;
            }, this);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        this.progressText.text = "0%";
        this.loadingIcon.rotation = 0;
        egret.Tween.get(this.loadingIcon, {loop: true}).call(function () {
            this.loadingIcon.rotation += 30;
        }, this).wait(100);
        this.loadingGroupName = groupName;
        this.loadingGroupCallback = callback;
        this.callbackThisObj = thisObj;
        this.callbackParameters = parameters;
        if (this.loadingGroupName) {
            this.loadingStartTime = (new Date()).getTime();
            this.visible = true;
        }
        CommonUtil.log("ModuleLoading start, resName: " + groupName);
        RES.loadGroup(groupName);
    }

    //加载完成
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName != this.loadingGroupName) {
            CommonUtil.log("ModuleLoading complete listen!   Complete GroupName is:" + event.groupName + "  current moduleLoading resName is:" + this.loadingGroupName);
            return;
        }
        CommonUtil.log("ModuleLoading complete!        Complete GroupName is:" + event.groupName);
        var spendTime:number = (new Date()).getTime() - this.loadingStartTime;
        var delayTime:number = 1000 - spendTime;
        egret.setTimeout(function () {
            //这里this.callbackParameters取数组里0是因为经过了2次可变参数传递
            this.loadingGroupCallback.apply(this.callbackThisObj, this.callbackParameters[0]);
            this.reset();
            this.cacheLoadRequest.shift();
            if (this.cacheLoadRequest.length > 0) {
                this.startLoadGroupRes.apply(this, this.cacheLoadRequest[0]);
            }
        }, this, delayTime > 0 ? delayTime : 0);
    }

    //加载进度显示
    private onResourceProgress(event:RES.ResourceEvent):void {
        this.progressText.text = Math.ceil((event.itemsLoaded / event.itemsTotal) * 100) + "%";
    }

    //加载单个资源出错
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.log("加载单个资源出错, Url:" + event.resItem.url);
    }

    //加载组资源出错
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.log("加载组资源出错  Group:" + event.groupName);
        this.reset();
        var cache = this.cacheLoadRequest.shift();
        var pArr:any = [];
        pArr.push(Game.getLanguage("httpRequestError_resend"));
        pArr.push(ViewManager.instance.loadModuleGroupRes);
        pArr.push(ViewManager.instance);
        pArr.push(false);
        pArr.push(false);
        pArr.push(10);
        for (var key in cache) {
            pArr.push(cache[key]);
        }
        ViewManager.instance.alert.apply(ViewManager.instance, pArr);
    }

    private reset():void {
        this.callbackThisObj = null;
        this.callbackParameters = null;
        this.loadingGroupName = null;
        this.loadingGroupCallback = null;
        egret.Tween.removeTweens(this.loadingIcon);
        this.visible = false;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    }
}