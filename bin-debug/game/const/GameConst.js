var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.STAGE_WIDTH = 320;
    //背景音乐开关
    GameConst.MUSIC = true;
    //音效开关
    GameConst.EFFECT = true;
    GameConst.WIDTH = 320;
    GameConst.HEIGHT = 568;
    GameConst.WIDTH_HALF = GameConst.WIDTH / 2;
    GameConst.HEIGHT_HALF = GameConst.HEIGHT / 2;
    //子弹速度
    GameConst.BULLET_SPEED = 1500;
    //敌机速度
    GameConst.ENEMY_SPEED = 300;
    //停留敌机速度
    GameConst.SMALL_BOSS_SPEED = 100;
    //boss敌机最后冲刺速度
    GameConst.BIG_BOSS_SPEED = 500;
    //小boss敌机停留时间
    GameConst.SMALL_BOSS_STAYTIME = 3;
    //boss敌机停留时间
    GameConst.BIG_BOSS_STAYTIME = 6;
    //冲刺中敌机速度
    GameConst.ENEMY_SPURT_SPEED = 640;
    //陨石速度
    GameConst.ROCK_SPEED = 420;
    //陨石跟踪速度
    GameConst.ROCK_FOLLOW_SPEED = 40;
    //炸弹飞行时间
    GameConst.ROCK_BOMB_SPEED = 1;
    //追踪飞机的速度
    GameConst.FOLLOW_ENEMY_SPEED = 250;
    //子弹产生间隔
    GameConst.BULLET_DELAY = 0.03;
    //每秒子弹数目
    GameConst.BULLET_COUNT_PER = 1 / GameConst.BULLET_DELAY;
    //产生飞机的间隔
    GameConst.ENEMY_DELAY = 2;
    //产生陨石的间隔
    GameConst.ROCK_CONFIG_DELAY = 10;
    //产生福利飞机的间隔
    GameConst.BLESS_PLANE_DELAY = 6;
    //产生停留飞机的间隔
    GameConst.STAY_ENEMY_DELAY = 11;
    //产生冲刺敌机的间隔
    GameConst.ENEMY_SPURT_DELAY = 0.3;
    //同一批陨石出现的间隔时间
    GameConst.ROCK_DELAY = 0.4;
    //冲刺持续时间
    GameConst.SPURT_DURATION = 2.5;
    //背景移动速度
    GameConst.BG_SPEED = 5000;
    //冲刺背景移动速度
    GameConst.BG_SPURT_SPEED = 650;
    //普通速度每秒飞行多少米
    GameConst.DISTANCE_SPEED = 32;
    //冲刺速度每秒飞行多少米
    GameConst.DISTANCE_SPURT_SPEED = 128;
    //缓存数据的预设数量
    GameConst.PRESET_COUNT = {
        BULLET: 25,
        //ENEMY:20, //敌机的预创个数移到enemyConfig每个敌机中
        EFFECT: 25,
        //ITEM:5,     //道具的预创个数移到itemConfig每个道具
        EAT_ITEM_EFFECT: 5,
        ROCK: 5,
        BOMB: 10,
        ENEMY_BLOODBAR: 10,
        ENEMY_EXP: 10 //已经判断
    };
    //缓存数组数据（子弹、飞机等）
    GameConst.CONTAINER = {
        BULLETS: [],
        ENEMYS: {},
        //用于存放检测碰撞的活动对象数组（避免使用for in降低了效率）
        ENEMYS_CHECK_COLLIDE: [],
        EFFECTS: {},
        BACKGROUND: [],
        ITEMS: {},
        //用于存放检测碰撞的活动对象数组（避免使用for in降低了效率）
        ITEMS_CHECK_COLLIDE: [],
        ROCKS: [],
        ROCK_LINES: [],
        BOMBS: {},
        BOMBS_CHECK_COLLIDE: [],
        //子弹打到敌机时特效
        BULLET_HIT: null,
        //全屏炸弹（屏幕暗掉图层）
        BOMB_LAYER_COLOR: null,
        //全屏炸弹（扩大光圈）
        BOMB_CIRCLE_EFFECT: null,
        //吃道具漂名字
        ITEM_NAME_TEXTURE: {},
        //吃暴落物品的特效
        EAT_ITEM_EFFECT: [],
        //敌机的血条
        ENMEY_BLOODBAR: [],
        //敌机的经验魂
        ENMEY_EXP: []
    };
    //敌机的宽和高
    GameConst.ENEMY_WIDTH = 60;
    GameConst.ENEMY_HEIGHT = 60;
    //游戏场景中各部件的层
    GameConst.PLAYER_Z_ORDER = 10;
    GameConst.PLAYER_EFECT_Z_ORDER = 9;
    GameConst.BULLET_Z_ORDER = 0;
    GameConst.ENEMY_Z_ORDER = 0;
    GameConst.EFFECT_Z_ORDER = 0;
    GameConst.BG_Z_ORDER = -10;
    GameConst.ROCKWARNING_Z_ORDER = 0;
    GameConst.ROCKLINE_Z_ORDER = 0;
    GameConst.ROCKSTONE_Z_ORDER = 0;
    //游戏背景
    GameConst.BG_FILES = [];
    //指定图片ID
    GameConst.PNG_BOMB_EFFECT = "#cc_efx3.png";
    //Action Tag ID
    GameConst.ACTION_TAG_ROCKLIST = 1000;
    //-----------------------逻辑部分的配置---------------------------------------
    //随机获得商城道具的花费
    GameConst.RANDOM_STOREITME_PRICE = 199;
    //玩家可携带炸弹最大数量
    GameConst.BOMB_MAX_COUNT = 4;
    //多少米后才刷新记录时，才出现新记录图片
    GameConst.NEW_RECORD_DISTANCE = 50;
    //飞行距离对应的难度等级
    GameConst.DISTANCE_STAGE_UNIT = 500;
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
