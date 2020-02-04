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
var LobbyMediator = (function (_super) {
    __extends(LobbyMediator, _super);
    function LobbyMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    LobbyMediator.prototype.addGameEventListener = function () {
    };
    LobbyMediator.prototype.initView = function () {
        this.lobbyUI = new LobbyUI();
        this.lobbyUI.initUI();
    };
    LobbyMediator.prototype.onEnter = function () {
        egret.Tween.removeAllTweens();
        ViewManager.instance.hideLoading(); //隐藏登录loading
        ViewManager.instance.addElement(this.lobbyUI);
        this.lobbyUI.enter();
    };
    LobbyMediator.prototype.onExit = function () {
        this.lobbyUI.exit();
        ViewManager.instance.removeElement(this.lobbyUI);
    };
    return LobbyMediator;
}(Mediator));
__reflect(LobbyMediator.prototype, "LobbyMediator");
