/**
 * 用于管理组成主游戏场景的各组件（每个组件有自己的Mediator），放在这里也便于适应分辨率变化
 */
class GameSceneUI extends eui.Component {
    private quitBtn:eui.Button;


    public constructor() {
        super();
        this.skinName = GameSceneUISkin;
    }

    protected createChildren(): void {
        super.createChildren();
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onQuitBtn,this);
    }

    public initUI() {
    }

    private onQuitBtn():void {
        ViewManager.instance.OPEN_WINDOW(LobbyMediator);
    }
}