/**
 * 游戏主逻辑模块
 */
class GameSceneMediator extends Mediator {
    public gameScene: GameSceneUI;

    //游戏内事件监听
    addGameEventListener(): void {
        // this.addEventListener(GameEvent.COUNT_DOWN_WAGER, this.onCountDownWager, this)
        // this.addEventListener(GameEvent.S2C_GAME_STATE, this.onS2CGameState, this)
        // this.addEventListener(GameEvent.STOP_BET, this.onStopBet, this)
    }

    initView() {
        this.gameScene = new GameSceneUI();
    }

    onEnter(): void {
        ViewManager.instance.addElement(this.gameScene);
        this.gameScene.initUI();
    }

    onExit(): void {
        ViewManager.instance.removeElement(this.gameScene);
    }
}