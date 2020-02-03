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
 * 用于管理组成主游戏场景的各组件（每个组件有自己的Mediator），放在这里也便于适应分辨率变化
 */
var GameSceneUI = (function (_super) {
    __extends(GameSceneUI, _super);
    function GameSceneUI() {
        var _this = _super.call(this) || this;
        _this.skinName = GameSceneUISkin;
        return _this;
    }
    GameSceneUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onQuitBtn, this);
    };
    GameSceneUI.prototype.initUI = function () {
    };
    GameSceneUI.prototype.onQuitBtn = function () {
        ViewManager.instance.OPEN_WINDOW(LobbyMediator);
    };
    return GameSceneUI;
}(eui.Component));
__reflect(GameSceneUI.prototype, "GameSceneUI");
