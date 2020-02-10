var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    //背景移动速度
    GameConst.BG_SPEED = 5000;
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
