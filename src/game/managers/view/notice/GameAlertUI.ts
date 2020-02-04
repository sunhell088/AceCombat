/**
 * 通用确认框
 */
class GameAlertUI extends eui.Component {
    private ui_text:eui.Label;
    private btn_affirm:eui.Button;
    private btn_affirmCountDown:eui.Button;
    private btn_cancel:eui.Button;
    private countDownLab:eui.Label;
    private countDownIcon:eui.Image;

    //记时器key
    private interKey:number;
    private countDownSecond:number;

    private affirmHandler:Function = null;

    //对话框关闭回调函数对应的this对象
    private thisObject:any;
    private parameters:any;

    //缓存的消息
    private messages:any[] = [];

    public constructor() {
        super();
        this.skinName = CommonAlertSkin;
        this.btn_affirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAffirm, this);
        this.btn_affirmCountDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAffirm, this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    public alert(...parameters):void {
        // SoundManager.instance.playEffect(SoundConst.ALERT);
        this.messages.push(arguments);
        if (!this.visible) {
            this.alertMessage.apply(this, this.messages.shift());
        }
    }

    private alertMessage(text:string,
                         affirmHandler:Function = null,
                         thisObject:any = null, bShowCancel = false, bShowAffirm = true, countDown:number = -1, ...parameters):void {
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
        } else {
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
        } else {
            this.countDownLab.visible = false;
            this.countDownIcon.visible = false;
            this.btn_affirmCountDown.visible = false;
        }


        //如果是没有确认按钮，需玩家强制刷新界面的弹出框，则文本位置居中
        var affirmBtn = this.btn_affirm.visible?this.btn_affirm:this.btn_affirmCountDown;
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
        } else {
            this.ui_text.y = this.ui_text.parent.height / 2 - this.ui_text.height / 2;
        }
    }

    close():void {
        // SoundManager.instance.playEffect(SoundConst.BUTTON_CLICK);
        this.visible = false;
        if (this.messages.length > 0) {
            this.alertMessage.apply(this, this.messages.shift());
        }
    }

    private onAffirm():void {
        egret.clearInterval(this.interKey);
        // SoundManager.instance.playEffect(SoundConst.BUTTON_CLICK);
        if (this.affirmHandler != null) {
            var thisObj:any = this.thisObject || this;
            //这里this.parameters取0是因为经过了2次可变参数传递
            this.affirmHandler.apply(thisObj, this.parameters[0]);
        }
        //close要放在确认回调的后面，因为close里会用新的parameters替换旧的
        this.close();
    }


    private countDown():void {
        this.countDownSecond--;
        if (this.countDownSecond < 0) {
            this.onAffirm();
            return;
        }
        this.countDownLab.text = this.countDownSecond + "";
    }
}