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
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //有其他玩家进入房间
    GameEvent.OTHER_PLAYER_ENTER_ROOM = "onOtherPlayerEnterRoom";
    //有其他玩家退出房间
    GameEvent.OTHER_PLAYER_EXIT_ROOM = "onOtherPlayerExitRoom";
    //----------------------------新梭哈------------------------------
    /**倒计时*/
    GameEvent.COUNT_DOWN_WAGER = "onCountDownWager";
    /**游戏下注状态 */
    GameEvent.S2C_GAME_STATE = "onS2CGameState";
    /**停止下注 */
    GameEvent.STOP_BET = "onStopBet";
    /**玩家下注 */
    GameEvent.S2C_BET_INFO = "onS2CBetInfo";
    /**发牌 */
    GameEvent.S2C_DEAL_CARD = "onDealCard";
    /**游戏赔付结果 */
    GameEvent.S2C_PAY_RESULT = "onPayResult";
    /**清理桌面 */
    GameEvent.CLEAR_TABLE = "onClearTable";
    /**清零路子 */
    GameEvent.CLEAR_WAY = "onClearWay";
    /**增加本局路子 */
    GameEvent.ADD_WAY = "onAddWay";
    /**打开路子详情 */
    GameEvent.OPEN_WAY = "onOpenWay";
    /**红蓝乱飞 */
    GameEvent.RED_BLACF_FLY = "onRedBlackFly";
    /**通知 */
    GameEvent.GAME_NOTICE = "onGameNotice";
    /**最大下注 */
    GameEvent.MAX_BET = "onMaxBet";
    /**确认所有玩家数据 */
    GameEvent.ALL_PLAYER_DATA = "onAllPlayerData";
    /**游戏等待动画 */
    GameEvent.WAIT_GAME = "onWaitGame";
    /**翻牌 */
    GameEvent.TURN_CARD = "onTurnCard";
    /**开始下注 */
    GameEvent.START_BET_ANIMATION = "onStartBetAnimation";
    /**提示下注特效 */
    GameEvent.BET_ANIMATION = "onBetAnimation";
    /**重复下注按钮状态 */
    GameEvent.BTN_LASTTIME_STATE = "onBtnLastTimeState";
    /**上一次下注 */
    GameEvent.CHANGE_LAST_BTN = "onChangeLastBtn";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
