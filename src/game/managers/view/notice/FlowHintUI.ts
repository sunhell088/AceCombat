class FlowHintUI extends eui.Component {
    private static side:number = 50;
    private static sideY:number = 10;
    private static minWidth:number = 360;

    private bg:eui.Image;
    private tf:egret.TextField;

    constructor() {
        super();
        this.bg = new eui.Image();
        this.bg.source = "FlowHintBG_png";
        this.bg.height = 39;
        this.bg.width = 360;
        this.addChild(this.bg);
        this.tf = new egret.TextField();
        this.tf.size = 28;
        this.tf.fontFamily = "Microsoft YaHei";
        this.tf.lineSpacing = 8;
        this.tf.stroke = 2;
        this.tf.textAlign = egret.HorizontalAlign.CENTER;
        this.tf.y = FlowHintUI.sideY;
        this.tf.x = FlowHintUI.side;
        this.addChild(this.tf);
        this.touchEnabled = this.touchChildren = false;
    }

    public showText(msg:string, removeFun:Function, removeFunThisObj:any):void {
        this.tf.textFlow = TextUtil.parse(msg);
        var intW:number = this.tf.width + FlowHintUI.side * 2;
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
        }, 300).wait(2000).to({alpha: 0}, 300);
        //不用tween的回调来移除，是因为其他地方可能会调用removeAllTweens
        var timeoutKey = egret.setTimeout(function () {
            removeFun.call(removeFunThisObj, this);
            egret.clearTimeout(timeoutKey);
        }, this, 2600);
    }
}