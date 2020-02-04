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
        _this.skinName = LobbyUISkin;
        return _this;
    }
    LobbyUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    LobbyUI.prototype.initUI = function () {
        //初始化背景
        this.initBackground();
        this.bgMove();
        //播放背景音乐
        SoundManager.instance.playMusic(SoundConst.mainMusic_mp3);
        //根据玩家当前设置飞机初始化飞机图片
        this.loginPlaneImg.source = "role_big" + GlobalProxy.globalProxy.data.currentPlaneID + "_png";
        //"点击开始游戏"图片添加放大缩小效果
        // 点击屏蔽任意地方开始
    };
    LobbyUI.prototype.enter = function () {
    };
    LobbyUI.prototype.exit = function () {
    };
    //------------------------------------------------
    LobbyUI.prototype.initBackground = function () {
        //随机背景图片
        var randomBgIndex = CommonUtil.randomInteger(0, 2);
        this.bgImg0.source = this.bgImg1.source = "map_bg" + randomBgIndex + "_png";
    };
    LobbyUI.prototype.bgMove = function () {
        egret.Tween.get(this.bgImg0, { loop: true }).to({ verticalCenter: this.bgImg0.height }, GameConst.BG_SPEED)
            .to({ verticalCenter: -this.bgImg0.height }, 0);
        egret.Tween.get(this.bgImg1, { loop: true }).to({ verticalCenter: this.bgImg0.height }, GameConst.BG_SPEED)
            .to({ verticalCenter: -this.bgImg0.height }, 0);
    };
    return LobbyUI;
}(eui.Component));
__reflect(LobbyUI.prototype, "LobbyUI");
