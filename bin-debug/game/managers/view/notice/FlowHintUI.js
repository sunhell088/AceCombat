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
var FlowHintUI = (function (_super) {
    __extends(FlowHintUI, _super);
    function FlowHintUI() {
        var _this = _super.call(this) || this;
        _this.bg = new eui.Image();
        _this.bg.source = "FlowHintBG_png";
        _this.bg.height = 39;
        _this.bg.width = 360;
        _this.addChild(_this.bg);
        _this.tf = new egret.TextField();
        _this.tf.size = 28;
        _this.tf.fontFamily = "Microsoft YaHei";
        _this.tf.lineSpacing = 8;
        _this.tf.stroke = 2;
        _this.tf.textAlign = egret.HorizontalAlign.CENTER;
        _this.tf.y = FlowHintUI.sideY;
        _this.tf.x = FlowHintUI.side;
        _this.addChild(_this.tf);
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    FlowHintUI.prototype.showText = function (msg, removeFun, removeFunThisObj) {
        this.tf.textFlow = TextUtil.parse(msg);
        var intW = this.tf.width + FlowHintUI.side * 2;
        if (intW < FlowHintUI.minWidth)
            intW = FlowHintUI.minWidth;
        this.bg.width = intW;
        this.tf.x = ((intW - this.tf.width) / 2) >> 0;
        this.bg.height = this.tf.height + FlowHintUI.sideY * 2;
        this.anchorOffsetX = intW / 2;
        this.scaleX = this.scaleY = 1.5;
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2 - 200;
        egret.Tween.get(this, null, null, true).to({
            scaleX: 1,
            scaleY: 1
        }, 300).wait(2000).to({ alpha: 0 }, 300);
        //不用tween的回调来移除，是因为其他地方可能会调用removeAllTweens
        var timeoutKey = egret.setTimeout(function () {
            removeFun.call(removeFunThisObj, this);
            egret.clearTimeout(timeoutKey);
        }, this, 2600);
    };
    FlowHintUI.side = 50;
    FlowHintUI.sideY = 10;
    FlowHintUI.minWidth = 360;
    return FlowHintUI;
}(eui.Component));
__reflect(FlowHintUI.prototype, "FlowHintUI");
