/**
 * Created by kurt on 2015/3/12.
 */
var VVV = {
    MUSIC: true,
    EFFECT: true,
    WIDTH: 320,
    HEIGHT: 568,
    WIDTH_HALF: 320 / 2,
    HEIGHT_HALF: 568 / 2,
    BULLET_SPEED: 1500,
    ENEMY_SPEED: 300,
    SMALL_BOSS_SPEED: 100,
    BIG_BOSS_SPEED: 500,
    SMALL_BOSS_STAYTIME: 3,
    BIG_BOSS_STAYTIME: 6,
    ENEMY_SPURT_SPEED: 640,
    ROCK_SPEED: 420,
    ROCK_FOLLOW_SPEED: 40,
    ROCK_BOMB_SPEED: 1,
    FOLLOW_ENEMY_SPEED: 250,
    BULLET_DELAY: 0.03,
    BULLET_COUNT_PER: 1 / 0.03,
    ENEMY_DELAY: 2,
    ROCK_CONFIG_DELAY: 10,
    BLESS_PLANE_DELAY: 6,
    STAY_ENEMY_DELAY: 11,
    ENEMY_SPURT_DELAY: 0.3,
    ROCK_DELAY: 0.4,
    SPURT_DURATION: 2.5,
    BG_SPEED: 50,
    BG_SPURT_SPEED: 650,
    DISTANCE_SPEED: 32,
    DISTANCE_SPURT_SPEED: 128,
    PRESET_COUNT: {},
    CONTAINER: {},
    ENEMY_WIDTH: 60,
    ENEMY_HEIGHT: 60,
    PLAYER_Z_ORDER: 10,
    PLAYER_EFECT_Z_ORDER: 9,
    BULLET_Z_ORDER: 0,
    ENEMY_Z_ORDER: 0,
    EFFECT_Z_ORDER: 0,
    BG_Z_ORDER: -10,
    ROCKWARNING_Z_ORDER: 0,
    ROCKLINE_Z_ORDER: 0,
    ROCKSTONE_Z_ORDER: 0,
    PNG_BOMB_EFFECT: "cc_efx3_png",
    ACTION_TAG_ROCKLIST: 1000,
    RANDOM_STOREITME_PRICE: 199,
    BOMB_MAX_COUNT: 4,
    NEW_RECORD_DISTANCE: 50,
    DISTANCE_STAGE_UNIT: 500, GOLD_DROP_ODDS: [], getEnemyExp: function () {
    },
    presetSundries: function () {
    },
    eatItemEffect: function (itemConfig) {
    },
    getStoreItemConfig: function (itemID) {
    },
    getPlaneConfig: function (planeID) {
    },
    getAnimateDuration: function (effectConfig) {
    },
    getAnimateAction: function (effectConfig) {
    },
    createSpecialEnemyDrop: function (enemySprite) {
    },
    getRockConfigByStage: function () {
    },
    getDropItemArray: function (amount) {
    },
    getEnemyHPByPower: function (enemyConfig) {
    },
    getEnemyConfigByStage: function (stageIndex) {
    },
    getExpByLevel: function (level) {
    }
};
//背景音乐开关
VVV.MUSIC = true;
//音效开关
VVV.EFFECT = true;
VVV.WIDTH = 320;
VVV.HEIGHT = 568;
VVV.WIDTH_HALF = VVV.WIDTH / 2;
VVV.HEIGHT_HALF = VVV.HEIGHT / 2;
//子弹速度
VVV.BULLET_SPEED = 1500;
//敌机速度
VVV.ENEMY_SPEED = 300;
//停留敌机速度
VVV.SMALL_BOSS_SPEED = 100;
//boss敌机最后冲刺速度
VVV.BIG_BOSS_SPEED = 500;
//小boss敌机停留时间
VVV.SMALL_BOSS_STAYTIME = 3;
//boss敌机停留时间
VVV.BIG_BOSS_STAYTIME = 6;
//冲刺中敌机速度
VVV.ENEMY_SPURT_SPEED = 640;
//陨石速度
VVV.ROCK_SPEED = 420;
//陨石跟踪速度
VVV.ROCK_FOLLOW_SPEED = 40;
//炸弹飞行时间
VVV.ROCK_BOMB_SPEED = 1;
//追踪飞机的速度
VVV.FOLLOW_ENEMY_SPEED = 250;
//子弹产生间隔
VVV.BULLET_DELAY = 0.03;
//每秒子弹数目
VVV.BULLET_COUNT_PER = 1 / VVV.BULLET_DELAY;
//产生飞机的间隔
VVV.ENEMY_DELAY = 2;
//产生陨石的间隔
VVV.ROCK_CONFIG_DELAY = 10;
//产生福利飞机的间隔
VVV.BLESS_PLANE_DELAY = 6;
//产生停留飞机的间隔
VVV.STAY_ENEMY_DELAY = 11;
//产生冲刺敌机的间隔
VVV.ENEMY_SPURT_DELAY = 0.3;
//同一批陨石出现的间隔时间
VVV.ROCK_DELAY = 0.4;
//冲刺持续时间
VVV.SPURT_DURATION = 2.5;
//背景移动速度
VVV.BG_SPEED = 50;
//冲刺背景移动速度
VVV.BG_SPURT_SPEED = 650;
//普通速度每秒飞行多少米
VVV.DISTANCE_SPEED = 32;
//冲刺速度每秒飞行多少米
VVV.DISTANCE_SPURT_SPEED = 128;
//缓存数据的预设数量
VVV.PRESET_COUNT = {
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
VVV.CONTAINER = {
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
VVV.ENEMY_WIDTH = 60;
VVV.ENEMY_HEIGHT = 60;
//游戏场景中各部件的层
VVV.PLAYER_Z_ORDER = 10;
VVV.PLAYER_EFECT_Z_ORDER = 9;
VVV.BULLET_Z_ORDER = 0;
VVV.ENEMY_Z_ORDER = 0;
VVV.EFFECT_Z_ORDER = 0;
VVV.BG_Z_ORDER = -10;
VVV.ROCKWARNING_Z_ORDER = 0;
VVV.ROCKLINE_Z_ORDER = 0;
VVV.ROCKSTONE_Z_ORDER = 0;
//指定图片ID
VVV.PNG_BOMB_EFFECT = "cc_efx3_png";
//Action Tag ID
VVV.ACTION_TAG_ROCKLIST = 1000;
//-----------------------逻辑部分的配置---------------------------------------
//随机获得商城道具的花费
VVV.RANDOM_STOREITME_PRICE = 199;
//玩家可携带炸弹最大数量
VVV.BOMB_MAX_COUNT = 4;
//多少米后才刷新记录时，才出现新记录图片
VVV.NEW_RECORD_DISTANCE = 50;
//飞行距离对应的难度等级
VVV.DISTANCE_STAGE_UNIT = 500;
