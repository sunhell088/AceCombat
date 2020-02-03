/**
 * Created by Kurt on 2018/11/21.
 */
//静默加载模块资源管理器
class SilentLoadResManager {
    private static _instance:SilentLoadResManager;
    //当前需要静默加载的资源组列表
    private loadResList:string[] = null;
    //当前正在静默加载的资源组
    private currentLoadingName:string = null;

    public static get instance():SilentLoadResManager {
        if (!SilentLoadResManager._instance)
            SilentLoadResManager._instance = new SilentLoadResManager(CommonConst.RES_GROUP_ORDER);
        return SilentLoadResManager._instance;
    }

    public constructor(resGroupOrder:string[]) {
        this.loadResList = [].concat(resGroupOrder);
    }

    //顺序静默加载指定模块
    public startSilentLoad() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //不要判断this.loadResList是否有内容,要由其他调用的地方来保证
        this.currentLoadingName = this.loadResList.shift();
        // CommonUtil.log("Silent load Res start, resName: " + this.currentLoadingName);
        RES.loadGroup(this.currentLoadingName);
    }

    //加载完成
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == this.currentLoadingName) {
            // CommonUtil.log("Silent load Res complete, resName: " + event.groupName);
            this.currentLoadingName = null;
            if (this.loadResList.length > 0) {
                this.startSilentLoad();
            } else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            }
        } else {
            var resIndex:number = this.loadResList.indexOf(event.groupName);
            //其他地方提前加载了需静默加载的资源, 从还未静默加载里去掉
            if (resIndex >= 0) {
                CommonUtil.log("Silent load Res had been complete by other program, resName : " + event.groupName);
                this.loadResList.splice(resIndex, 1);
            }
        }
    }

    //加载进度显示
    private onResourceProgress(event:RES.ResourceEvent):void {
    }

    //加载单个资源出错
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.log("SilentLoadResManager 加载单个资源出错, Url:" + event.resItem.url);
    }

    //加载组资源出错
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.log("SilentLoadResManager 加载组资源出错  Group:" + event.groupName);
        this.startSilentLoad();
    }
}