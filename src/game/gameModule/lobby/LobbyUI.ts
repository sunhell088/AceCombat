/**
 * Created by Administrator on 2017/6/18.
 * 大厅
 */
class LobbyUI extends eui.Component {
    public bgImg0:eui.Image;
    public bgImg1:eui.Image;
    public loginPlaneImg:eui.Image;
    public startHintImg:eui.Image;


    public constructor() {
        super();
        this.skinName = LobbyUISkin;
    }

    protected createChildren(): void {
        super.createChildren();
    }

    public initUI(): void {
        //初始化背景
        this.initBackground();
        this.bgMove();

        //播放背景音乐
        SoundManager.instance.playMusic(SoundConst.mainMusic_mp3);
        //根据玩家当前设置飞机初始化飞机图片
        this.loginPlaneImg.source = "role_big"+GlobalProxy.globalProxy.data.currentPlaneID+"_png";

        //"点击开始游戏"图片添加放大缩小效果
        // 点击屏蔽任意地方开始
    }

    enter(): void {

    }

    exit(): void {

    }


    //------------------------------------------------

    private initBackground(): void {
        //随机背景图片
        let randomBgIndex:number = CommonUtil.randomInteger(0,2);
        this.bgImg0.source = this.bgImg1.source = "map_bg"+randomBgIndex+"_png";
    }

    private bgMove(): void {
        egret.Tween.get(this.bgImg0,{loop:true}).to({verticalCenter:this.bgImg0.height},GameConst.BG_SPEED)
            .to({verticalCenter:-this.bgImg0.height},0);
        egret.Tween.get(this.bgImg1,{loop:true}).to({verticalCenter:this.bgImg0.height},GameConst.BG_SPEED)
            .to({verticalCenter:-this.bgImg0.height},0);
    }
}