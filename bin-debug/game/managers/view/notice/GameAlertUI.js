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
 * 通用确认框
 */
var GameAlertUI = (function (_super) {
    __extends(GameAlertUI, _super);
    function GameAlertUI() {
        var _this = _super.call(this) || this;
        _this.affirmHandler = null;
        //缓存的消息
        _this.messages = [];
        _this.skinName = CommonAlertSkin;
        _this.btn_affirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAffirm, _this);
        _this.btn_affirmCountDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAffirm, _this);
        _this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.close, _this);
        return _this;
    }
    GameAlertUI.prototype.alert = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        // SoundManager.instance.playEffect(SoundConst.ALERT);
        this.messages.push(arguments);
        if (!this.visible) {
            this.alertMessage.apply(this, this.messages.shift());
        }
    };
    GameAlertUI.prototype.alertMessage = function (text, affirmHandler, thisObject, bShowCancel, bShowAffirm, countDown) {
        if (affirmHandler === void 0) { affirmHandler = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (bShowCancel === void 0) { bShowCancel = false; }
        if (bShowAffirm === void 0) { bShowAffirm = true; }
        if (countDown === void 0) { countDown = -1; }
        var parameters = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            parameters[_i - 6] = arguments[_i];
        }
        this.visible = true;
        this.ui_text.textFlow = TextUtil.parse(text);
        this.affirmHandler = affirmHandler;
        this.thisObject = thisObject;
        this.parameters = parameters;
        if (bShowCancel) {
            this.btn_cancel.visible = true;
            //分散
            this.btn_affirm.x = this.btn_affirm.parent.width / 2 - 30 - this.btn_affirm.width;
            this.btn_cancel.x = this.btn_cancel.parent.width / 2 + 30;
        }
        else {
            this.btn_cancel.visible = false;
            //居中
            this.btn_affirm.x = this.btn_affirm.parent.width / 2 - this.btn_affirm.width / 2;
        }
        this.btn_affirm.visible = bShowAffirm;
        this.ui_text.width = 414;
        this.ui_text.y = 61;
        //设置倒计时
        if (countDown != -1) {
            this.countDownLab.visible = true;
            this.countDownIcon.visible = true;
            this.btn_affirmCountDown.visible = true;
            this.countDownSecond = countDown;
            this.countDown();
            this.interKey = egret.setInterval(this.countDown, this, 1000);
            this.btn_affirm.visible = false;
        }
        else {
            this.countDownLab.visible = false;
            this.countDownIcon.visible = false;
            this.btn_affirmCountDown.visible = false;
        }
        //如果是没有确认按钮，需玩家强制刷新界面的弹出框，则文本位置居中
        var affirmBtn = this.btn_affirm.visible ? this.btn_affirm : this.btn_affirmCountDown;
        if (affirmBtn.visible) {
            //如果文本过高，和确定按钮重叠，那么以确定按钮为最底面
            if (this.ui_text.y + this.ui_text.height >= affirmBtn.y) {
                this.ui_text.y = affirmBtn.y - this.ui_text.height - 10;
                //如果还是过高，则增加宽度
                if (this.ui_text.y <= 0) {
                    this.ui_text.width = this.ui_text.parent.width;
                    this.ui_text.y = affirmBtn.y - this.ui_text.height - 10;
                }
            }
        }
        else {
            this.ui_text.y = this.ui_text.parent.height / 2 - this.ui_text.height / 2;
        }
    };
    GameAlertUI.prototype.close = function () {
        // SoundManager.instance.playEffect(SoundConst.BUTTON_CLICK);
        this.visible = false;
        if (this.messages.length > 0) {
            this.alertMessage.apply(this, this.messages.shift());
        }
    };
    GameAlertUI.prototype.onAffirm = function () {
        egret.clearInterval(this.interKey);
        // SoundManager.instance.playEffect(SoundConst.BUTTON_CLICK);
        if (this.affirmHandler != null) {
            var thisObj = this.thisObject || this;
            //这里this.parameters取0是因为经过了2次可变参数传递
            this.affirmHandler.apply(thisObj, this.parameters[0]);
        }
        //close要放在确认回调的后面，因为close里会用新的parameters替换旧的
        this.close();
    };
    GameAlertUI.prototype.countDown = function () {
        this.countDownSecond--;
        if (this.countDownSecond < 0) {
            this.onAffirm();
            return;
        }
        this.countDownLab.text = this.countDownSecond + "";
    };
    return GameAlertUI;
}(eui.Component));
__reflect(GameAlertUI.prototype, "GameAlertUI");
