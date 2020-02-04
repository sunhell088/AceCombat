var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局的持久化数据对象
 */
var GlobalProxy = (function () {
    function GlobalProxy() {
        //需要存盘的数据
        this.data = null;
        //当前拥有的炸弹数目
        this.bomb = 1;
        //本局飞行距离
        this.currentDistance = 0;
        //本局获得金币数
        this.currentRewardGold = 0;
        //本局神秘祝福效果
        this.randomItemID = "";
    }
    //从本地读取玩家数据
    GlobalProxy.prototype.loadData = function () {
        if (localStorage.playerData) {
            this.data = JSON.parse(localStorage.playerData);
        }
        else {
            this.createPlayer();
        }
    };
    ;
    //每秒保存一次玩家数据
    GlobalProxy.prototype.saveData = function () {
        JSON.stringify(this.data);
        localStorage.playerData = JSON.stringify(this.data);
    };
    ;
    //清存档
    GlobalProxy.prototype.clearData = function () {
        localStorage.clear();
    };
    ;
    //第一次登录游戏，创建玩家对象
    GlobalProxy.prototype.createPlayer = function () {
        var bornPlaneID = PlaneConfig.plane0.id;
        this.data.exps = {};
        this.data.grades = {};
        this.data.exps[bornPlaneID] = this.data.exps[bornPlaneID] || 0;
        this.data.grades[bornPlaneID] = this.data.grades[bornPlaneID] || 1;
        this.data.planeStorage = bornPlaneID;
        this.data.currentPlaneID = bornPlaneID;
        var date = new Date();
        this.data.bornTime = date.getTime();
        this.data.storeItemPackage = [];
    };
    ;
    //获得指定飞机的经验(不传参数则为当前出战飞机)
    GlobalProxy.prototype.getExp = function (planeID) {
        if (planeID == undefined)
            planeID = this.data.currentPlaneID;
        this.data.exps[planeID] = this.data.exps[planeID] || 0;
        return this.data.exps[planeID];
    };
    ;
    //获得指定飞机的等级(不传参数则为当前出战飞机)
    GlobalProxy.prototype.getGrade = function (planeID) {
        if (planeID === void 0) { planeID = undefined; }
        if (planeID == undefined)
            planeID = this.data.currentPlaneID;
        this.data.grades[planeID] = this.data.grades[planeID] || 1;
        return this.data.grades[planeID];
    };
    ;
    //增加当前飞机的经验
    GlobalProxy.prototype.addExp = function (value) {
        var currentPlaneID = this.data.currentPlaneID;
        if (value <= 0)
            return;
        if (this.getGrade(currentPlaneID) >= CommonConfig.levelExp.length)
            return;
        var offset = (this.getExp(currentPlaneID) + value) - VVV.getExpByLevel(this.getGrade(currentPlaneID));
        if (offset < 0) {
            this.data.exps[currentPlaneID] += value;
        }
        else {
            this.data.grades[currentPlaneID]++;
            if (this.data.grades[currentPlaneID] == CommonConfig.levelExp.length) {
                this.data.exps[currentPlaneID] = 0;
            }
            else {
                this.data.exps[currentPlaneID] = offset;
            }
            this.upGrade(currentPlaneID);
        }
        //刷新战斗界面
        ObserverManager.sendNotification(GameEvent.EXP_INCREASE_IN_FIGHT);
        // g_FightUILayer.setGradeLable(this.getGrade());
        // g_FightUILayer.setExpBar(Math.round(this.getExp() / VVV.getExpByLevel(this.getGrade()) * 100));
    };
    ;
    //升级
    GlobalProxy.prototype.upGrade = function (planeID) {
        ObserverManager.sendNotification(GameEvent.EXP_INCREASE_IN_FIGHT);
        // g_FightUILayer.setGradeLable(this.getGrade(planeID));
        // g_sharedGameLayer._ship.levelUpAction();
    };
    ;
    //加金币
    GlobalProxy.prototype.addGold = function (value) {
        if (value <= 0)
            return;
        this.data.gold += value;
    };
    ;
    //扣金币
    GlobalProxy.prototype.deductGold = function (value) {
        if (value <= 0)
            return;
        this.data.gold -= value;
    };
    ;
    //增加炸弹
    GlobalProxy.prototype.addBomb = function (count) {
        if (count == undefined)
            count = 1;
        this.bomb += count;
        if (this.bomb >= VVV.BOMB_MAX_COUNT) {
            this.bomb = VVV.BOMB_MAX_COUNT;
        }
        ObserverManager.sendNotification(GameEvent.ADD_BOMB_IN_FIGHT);
        // g_FightUILayer.setBombCount(this.bomb);
    };
    ;
    //使用炸弹
    GlobalProxy.prototype.useBomb = function () {
        if (this.bomb <= 0)
            return false;
        this.bomb--;
        ObserverManager.sendNotification(GameEvent.USE_BOMB_IN_FIGHT);
        // g_FightUILayer.setBombCount(this.bomb);
        return true;
    };
    ;
    //增加本局金币数量
    GlobalProxy.prototype.addCurrentRewardGold = function (value) {
        if (value <= 0)
            return;
        this.currentRewardGold += value;
        //动画
        ObserverManager.sendNotification(GameEvent.ADD_GOLD_IN_FIGHT);
        // g_FightUILayer.setGoldLabel(this.currentRewardGold);
    };
    ;
    //刷新最远飞行距离(返回是否创记录)
    GlobalProxy.prototype.updateMaxDistance = function () {
        if (this.currentDistance <= this.data.maxDistance)
            return false;
        this.data.maxDistance = this.currentDistance;
        return true;
    };
    ;
    //增加已玩游戏次数
    GlobalProxy.prototype.addPlayedCount = function () {
        this.data.playedCount++;
    };
    ;
    //获得总在线游戏时间()
    GlobalProxy.prototype.getTotalOnlineTime = function () {
        var date = new Date();
        var onlineTime = date.getTime() - this.data.bornTime;
        return onlineTime;
    };
    ;
    //判断是否拥有指定战机
    GlobalProxy.prototype.getPlane = function (planeID) {
        if (this.data.planeStorage & planeID) {
            return VVV.getPlaneConfig(planeID);
        }
        return null;
    };
    ;
    //购买战机
    GlobalProxy.prototype.buyPlane = function (planeID) {
        var planeConfig = VVV.getPlaneConfig(planeID);
        if (!planeConfig)
            return false;
        if (this.data.gold < planeConfig.price)
            return false;
        this.deductGold(planeConfig.price);
        this.data.planeStorage += planeConfig.id;
        this.data.currentPlaneID = planeConfig.id;
        return true;
    };
    ;
    //设置当前战机
    GlobalProxy.prototype.setCurrentPlane = function (planeID) {
        if (!this.getPlane(planeID))
            return;
        this.data.currentPlaneID = planeID;
    };
    ;
    //获得玩家身上指定商城道具的数量
    GlobalProxy.prototype.getStoreItem = function (itemID) {
        for (var i = 0; i < this.data.storeItemPackage.length; i++) {
            if (this.data.storeItemPackage[i].itemID == itemID) {
                return this.data.storeItemPackage[i];
            }
        }
        var storeItemConfig = VVV.getStoreItemConfig(itemID);
        if (storeItemConfig) {
            var newItme = { itemID: itemID, count: 0 };
            this.data.storeItemPackage.push(newItme);
            return newItme;
        }
        return null;
    };
    ;
    //购买商城道具
    GlobalProxy.prototype.buyStoreItem = function (itemID) {
        var storeItemConfig = VVV.getStoreItemConfig(itemID);
        if (storeItemConfig == null)
            return false;
        if (this.data.gold < storeItemConfig.price)
            return false;
        this.deductGold(storeItemConfig.price);
        var storeItem = this.getStoreItem(itemID);
        storeItem.count++;
        // //排序，用于执行时的顺序
        // this.data.storeItemPackage.sort(
        //     function(a,b){
        //         let itemConfigA = VVV.getStoreItemConfig(a.itemID);
        //         let itemConfigB = VVV.getStoreItemConfig(b.itemID);
        //         return itemConfigA.sortValue<itemConfigB.sortValue;
        //     }
        // );
        return true;
    };
    ;
    //使用玩家的商城道具
    GlobalProxy.prototype.useStoreItem = function (itemID) {
        var storeItem = this.getStoreItem(itemID);
        if (storeItem == null || storeItem.count <= 0)
            return false;
        storeItem.count--;
        var item = VVV.getStoreItemConfig(itemID);
        item.itemFunction();
        return true;
    };
    ;
    //花一定金币随机获得商城道具
    GlobalProxy.prototype.randomItem = function () {
        if (this.data.gold < VVV.RANDOM_STOREITME_PRICE)
            return null;
        var randomItems = [];
        for (var p in StoreItemConfig) {
            //如果已经购买了怎不在随机里面
            if (this.getStoreItem(StoreItemConfig[p].id).count != 0)
                continue;
            //如果已经拥有全部飞机，跳过 切换战机 道具
            if (StoreItemConfig[p] == StoreItemConfig.changePlane) {
                var haveAllPlane = true;
                for (var k in PlaneConfig) {
                    if (!this.getPlane(PlaneConfig[k].id)) {
                        haveAllPlane = false;
                        break;
                    }
                }
                if (haveAllPlane)
                    continue;
            }
            randomItems.push(StoreItemConfig[p]);
        }
        if (randomItems.length == 0)
            return null;
        var storeItemConfig = randomItems[CommonUtil.randomInteger(0, randomItems.length - 1)];
        this.randomItemID = storeItemConfig.id;
        this.deductGold(VVV.RANDOM_STOREITME_PRICE);
        return storeItemConfig;
    };
    ;
    //获得玩家子弹的威力
    GlobalProxy.prototype.getBulletPower = function () {
        var basePower = 1;
        var ratio = 1;
        // if(g_sharedGameLayer._doublePower) ratio = 2;
        // if(g_sharedGameLayer._ship._invincible) ratio = 10000;
        // if(g_sharedGameLayer._ship.debugMode) ratio = 10000;
        return basePower * ratio;
    };
    ;
    //飞行距离对应的难度等级
    GlobalProxy.prototype.getDistanceStage = function () {
        return Math.ceil(this.currentDistance / VVV.DISTANCE_STAGE_UNIT);
    };
    ;
    //每次战斗开始时，重置一次相关信息
    GlobalProxy.prototype.resetFightData = function () {
        this.bomb = 1;
        this.currentDistance = 0;
        this.currentRewardGold = 0;
    };
    return GlobalProxy;
}());
__reflect(GlobalProxy.prototype, "GlobalProxy");
