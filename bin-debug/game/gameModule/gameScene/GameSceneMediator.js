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
 * 游戏主逻辑模块
 */
var GameSceneMediator = (function (_super) {
    __extends(GameSceneMediator, _super);
    function GameSceneMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    GameSceneMediator.prototype.addGameEventListener = function () {
        this.addEventListener(GameEvent.COUNT_DOWN_WAGER, this.onCountDownWager, this);
        this.addEventListener(GameEvent.S2C_GAME_STATE, this.onS2CGameState, this);
        this.addEventListener(GameEvent.STOP_BET, this.onStopBet, this);
    };
    GameSceneMediator.prototype.initView = function () {
        this.gameScene = new GameSceneUI();
    };
    GameSceneMediator.prototype.onEnter = function () {
        ViewManager.instance.addElement(this.gameScene);
        this.gameScene.initUI();
    };
    GameSceneMediator.prototype.onExit = function () {
        ViewManager.instance.removeElement(this.gameScene);
    };
    GameSceneMediator.prototype.onCountDownWager = function (evt) {
        // this.gameScene.onCountDownWager(evt.data[0]);
    };
    GameSceneMediator.prototype.onS2CGameState = function (evt) {
        //this.gameScene.onS2CGameState(evt.data[0]);
    };
    GameSceneMediator.prototype.onStopBet = function () {
        // this.gameScene.betState("stop")
        // Data.globalProxy.isBet = false;
    };
    return GameSceneMediator;
}(Mediator));
__reflect(GameSceneMediator.prototype, "GameSceneMediator");
