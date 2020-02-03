/**
 * Created by Administrator on 2017/6/18.
 * 大厅
 */
class LobbyUI extends eui.Component {
    private integralLab:eui.Label;
    private balanceLab:eui.Label;

    public constructor() {
        super();
        this.skinName = LobbySkin;
    }

    protected createChildren():void {
        super.createChildren();
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this)
    }

    public initUI():void {
        
    }

    private onEnd(){

    }

    openUI():void {

    }

    exit():void {

    }
}