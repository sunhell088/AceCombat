var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundConst = (function () {
    function SoundConst() {
    }
    //------------登录音乐
    SoundConst.mainMusic_mp3 = "game_bg0_mp3";
    //点击按钮声音
    SoundConst.OnclickEffect_mp3 = "click_mp3";
    //购买物品声音
    SoundConst.buyItemEffect_mp3 = "buy_item_mp3";
    //-----------战斗中音乐
    //战斗音乐
    SoundConst.fightMusic_mp3 = "game_bg2_mp3";
    //岩石落下提示音	alert_big
    SoundConst.alert_big = "alert_big_mp3";
    //岩石落下	meteor
    SoundConst.meteor = "meteor_mp3";
    //吃到宝石	get_bs
    SoundConst.get_bs = "get_bs_mp3";
    //吃到金币	get_coin
    SoundConst.get_coin = "get_coin_mp3";
    //吃到道具	get_item
    SoundConst.get_item = "get_item_mp3";
    //撞上敌机死掉	firework
    SoundConst.firework = "dead1_mp3";
    //带有女妖面纱时被敌机撞死	shield
    SoundConst.shield = "shield_mp3";
    //敌机死亡	mon_die
    SoundConst.mon_die = "mon_die_mp3";
    //宝箱飞机死亡 box_dead
    SoundConst.box_dead = "box_dead_mp3";
    //自爆飞机死亡	enemy_bomb
    SoundConst.bombEnemy_dead = "yunshi_dead_mp3";
    //追踪飞机死亡	yunshi_dead
    SoundConst.followEnemy_dead = "yunshi_dead_mp3";
    //boss飞机死亡	enemy_bomb
    SoundConst.boss_dead = "yunshi_dead_mp3";
    //陨石被消除时	yunshi_dead
    SoundConst.yunshi_dead = "yunshi_dead_mp3";
    //冲刺	cc_ready
    SoundConst.cc_ready = "trans4_mp3";
    //使用炸弹	cc_sound0
    SoundConst.useBomb = "cc_sound0_mp3";
    //升级瞬间音效
    SoundConst.levelUpReady = "trans1_mp3";
    //进入升级中无敌子弹状态音效
    SoundConst.levelUpIng = "b2_mp3";
    //追踪飞机追踪时音效
    SoundConst.followEnemy_follow = "magnet_end_mp3";
    return SoundConst;
}());
__reflect(SoundConst.prototype, "SoundConst");
