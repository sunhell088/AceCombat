//跑马灯公告
class TopMessageUI extends eui.Component {
    private static WIDTH:number = 800;
    private static SPEED:number = 5;
    //外部可控制跑马灯的Y值（用于防止遮挡）
    public static HEIGHT_OFFSET:number = 0;
    //原始高度
    private originalHeight:number;

    private bg:eui.Image = new eui.Image("marqueeBG_png");
    private marqueeIcon:eui.Image = new eui.Image("marqueeIcon_png");
    private textLab:egret.TextField;

    private messageList:string[] = [];

    constructor() {
        super();
        this.addChild(this.bg);
        this.textLab = new egret.TextField();
        this.textLab.size = 26;
        this.textLab.fontFamily = "Microsoft YaHei";
        this.addChild(this.textLab);
        this.addChild(this.marqueeIcon);
        this.touchEnabled = this.touchChildren = false;
        this.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onWindowResize, this);
        this.addEventListener(egret.Event.RESIZE, this.onWindowResize, this);
    }

    public pushMessage(msg:string):void {
        if (!msg || msg.length <= 0) return;
        this.messageList.push(msg);
    }

    public removeMessage():void {
        this.messageList.length = 0;
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        if (this.parent){
            this.parent.removeChild(this);   
        }
    }

    public showMessage():void {
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
        this.x = egret.MainContext.instance.stage.stageWidth/2 - CommonConst.STAGE_WIDTH/2 + 255;
        this.y = egret.MainContext.instance.stage.stageHeight/2 - CommonConst.STAGE_HEIGHT/2 + 105;
        this.originalHeight = this.y;
        this.mask = new egret.Rectangle(0, 0, this.width, this.height);


        this.bg.width = this.width;
        this.marqueeIcon.x = this.width;
        this.marqueeIcon.y = (this.bg.height - this.marqueeIcon.height) / 2;
        this.textLab.x = this.marqueeIcon.x + this.marqueeIcon.width + 5;
        this.textLab.textFlow = TextUtil.parse(this.messageList.shift());
        egret.callLater(function () {
            this.textLab.y = (this.bg.height - this.textLab.height) / 2 + 2;
        }, this)

    }

    private onEnterFrame():void {
        this.y = this.originalHeight + TopMessageUI.HEIGHT_OFFSET;
        this.textLab.x -= TopMessageUI.SPEED;
        this.marqueeIcon.x -= TopMessageUI.SPEED;
        if (this.textLab.x + this.textLab.width < 0) {
            this.showMessage();
        }
    }

    public onWindowResize():void {
        this.x = egret.MainContext.instance.stage.stageWidth/2 - CommonConst.STAGE_WIDTH/2 + 255;
        this.y = egret.MainContext.instance.stage.stageHeight/2 - CommonConst.STAGE_HEIGHT/2 + 105;
        this.originalHeight = this.y;
    }
}