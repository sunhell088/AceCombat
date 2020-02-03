class LobbyMediator extends Mediator {
    private lobbyUI:LobbyUI;

    //游戏内事件监听
    addGameEventListener():void {
    }

    initView() {
        this.lobbyUI = new LobbyUI();
        this.lobbyUI.initUI();
    }

    onEnter():void {
        egret.Tween.removeAllTweens();
        ViewManager.instance.hideLoading();     //隐藏登录loading
        ViewManager.instance.addElement(this.lobbyUI);
        this.lobbyUI.openUI();
    }

    onExit():void {
        this.lobbyUI.exit();
        ViewManager.instance.removeElement(this.lobbyUI);
    }
}
