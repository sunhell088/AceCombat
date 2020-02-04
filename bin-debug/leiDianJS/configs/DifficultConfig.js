/**
 * Created by kurt on 2015/4/8.
 */
//每个飞行阶段对应的普通飞机库(前期变化快一些，后期慢,并且会)
var NormalEnemyForStage = [
    EnemyConfig.enemy0,
    EnemyConfig.enemy0,
    EnemyConfig.enemy1,
    EnemyConfig.enemy1,
    EnemyConfig.enemy2,
    EnemyConfig.enemy2,
    EnemyConfig.enemy3,
    EnemyConfig.enemy3,
    EnemyConfig.enemy4,
    EnemyConfig.enemy4,
    EnemyConfig.enemy5,
    EnemyConfig.enemy5,
    EnemyConfig.enemy6,
    EnemyConfig.enemy6,
    EnemyConfig.enemy7,
    EnemyConfig.enemy7,
    EnemyConfig.enemy8,
    EnemyConfig.enemy8,
    EnemyConfig.enemy9,
    EnemyConfig.enemy9 //10000
];
//根据飞行距离获取飞机库
VVV.getEnemyConfigByStage = function (stageIndex) {
    if (stageIndex < 0)
        stageIndex = 0;
    if (stageIndex >= NormalEnemyForStage.length)
        stageIndex = NormalEnemyForStage.length - 1;
    return NormalEnemyForStage[stageIndex];
};
//根据子弹威力获取敌机血量
VVV.getEnemyHPByPower = function (enemyConfig) {
    var totalHPArr = [
        [0.3, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0],
        [0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
        [1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2],
        [1.2, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2],
        [1.4, 1.4, 1.4, 1.4, 1.2, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3],
        [1.6, 1.6, 1.6, 1.6, 1.4, 1.4, 1.4, 1.4, 1.2, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3],
        [1.8, 1.8, 1.8, 1.8, 1.6, 1.6, 1.6, 1.6, 1.4, 1.4, 1.4, 1.4, 1.2, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3],
        [2.0, 2.0, 2.0, 2.0, 1.8, 1.8, 1.8, 1.8, 1.6, 1.6, 1.6, 1.6, 1.4, 1.4, 1.4, 1.4, 1.2, 1.2, 1.2, 1.2, 1.0, 1.0, 1.0, 1.0, 0.8, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4]
    ];
    var enemyIndex = 0;
    for (var k in EnemyConfig) {
        if (enemyConfig == EnemyConfig[k]) {
            break;
        }
        enemyIndex++;
    }
    //默认0.1，这样非普通飞机的血量参数就是0.1
    var hp = 0.2;
    if (enemyIndex < totalHPArr.length) {
        hp = totalHPArr[enemyIndex][GlobalProxy.globalProxy.getGrade() - 1];
    }
    return hp * VVV.BULLET_COUNT_PER;
};
//爆金币和钻石的概率
VVV.GOLD_DROP_ODDS = [
    { min: 1, max: 95, itemConfig: ItemConfig.item_coin },
    { min: 96, max: 99, itemConfig: ItemConfig.item_red },
    { min: 100, max: 100, itemConfig: ItemConfig.item_green }
];
//获得暴落物
VVV.getDropItemArray = function (amount) {
    var dropArray = [];
    for (var x = 0; x < amount; x++) {
        var random = parseInt(CommonUtil.randomInteger(1, 100) + "");
        for (var i = 0; i < VVV.GOLD_DROP_ODDS.length; i++) {
            var oddsItem = VVV.GOLD_DROP_ODDS[i];
            if (random >= oddsItem.min && random <= oddsItem.max) {
                dropArray.push(oddsItem.itemConfig);
                break;
            }
        }
    }
    //最后再乱序
    dropArray.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
    return dropArray;
};
//初级陨石库
var RockConfigForStage1 = [
    [[1]],
    [[2]],
    [[3]],
    [[4]],
    [[0, 5]],
    //[[1,4]],
    [[2, 3]],
    [[0, 1, 2]],
    [[3, 4, 5]],
    //[[1,2,3]],
    //[[2,3,4]],
    [[0], [1], [2]],
    [[5], [4], [3]],
    //[[2],[1],[0]],
    //[[3],[4],[5]],
    //[[2],[0,1]],
    //[[3],[4,5]],
    //[[2,3],[1],[0]],
    //[[2,3],[4],[5]],
    [["1"]],
    [["3"]]
    //[[0,"5"]],
    //[["0",5]]
];
//中级陨石库
var RockConfigForStage2 = [
    [[0, 1, 2, 3]],
    [[2, 3, 4, 5]],
    //[[1,2,3,4]],
    //[[4],[3],[0,1,2]],
    //[[1],[2],[3,4,5]],
    //[[0],[1],[2],[3],[4]],
    //[[5],[4],[3],[2],[1]],
    [["0", "5"]],
    [[0, 1, "2"]],
    [["3", 4, 5]],
    [["0"], ["1"], ["2"]],
];
//高级陨石库
var RockConfigForStage3 = [
    [[0, 1, 2, 3, 4]],
    [[1, 2, 3, 4, 5]]
    //[["5"],[0,1,2,3]],
    //[["0"],[2,3,4,5]]
];
//根据飞行距离获取陨石库
VVV.getRockConfigByStage = function () {
    var diff1 = 0;
    var diff2 = 0;
    var diff3 = 0;
    var stageIndex = GlobalProxy.globalProxy.getDistanceStage();
    if (stageIndex < 3) {
        diff1 = 10;
        diff2 = 0;
        diff3 = 0;
    }
    else if (stageIndex < 6) {
        diff1 = 7;
        diff2 = 3;
        diff3 = 0;
    }
    else if (stageIndex < 10) {
        diff1 = 4;
        diff2 = 6;
        diff3 = 0;
    }
    else {
        diff1 = 3;
        diff2 = 6;
        diff3 = 1;
    }
    diff2 += diff1;
    diff3 += diff2;
    var rockLib = null;
    var random = CommonUtil.randomInteger(0, diff3 - 1);
    if (random < diff1) {
        rockLib = RockConfigForStage1;
    }
    else if (random < diff2) {
        rockLib = RockConfigForStage2;
    }
    else {
        rockLib = RockConfigForStage3;
    }
    return rockLib[CommonUtil.randomInteger(0, rockLib.length - 1)];
};
//福利飞机数组
var BlessEnemeys = [EnemyConfig.enemyBox, EnemyConfig.enemyBomb];
//停留飞机数组
var StayEnemeys = [EnemyConfig.enemyStay1, EnemyConfig.enemyStay2, EnemyConfig.enemyFollow];
VVV.createSpecialEnemyDrop = function (enemySprite) {
    var dropArray = [];
    if (enemySprite._enemyConfig == EnemyConfig.enemyBox) {
        dropArray.push(ItemConfig.item_green);
        dropArray.push(ItemConfig.item_green);
    }
    // if(!g_sharedGameLayer._itemDropArr || g_sharedGameLayer._itemDropArr.length==0){
    //     g_sharedGameLayer._itemDropArr = [];
    //     for(var k in ItemConfig){
    //         if(ItemConfig[k].gold) continue;
    //         g_sharedGameLayer._itemDropArr.push(ItemConfig[k]);
    //     }
    //     g_sharedGameLayer._itemDropArr.sort(function(){return Math.random()>0.5?-1:1;});
    // }
    // var item = g_sharedGameLayer._itemDropArr.shift();
    // dropArray.push(item);
    return dropArray;
};
