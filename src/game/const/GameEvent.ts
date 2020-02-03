class GameEvent extends egret.Event {
    //有其他玩家进入房间
    public static OTHER_PLAYER_ENTER_ROOM:string = "onOtherPlayerEnterRoom";
    //有其他玩家退出房间
    public static OTHER_PLAYER_EXIT_ROOM:string = "onOtherPlayerExitRoom";

    //----------------------------新梭哈------------------------------
    /**倒计时*/
    public static COUNT_DOWN_WAGER:string = "onCountDownWager";
    /**游戏下注状态 */
    public static S2C_GAME_STATE = "onS2CGameState";
    /**停止下注 */
    public static STOP_BET = "onStopBet";
    /**玩家下注 */
    public static S2C_BET_INFO = "onS2CBetInfo";
    /**发牌 */
    public static S2C_DEAL_CARD = "onDealCard";
    /**游戏赔付结果 */
    public static S2C_PAY_RESULT = "onPayResult";
    /**清理桌面 */
    public static CLEAR_TABLE = "onClearTable";

    /**清零路子 */
    public static CLEAR_WAY = "onClearWay";
    /**增加本局路子 */
    public static ADD_WAY = "onAddWay";
    /**打开路子详情 */
    public static OPEN_WAY = "onOpenWay";
    /**红蓝乱飞 */
    public static RED_BLACF_FLY = "onRedBlackFly";

    /**通知 */
    public static GAME_NOTICE = "onGameNotice";
    /**最大下注 */
    public static MAX_BET = "onMaxBet";

    /**确认所有玩家数据 */
    public static ALL_PLAYER_DATA = "onAllPlayerData";
    /**游戏等待动画 */
    public static WAIT_GAME = "onWaitGame";

    /**翻牌 */
    public static TURN_CARD = "onTurnCard";
    /**开始下注 */
    public static START_BET_ANIMATION = "onStartBetAnimation";
    /**提示下注特效 */
    public static BET_ANIMATION = "onBetAnimation";
    /**重复下注按钮状态 */
    public static BTN_LASTTIME_STATE = "onBtnLastTimeState";
    /**上一次下注 */
    public static CHANGE_LAST_BTN = "onChangeLastBtn"
}