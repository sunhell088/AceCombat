/**
 * 整个游戏时间的场景显示管理
 */
class ViewManager {
    private static _instance:ViewManager;

    //该Mediator生成的延时计时器（用于关闭时移除） MediatorName = number[]
    private timeoutKeyMapOnMediator:{} = {};
    //该Mediator生成的循环计时器（用于关闭时移除） MediatorName = number[]
    private intervalKeyMapOnMediator:{} = {};
    //该Mediator生成的骨骼动画（用于关闭时移除）MediatorName = dragonBones.EgretArmatureDisplay[]
    private armatureDisplayMapOnMediator:{} = {};
    //通过该工具类播放的动画(但还未通过该类释放)
    private dynamicArmatureDisplay:{} = {};

    //窗口是否处于激活状态(用于窗口休眠后停止音乐)
    public isWinActivate:boolean = true;
    private _window:Mediator[] = [];
    //所有显示层的容器（用于居中） （就是Main.ts）
    private otherLayerContainer:egret.DisplayObjectContainer;
    //场景层
    private sceneLayer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    //UI层
    private uiLayer:eui.UILayer = new eui.UILayer();
    //新手引导层
    private guideLayer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    //跑马灯公告层
    private noticeLayer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    //弹出提示框层
    private alertLayer:GameAlertUI;
    //启动游戏时的Loading层
    private loadingLayer:LoadingUI = new LoadingUI();
    //加载模块时的Loading层
    private moduleLoadingLayer:ModuleLoadingUI = new ModuleLoadingUI();
    //浮动提示框列表
    private flowHints:FlowHintUI[] = [];
    //弹出确认框
    private gameAlert:GameAlertUI = null;
    //跑马灯
    private topMessageUI:TopMessageUI = new TopMessageUI();

    public static get instance():ViewManager {
        if (!ViewManager._instance)
            ViewManager._instance = new ViewManager();
        return ViewManager._instance;
    }

    init(main:egret.DisplayObjectContainer) {
        main.stage.setContentSize(CommonConst.STAGE_WIDTH, CommonConst.STAGE_HEIGHT);
        this.sceneLayer.width = CommonConst.STAGE_WIDTH;
        this.sceneLayer.height = CommonConst.STAGE_HEIGHT;
        main.parent.addChildAt(this.sceneLayer, 0);
        this.sceneLayer.name = "sceneLayer";
        main.parent.addChildAt(this.uiLayer, 1);
        this.uiLayer.name = "uiLayer";

        this.otherLayerContainer = main;
        this.otherLayerContainer.name = "otherLayer";

        this.otherLayerContainer.addChild(this.guideLayer);
        this.guideLayer.name = "guideLayer";

        this.otherLayerContainer.addChild(this.noticeLayer);
        this.noticeLayer.name = "noticeLayer";

        this.otherLayerContainer.addChild(this.moduleLoadingLayer);
        this.moduleLoadingLayer.name = "moduleLoadingLayer";
        this.moduleLoadingLayer.visible = false;

        this.otherLayerContainer.addChild(this.loadingLayer);
        this.loadingLayer.name = "loadingLayer";

        this.onWindowResize();
        egret.MainContext.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onWindowResize, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onWindowResize, this);
        //监听浏览器焦点切换事件(用于失焦后停止声音)
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, this.onActivate, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeactivate, this);
    }

    //浏览器大小和宽高比发生变化时的处理（根据宽高比切换高对齐还是宽对齐）
    private onWindowResize():void {
        //偏长
        if (egret.MainContext.instance.stage.stageWidth == CommonConst.STAGE_WIDTH && egret.MainContext.instance.stage.stageHeight < CommonConst.STAGE_HEIGHT) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        //偏方
        else if (egret.MainContext.instance.stage.stageWidth < CommonConst.STAGE_WIDTH && egret.MainContext.instance.stage.stageHeight == CommonConst.STAGE_HEIGHT) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        //uiLayer里的子节点分辨率自适应
        for (var i = 0; i < this.uiLayer.numChildren; i++) {
            var ui = this.uiLayer.getChildAt(i);
            ui.width = egret.MainContext.instance.stage.stageWidth;
            ui.height = egret.MainContext.instance.stage.stageHeight;
        }
        //其他layer画面居中
        this.sceneLayer.width = egret.MainContext.instance.stage.stageWidth;
        this.sceneLayer.height = egret.MainContext.instance.stage.stageHeight;
        this.sceneLayer.x = 0;
        this.sceneLayer.y = 0;
        for (var i = 0; i < this.sceneLayer.numChildren; i++) {
            var ui = this.sceneLayer.getChildAt(i);
            ui.width = ui.parent.width;
            ui.height = ui.parent.height;
            ui.x = 0;
            ui.y = 0;
        }

        this.otherLayerContainer.width = egret.MainContext.instance.stage.stageWidth;
        this.otherLayerContainer.height = egret.MainContext.instance.stage.stageHeight;
        this.otherLayerContainer.x = 0;
        this.otherLayerContainer.y = 0;
        for (var i = 0; i < this.otherLayerContainer.numChildren; i++) {
            var subLayer:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.otherLayerContainer.getChildAt(i);
            subLayer.width = subLayer.parent.width;
            subLayer.height = subLayer.parent.height;
            subLayer.x = 0;
            subLayer.y = 0;
        }
        
        this.topMessageUI.onWindowResize();
    }

    private onActivate(e:egret.Event):void {
        ViewManager.instance.isWinActivate = true;
        SoundManager.instance.playMusic();
    }

    private onDeactivate(e:egret.Event):void {
        ViewManager.instance.isWinActivate = false;
        SoundManager.instance.stopMusic();
    }

    public OPEN_WINDOW(mediatorClass:any, bRetainFormer:boolean = false, ...parameters):void {
        if (!bRetainFormer) {
            this.closeAllWindow();
        }
        var newMediator:Mediator = ObserverManager.registerMediator(mediatorClass);
        if (this._window.indexOf(newMediator) != -1) return;
        this._window.push(newMediator);
        newMediator.open.apply(newMediator, parameters);
    }

    //关闭UI窗口(mediatorClass默认为空，表示关闭所有窗口)
    public CLOSE_WINDOW(mediatorClass:any = null):void {
        //如果制定了关闭的窗口Mediator则只关该指定窗口
        if (mediatorClass) {
            var mediator = ObserverManager.getMediator(mediatorClass);
            if (!mediator) {
                egret.error(egret.getQualifiedClassName(mediatorClass) + "  has not been registered!");
                return;
            }
            var index = this._window.indexOf(mediator);
            if (index == -1) {
                return;
            }
            this.closeMediator(this._window[index]);
            this._window.splice(index, 1);
        } else {
            this.closeAllWindow();
        }
    }

    //只用于类似RPG游戏的场景层的切换
    public REPLACE_SCENE(newMediatorClass:any, targetMediatorClass:any):void {
        var newMediator:Mediator = ObserverManager.getMediator(newMediatorClass);
        if (this._window.indexOf(newMediator) != -1) return;

        var targetMediator = ObserverManager.getMediator(targetMediatorClass);
        var targetIndex = this._window.indexOf(targetMediator);
        if (targetIndex == -1) return;
        this.closeMediator(this._window[targetIndex]);
        this._window.splice(targetIndex, 1);

        this._window.push(newMediator);
        newMediator.open();
    }

    private closeAllWindow():void {
        for (var key in this._window) {
            if (this._window[key]) {
                this.closeMediator(this._window[key]);
            }
        }
        this._window.length = 0;
    }

    //添加到对应的显示layer（bMask表示是否在UI后添加半透明遮挡）
    public addElement(child:egret.DisplayObject, depth:number = ViewDepth.UI):void {
        var layer:egret.DisplayObjectContainer = this.getLayer(depth);
        if (depth == ViewDepth.UI) {
            child.width = egret.MainContext.instance.stage.stageWidth;
            child.height = egret.MainContext.instance.stage.stageHeight;
        }
        layer.addChild(child);
    }

    public removeElement(child:egret.DisplayObject, depth:number = ViewDepth.UI):void {
        var layer:egret.DisplayObjectContainer = this.getLayer(depth);
        if (child && child.parent == layer) {
            layer.removeChild(child);
        } else {
            egret.warn("viewManager removeElement is error");
        }
    }

    //根据层索引获得layer
    private getLayer(depth:ViewDepth) {
        var layer:egret.DisplayObjectContainer = null;
        switch (depth) {
            case ViewDepth.SCENE:
                layer = this.sceneLayer;
                break;
            case ViewDepth.UI:
                layer = this.uiLayer;
                break;
            case ViewDepth.GUIDE:
                layer = this.guideLayer;
                break;
            case ViewDepth.ALERT:
                layer = this.alertLayer;
                break;
            case ViewDepth.NOTICE:
                layer = this.noticeLayer;
                break;
            case ViewDepth.LOADING:
                layer = this.loadingLayer;
                break;
            case ViewDepth.LOADING:
                layer = this.loadingLayer;
                break;
            case ViewDepth.MODULE_LOADING:
                layer = this.moduleLoadingLayer;
                break;
        }
        return layer;
    }

    //显示loading进度
    public showLoading(current:number, total:number) {
        this.loadingLayer.visible = true;
        this.loadingLayer.setProgress(current, total);
    }

    public hideLoading() {
        this.loadingLayer.visible = false;
    }

    //加载其他模块资源
    public loadModuleGroupRes(groupName:string, callback:Function, thisObj, ...parameters) {
        if (RES.isGroupLoaded(groupName)) {
            callback.apply(thisObj, parameters);
        } else {
            this.moduleLoadingLayer.loadModuleGroupRes(groupName, callback, thisObj, parameters);
        }
    }

    //浮动提示条
    public showFlowHint(message:string) {
        var text:FlowHintUI = new FlowHintUI();
        this.addElement(text, ViewDepth.NOTICE);
        text.showText(message, this.removeFlowHint, this);
        this.flowHints.unshift(text);

        var intN:number = this.flowHints.length;
        var flowHintUIObj:FlowHintUI;
        if (intN > 5) {
            flowHintUIObj = this.flowHints[intN - 1];
            this.removeFlowHint(flowHintUIObj);
            intN--;
        }
        flowHintUIObj = this.flowHints[0];
        var intY:number = flowHintUIObj.y - flowHintUIObj.height / 2;
        for (var i:number = 1; i < intN; i++) {
            flowHintUIObj = this.flowHints[i];
            intY -= flowHintUIObj.height / 2;
            egret.Tween.get(flowHintUIObj).to({y: intY >> 0}, 100);
            intY -= flowHintUIObj.height / 2;
        }
    }

    private removeFlowHint(flowHint:FlowHintUI):void {
        var i:number = this.flowHints.indexOf(flowHint);
        if (i != -1) {
            this.flowHints.splice(i, 1);
            this.removeElement(flowHint, ViewDepth.NOTICE);
            egret.Tween.removeTweens(flowHint);
        }
    }

    //弹出提示框
    public alert(text:string,
                 affirmHandler:Function = null,
                 thisObject:any = null, bShowCancel = false, bShowAffirm = true, countDown:number = -1, ...parameters) {
        if (!this.gameAlert) {
            //gameAlert放在这里才加入otherLayerContainer，是因为gameAlert界面较复杂，使用的是皮肤文件，而初始化时，皮肤文件还没加载出来
            this.gameAlert = new GameAlertUI();
            this.otherLayerContainer.addChild(this.gameAlert);
            this.gameAlert.name = "alertLayer";
            this.gameAlert.width = this.gameAlert.parent.width;
            this.gameAlert.height = this.gameAlert.parent.height;
            this.gameAlert.x = 0;
            this.gameAlert.y = 0;
            this.gameAlert.visible = false;
        }
        ViewManager.instance.gameAlert.alert(text, affirmHandler, thisObject, bShowCancel, bShowAffirm, countDown, parameters);
    }

    //跑马灯提示
    public showTopMessage(msg:string):void {
        if (!msg || msg.length <= 0) return;
        this.topMessageUI.pushMessage(msg);
        //正在显示中则等待上一条显示完后，自动显示该条
        if (this.topMessageUI.parent) return;
        this.addElement(this.topMessageUI, ViewDepth.NOTICE);
        this.topMessageUI.showMessage();
    }

    public removeTopMessage():void {
        this.topMessageUI.removeMessage();
    }


    //指定的Mediator是否已经打开
    public isMediatorExist(mediatorClass:any):boolean {
        var newMediator:Mediator = ObserverManager.getMediator(mediatorClass);
        if (newMediator && this._window.indexOf(newMediator) != -1) {
            return true;
        }
        return false;
    }

    public setTimeout(mediatorClass:any, listener, thisObject, delay, ...args):number {
        var mediatorClassName:string = egret.getQualifiedClassName(mediatorClass);
        var key = egret.setTimeout(listener, thisObject, delay, ...args);
        var list:number[] = this.timeoutKeyMapOnMediator[mediatorClassName];
        if (!list) {
            list = [];
            this.timeoutKeyMapOnMediator[mediatorClassName] = list;
        }
        list.push(key);
        return key;
    }

    public setInterval(mediatorClass:any, listener, thisObject, delay, ...args):number {
        var mediatorClassName:string = egret.getQualifiedClassName(mediatorClass);
        var key = egret.setInterval(listener, thisObject, delay, args);
        var list:number[] = this.intervalKeyMapOnMediator[mediatorClassName];
        if (!list) {
            list = [];
            this.intervalKeyMapOnMediator[mediatorClassName] = list;
        }
        list.push(key);
        return key;
    }

    private closeMediator(mediator:Mediator):void {
        mediator.close();
        var mediatorClassName:string = egret.getQualifiedClassName(mediator);
        this.clearMediator(mediatorClassName)
    }

    private clearMediator(mediatorClassName:string):void {
        var timeoutKeyList:number[] = this.timeoutKeyMapOnMediator[mediatorClassName];
        if (timeoutKeyList) {
            for (var key in timeoutKeyList) {
                egret.clearTimeout(timeoutKeyList[key]);
            }
            this.timeoutKeyMapOnMediator[mediatorClassName].length = 0;
        }


        var intervalKeyList:number[] = this.intervalKeyMapOnMediator[mediatorClassName];
        if (intervalKeyList) {
            for (var key in intervalKeyList) {
                egret.clearInterval(intervalKeyList[key]);
            }
            this.intervalKeyMapOnMediator[mediatorClassName].length = 0;
        }


        var armatureDisplayList:any[] = this.armatureDisplayMapOnMediator[mediatorClassName];
        if (armatureDisplayList) {
            for (var key in armatureDisplayList) {
                //TODO 这个项目不执行这句，是因为之前代码，所有的createAnimation都是写在第一次初始化initUI里的，而不是每次openUI的时候
                // this.disposeAnimationRes(mediatorClassName, armatureDisplayList[key]);
                armatureDisplayList[key].animation.stop();
            }
            this.armatureDisplayMapOnMediator[mediatorClassName].length = 0;
        }
    }
}
//场景的层标识
enum ViewDepth{
    SCENE,
    UI,
    GUIDE,
    ALERT,
    NOTICE,
    LOADING,
    MODULE_LOADING
}

// //通过CommonUtil类的createAnimation方法创建的骨骼动画,需要记录动画事件监听函数,用于释放时一并释放
// class DynamicArmatureInfo {
//     constructor(armature, completeFun, funThisObj) {
//         this.armature = armature;
//         this.completeFun = completeFun;
//         this.funThisObj = funThisObj;
//     }
//
//     public armature:dragonBones.EgretArmatureDisplay;
//     public completeFun:Function;
//     public funThisObj:any;
// }