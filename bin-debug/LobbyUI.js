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
 * Created by Administrator on 2017/6/18.
 * 大厅
 */
var LobbyUI = (function (_super) {
    __extends(LobbyUI, _super);
    function LobbyUI() {
        var _this = _super.call(this) || this;
        _this.skinName = LobbySkin;
        return _this;
    }
    LobbyUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    LobbyUI.prototype.initUI = function () {
    };
    LobbyUI.prototype.onEnd = function () {
    };
    LobbyUI.prototype.openUI = function () {
    };
    LobbyUI.prototype.exit = function () {
    };
    return LobbyUI;
}(eui.Component));
__reflect(LobbyUI.prototype, "LobbyUI");
