class CommonConst {
    public static STAGE_WIDTH = 320;
    public static STAGE_HEIGHT = 568;
    public static GAME_ID:string = "AceCombat";

    //加载相关的groupName
    public static RES_GROUP_PRELOAD:string = "preload";
    public static RES_GROUP_GAME_SCENE:string = "gameScene";
    public static RES_GROUP_HELP:string = "help";
    //静默加载顺序
    public static RES_GROUP_ORDER:string[] = [CommonConst.RES_GROUP_PRELOAD, CommonConst.RES_GROUP_GAME_SCENE,
        CommonConst.RES_GROUP_HELP];
}
