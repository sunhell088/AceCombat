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
//跑马灯公告
var TopMessageUI = (function (_super) {
    __extends(TopMessageUI, _super);
    function TopMessageUI() {
        var _this = _super.call(this) || this;
        _this.bg = new eui.Image("marqueeBG_png");
        _this.marqueeIcon = new eui.Image("marqueeIcon_png");
        _this.messageList = [];
        _this.addChild(_this.bg);
        _this.textLab = new egret.TextField();
        _this.textLab.size = 26;
        _this.textLab.fontFamily = "Microsoft YaHei";
        _this.addChild(_this.textLab);
        _this.addChild(_this.marqueeIcon);
        _this.touchEnabled = _this.touchChildren = false;
        _this.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, _this.onWindowResize, _this);
        _this.addEventListener(egret.Event.RESIZE, _this.onWindowResize, _this);
        return _this;
    }
    TopMessageUI.prototype.pushMessage = function (msg) {
        if (!msg || msg.length <= 0)
            return;
        this.messageList.push(msg);
    };
    TopMessageUI.prototype.removeMessage = function () {
        this.messageList.length = 0;
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    TopMessageUI.prototype.showMessage = function () {
        if (this.messageList.length == 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.parent.removeChild(this);
            return;
        }
        if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        this.width = TopMessageUI.WIDTH;
        this.height = this.bg.texture.textureHeight;
        this.x = egret.MainContext.instance.stage.stageWidth / 2 - CommonConst.STAGE_WIDTH / 2 + 255;
        this.y = egret.MainContext.instance.stage.stageHeight / 2 - CommonConst.STAGE_HEIGHT / 2 + 105;
        this.originalHeight = this.y;
        this.mask = new egret.Rectangle(0, 0, this.width, this.height);
        this.bg.width = this.width;
        this.marqueeIcon.x = this.width;
        this.marqueeIcon.y = (this.bg.height - this.marqueeIcon.height) / 2;
        this.textLab.x = this.marqueeIcon.x + this.marqueeIcon.width + 5;
        this.textLab.textFlow = TextUtil.parse(this.messageList.shift());
        egret.callLater(function () {
            this.textLab.y = (this.bg.height - this.textLab.height) / 2 + 2;
        }, this);
    };
    TopMessageUI.prototype.onEnterFrame = function () {
        this.y = this.originalHeight + TopMessageUI.HEIGHT_OFFSET;
        this.textLab.x -= TopMessageUI.SPEED;
        this.marqueeIcon.x -= TopMessageUI.SPEED;
        if (this.textLab.x + this.textLab.width < 0) {
            this.showMessage();
        }
    };
    TopMessageUI.prototype.onWindowResize = function () {
        this.x = egret.MainContext.instance.stage.stageWidth / 2 - CommonConst.STAGE_WIDTH / 2 + 255;
        this.y = egret.MainContext.instance.stage.stageHeight / 2 - CommonConst.STAGE_HEIGHT / 2 + 105;
        this.originalHeight = this.y;
    };
    TopMessageUI.WIDTH = 800;
    TopMessageUI.SPEED = 5;
    //外部可控制跑马灯的Y值（用于防止遮挡）
    TopMessageUI.HEIGHT_OFFSET = 0;
    return TopMessageUI;
}(eui.Component));
__reflect(TopMessageUI.prototype, "TopMessageUI");
