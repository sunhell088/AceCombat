var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Kurt on 2018/11/21.
 */
//静默加载模块资源管理器
var SilentLoadResManager = (function () {
    function SilentLoadResManager(resGroupOrder) {
        //当前需要静默加载的资源组列表
        this.loadResList = null;
        //当前正在静默加载的资源组
        this.currentLoadingName = null;
        this.loadResList = [].concat(resGroupOrder);
    }
    Object.defineProperty(SilentLoadResManager, "instance", {
        get: function () {
            if (!SilentLoadResManager._instance)
                SilentLoadResManager._instance = new SilentLoadResManager(CommonConst.RES_GROUP_ORDER);
            return SilentLoadResManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    //顺序静默加载指定模块
    SilentLoadResManager.prototype.startSilentLoad = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //不要判断this.loadResList是否有内容,要由其他调用的地方来保证
        this.currentLoadingName = this.loadResList.shift();
        // CommonUtil.log("Silent load Res start, resName: " + this.currentLoadingName);
        RES.loadGroup(this.currentLoadingName);
    };
    //加载完成
    SilentLoadResManager.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == this.currentLoadingName) {
            // CommonUtil.log("Silent load Res complete, resName: " + event.groupName);
            this.currentLoadingName = null;
            if (this.loadResList.length > 0) {
                this.startSilentLoad();
            }
            else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            }
        }
        else {
            var resIndex = this.loadResList.indexOf(event.groupName);
            //其他地方提前加载了需静默加载的资源, 从还未静默加载里去掉
            if (resIndex >= 0) {
                CommonUtil.log("Silent load Res had been complete by other program, resName : " + event.groupName);
                this.loadResList.splice(resIndex, 1);
            }
        }
    };
    //加载进度显示
    SilentLoadResManager.prototype.onResourceProgress = function (event) {
    };
    //加载单个资源出错
    SilentLoadResManager.prototype.onItemLoadError = function (event) {
        console.log("SilentLoadResManager 加载单个资源出错, Url:" + event.resItem.url);
    };
    //加载组资源出错
    SilentLoadResManager.prototype.onResourceLoadError = function (event) {
        console.log("SilentLoadResManager 加载组资源出错  Group:" + event.groupName);
        this.startSilentLoad();
    };
    return SilentLoadResManager;
}());
__reflect(SilentLoadResManager.prototype, "SilentLoadResManager");
