class GameConst {
    public static STAGE_WIDTH = 320;

    //背景音乐开关
    public static MUSIC = true;
    //音效开关
    public static EFFECT = true;

    public static WIDTH = 320;
    public static HEIGHT = 568;

    public static WIDTH_HALF = GameConst.WIDTH / 2;
    public static HEIGHT_HALF = GameConst.HEIGHT / 2;

//子弹速度
    public static BULLET_SPEED = 1500;
//敌机速度
    public static ENEMY_SPEED = 300;
//停留敌机速度
    public static SMALL_BOSS_SPEED = 100;
//boss敌机最后冲刺速度
    public static BIG_BOSS_SPEED = 500;
//小boss敌机停留时间
    public static SMALL_BOSS_STAYTIME = 3;
//boss敌机停留时间
    public static BIG_BOSS_STAYTIME = 6;

//冲刺中敌机速度
    public static ENEMY_SPURT_SPEED = 640;
//陨石速度
    public static ROCK_SPEED = 420;
//陨石跟踪速度
    public static ROCK_FOLLOW_SPEED = 40;
//炸弹飞行时间
    public static ROCK_BOMB_SPEED = 1;
//追踪飞机的速度
    public static FOLLOW_ENEMY_SPEED = 250;

//子弹产生间隔
    public static BULLET_DELAY = 0.03;
//每秒子弹数目
    public static BULLET_COUNT_PER = 1 / GameConst.BULLET_DELAY;
//产生飞机的间隔
    public static ENEMY_DELAY = 2;
//产生陨石的间隔
    public static ROCK_CONFIG_DELAY = 10;
//产生福利飞机的间隔
    public static BLESS_PLANE_DELAY = 6;
//产生停留飞机的间隔
    public static STAY_ENEMY_DELAY = 11;
//产生冲刺敌机的间隔
    public static ENEMY_SPURT_DELAY = 0.3;
//同一批陨石出现的间隔时间
    public static ROCK_DELAY = 0.4;
//冲刺持续时间
    public static SPURT_DURATION = 2.5;

//背景移动速度
    public static BG_SPEED = 5000;
//冲刺背景移动速度
    public static BG_SPURT_SPEED = 650;
//普通速度每秒飞行多少米
    public static DISTANCE_SPEED = 32;
//冲刺速度每秒飞行多少米
    public static DISTANCE_SPURT_SPEED = 128;

//缓存数据的预设数量
    public static PRESET_COUNT = {
        BULLET: 25,  //经测试，最大是22个
        //ENEMY:20, //敌机的预创个数移到enemyConfig每个敌机中
        EFFECT: 25,  //经测试，最大是21个
        //ITEM:5,     //道具的预创个数移到itemConfig每个道具
        EAT_ITEM_EFFECT: 5,  //已经判断
        ROCK: 5, //最多存在5个
        BOMB: 10,    //每次就是创建10个
        ENEMY_BLOODBAR: 10, //经测试，最大是7个
        ENEMY_EXP: 10  //已经判断
    };
//缓存数组数据（子弹、飞机等）
    public static CONTAINER = {
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
    public static ENEMY_WIDTH = 60;
    public static ENEMY_HEIGHT = 60;

//游戏场景中各部件的层
    public static PLAYER_Z_ORDER = 10;
    public static PLAYER_EFECT_Z_ORDER = 9;
    public static BULLET_Z_ORDER = 0;
    public static ENEMY_Z_ORDER = 0;
    public static EFFECT_Z_ORDER = 0;
    public static BG_Z_ORDER = -10;
    public static ROCKWARNING_Z_ORDER = 0;
    public static ROCKLINE_Z_ORDER = 0;
    public static ROCKSTONE_Z_ORDER = 0;

//游戏背景
    public static BG_FILES = [];

//指定图片ID
    public static PNG_BOMB_EFFECT = "#cc_efx3.png";

//Action Tag ID
    public static ACTION_TAG_ROCKLIST = 1000;


//-----------------------逻辑部分的配置---------------------------------------
//随机获得商城道具的花费
    public static RANDOM_STOREITME_PRICE = 199;
//玩家可携带炸弹最大数量
    public static BOMB_MAX_COUNT = 4;
//多少米后才刷新记录时，才出现新记录图片
    public static NEW_RECORD_DISTANCE = 50;
//飞行距离对应的难度等级
    public static DISTANCE_STAGE_UNIT = 500;


}
