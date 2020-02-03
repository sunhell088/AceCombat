/**
 * 模块监听管理，用于游戏模块分离
 **/
class ObserverManager extends egret.EventDispatcher {
    private static _instance:ObserverManager;

    public static get instance():ObserverManager {
        if (!ObserverManager._instance)
            ObserverManager._instance = new ObserverManager();
        return ObserverManager._instance;
    }

    private static _mediators:Object = {};
    private static _commands:Object = {};

    public static sendNotification(command:string, ...arg) {
        ObserverManager.instance.dispatchEventWith(command, false, arg);
    }

    //注册Mediator
    public static registerMediator(mediatorClass:any):Mediator {
        var newMediator:Mediator = ObserverManager.getMediator(mediatorClass);
        if (!newMediator) {
            var key:string = egret.getQualifiedClassName(mediatorClass);
            var mediator:Mediator = new mediatorClass();
            mediator.register();
            ObserverManager._mediators[key] = mediator;
            newMediator = mediator;
        }
        return newMediator;
    }

    //移除Mediator （当前小游戏项目几乎用不上）
    // public static removeMediator(mediatorClass:any):void {
    //     var key:string = egret.getQualifiedClassName(mediatorClass);
    //     if (!ObserverManager._mediators.hasOwnProperty(key)) {
    //         egret.error("removeMediator failed, " + mediatorClass + " is not exist");
    //         return;
    //     }
    //     ObserverManager._mediators[key].removeGameEventListener();
    //     ObserverManager._mediators[key] = null;
    //     delete ObserverManager._mediators[key];
    // }

    //获取Mediator
    public static getMediator(mediatorClass:any):any {
        var key:string = egret.getQualifiedClassName(mediatorClass);
        if (!ObserverManager._mediators.hasOwnProperty(key)) return null;
        return ObserverManager._mediators[key];
    }

    //注册Command
    public static registerCommand(notificationName:any, commandClass:any):void {
        if (ObserverManager._commands.hasOwnProperty(notificationName)) {
            egret.error("registerCommand failed, " + notificationName + " is exist! commandClass =" + commandClass);
            return;
        }
        ObserverManager._commands[notificationName] = new commandClass();
    }

    //获取Command
    public static getCommand(notificationName:any):any {
        if (!ObserverManager._commands.hasOwnProperty(notificationName)) return null;
        return ObserverManager._commands[notificationName];
    }
}