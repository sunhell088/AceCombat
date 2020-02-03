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
 * 模块监听管理，用于游戏模块分离
 **/
var ObserverManager = (function (_super) {
    __extends(ObserverManager, _super);
    function ObserverManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ObserverManager, "instance", {
        get: function () {
            if (!ObserverManager._instance)
                ObserverManager._instance = new ObserverManager();
            return ObserverManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    ObserverManager.sendNotification = function (command) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        ObserverManager.instance.dispatchEventWith(command, false, arg);
    };
    //注册Mediator
    ObserverManager.registerMediator = function (mediatorClass) {
        var newMediator = ObserverManager.getMediator(mediatorClass);
        if (!newMediator) {
            var key = egret.getQualifiedClassName(mediatorClass);
            var mediator = new mediatorClass();
            mediator.register();
            ObserverManager._mediators[key] = mediator;
            newMediator = mediator;
        }
        return newMediator;
    };
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
    ObserverManager.getMediator = function (mediatorClass) {
        var key = egret.getQualifiedClassName(mediatorClass);
        if (!ObserverManager._mediators.hasOwnProperty(key))
            return null;
        return ObserverManager._mediators[key];
    };
    //注册Command
    ObserverManager.registerCommand = function (notificationName, commandClass) {
        if (ObserverManager._commands.hasOwnProperty(notificationName)) {
            egret.error("registerCommand failed, " + notificationName + " is exist! commandClass =" + commandClass);
            return;
        }
        ObserverManager._commands[notificationName] = new commandClass();
    };
    //获取Command
    ObserverManager.getCommand = function (notificationName) {
        if (!ObserverManager._commands.hasOwnProperty(notificationName))
            return null;
        return ObserverManager._commands[notificationName];
    };
    ObserverManager._mediators = {};
    ObserverManager._commands = {};
    return ObserverManager;
}(egret.EventDispatcher));
__reflect(ObserverManager.prototype, "ObserverManager");
