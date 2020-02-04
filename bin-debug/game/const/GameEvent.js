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
    //战斗中经验增加
    GameEvent.EXP_INCREASE_IN_FIGHT = "EXP_INCREASE_IN_FIGHT";
    //战斗中升级
    GameEvent.UP_GRADE_IN_FIGHT = "UP_GRADE_IN_FIGHT";
    //战斗中增加炸弹
    GameEvent.ADD_BOMB_IN_FIGHT = "ADD_BOMB_IN_FIGHT";
    //战斗中增加炸弹
    GameEvent.USE_BOMB_IN_FIGHT = "USE_BOMB_IN_FIGHT";
    //战斗中增加金币
    GameEvent.ADD_GOLD_IN_FIGHT = "ADD_GOLD_IN_FIGHT";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
