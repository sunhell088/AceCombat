var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonConst = (function () {
    function CommonConst() {
    }
    CommonConst.STAGE_WIDTH = 1080;
    CommonConst.STAGE_HEIGHT = 1920;
    CommonConst.GAME_ID = "AceCombat";
    //加载相关的groupName
    CommonConst.RES_GROUP_PRELOAD = "preload";
    CommonConst.RES_GROUP_GAME_SCENE = "gameScene";
    CommonConst.RES_GROUP_HELP = "help";
    //静默加载顺序
    CommonConst.RES_GROUP_ORDER = [CommonConst.RES_GROUP_PRELOAD, CommonConst.RES_GROUP_GAME_SCENE,
        CommonConst.RES_GROUP_HELP];
    return CommonConst;
}());
__reflect(CommonConst.prototype, "CommonConst");
