/**
 * Created by Administrator on 2017/6/18.
 * 大厅
 */
class LobbyUI extends eui.Component {
    private loginBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = LobbyUISkin;
    }

    protected createChildren():void {
        super.createChildren();
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onLoginBtn,this)
    }

    public initUI():void {
        
    }

    private onLoginBtn(){
        ViewManager.instance.OPEN_WINDOW(GameSceneMediator);
    }

    openUI():void {

    }

    exit():void {

    }
}