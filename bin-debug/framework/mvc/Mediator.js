var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Mediator的加载相关操作类
 **/
var Mediator = (function () {
    function Mediator() {
        this.bInitView = false;
        //该Mediator监听的列表（用于关闭时移除）
        this.gameEventListenerMap = null;
    }
    Mediator.prototype.open = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        this.enterParameters = parameters;
        if (!this.bInitView) {
            this.initView();
        }
        this.bInitView = true;
        this.onEnter.apply(this, this.enterParameters);
        if (!this.gameEventListenerMap) {
            this.gameEventListenerMap = {};
            this.addGameEventListener();
        }
    };
    Mediator.prototype.close = function () {
        for (var key in this.gameEventListenerMap) {
            var type = this.gameEventListenerMap[key].type;
            var listener = this.gameEventListenerMap[key].listener;
            var thisObject = this.gameEventListenerMap[key].thisObject;
            ObserverManager.instance.removeEventListener(type, listener, thisObject);
        }
        this.gameEventListenerMap = null;
        this.onExit();
    };
    Mediator.prototype.addEventListener = function (type, listener, thisObject) {
        ObserverManager.instance.addEventListener(type, listener, thisObject);
        this.gameEventListenerMap[type] = new GameEventListenerData(type, listener, thisObject);
    };
    Mediator.prototype.register = function () {
        if (!this.gameEventListenerMap) {
            this.gameEventListenerMap = {};
            this.addGameEventListener();
        }
    };
    //--------↓↓↓↓↓↓这部分代码只是为了执行子类的同名方法，构架可以再优化和清晰点----------
    //会在第一次打开的时候执行一次，以后关闭后，再打开将不再执行
    Mediator.prototype.initView = function () {
    };
    Mediator.prototype.onEnter = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
    };
    Mediator.prototype.onExit = function () {
    };
    Mediator.prototype.addGameEventListener = function () {
    };
    return Mediator;
}());
__reflect(Mediator.prototype, "Mediator");
var GameEventListenerData = (function () {
    function GameEventListenerData(type, listener, thisObject) {
        this.type = type;
        this.listener = listener;
        this.thisObject = thisObject;
    }
    return GameEventListenerData;
}());
__reflect(GameEventListenerData.prototype, "GameEventListenerData");
