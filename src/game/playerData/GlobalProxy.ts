/**
 * 全局的持久化数据对象
 */
class GlobalProxy {
    public static globalProxy: GlobalProxy;

    //需要存盘的数据
    public data: {
        //飞机们的当前等级的经验
        exps: {},
        //飞机们的当前等级
        grades: {},
        //当前金币
        gold: number,
        //飞行最远距离
        maxDistance: number,
        //当前拥有的飞机（用掩码记录）
        planeStorage: number,
        //当前使用的飞机
        currentPlaneID: number,
        //已玩游戏次数
        playedCount: number,
        //第一次的游戏时间（用于显示总在线游戏时间）
        bornTime: number,
        //拥有的道具
        storeItemPackage: { itemID: number }[]
    } = null;


    //当前拥有的炸弹数目
    public bomb: number = 1;
    //本局飞行距离
    public currentDistance: number = 0;
    //本局获得金币数
    public currentRewardGold: number = 0;
    //本局神秘祝福效果
    public randomItemID: string = "";

    //从本地读取玩家数据
    public loadData(): void {
        if (localStorage.playerData) {
            this.data = JSON.parse(localStorage.playerData);
        } else {
            this.createPlayer();
        }
    };

    //每秒保存一次玩家数据
    public saveData(): void {
        JSON.stringify(this.data);
        localStorage.playerData = JSON.stringify(this.data);
    };

    //清存档
    public clearData(): void {
        localStorage.clear();
    };

    //第一次登录游戏，创建玩家对象
    public createPlayer(): void {
        let bornPlaneID = PlaneConfig.plane0.id;
        this.data.exps = {};
        this.data.grades = {};
        this.data.exps[bornPlaneID] = this.data.exps[bornPlaneID] || 0;
        this.data.grades[bornPlaneID] = this.data.grades[bornPlaneID] || 1;
        this.data.planeStorage = bornPlaneID;
        this.data.currentPlaneID = bornPlaneID;
        let date: Date = new Date();
        this.data.bornTime = date.getTime();
        this.data.storeItemPackage = [];
    };

    //获得指定飞机的经验(不传参数则为当前出战飞机)
    public getExp(planeID): number {
        if (planeID == undefined) planeID = this.data.currentPlaneID;
        this.data.exps[planeID] = this.data.exps[planeID] || 0;
        return this.data.exps[planeID];
    };

    //获得指定飞机的等级(不传参数则为当前出战飞机)
    public getGrade(planeID: number = undefined): number {
        if (planeID == undefined) planeID = this.data.currentPlaneID;
        this.data.grades[planeID] = this.data.grades[planeID] || 1;
        return this.data.grades[planeID];
    };

    //增加当前飞机的经验
    public addExp(value): void {
        let currentPlaneID = this.data.currentPlaneID;
        if (value <= 0) return;
        if (this.getGrade(currentPlaneID) >= CommonConfig.levelExp.length) return;
        let offset = (this.getExp(currentPlaneID) + value) - VVV.getExpByLevel(this.getGrade(currentPlaneID));
        if (offset < 0) {
            this.data.exps[currentPlaneID] += value;
        } else {
            this.data.grades[currentPlaneID]++;
            if (this.data.grades[currentPlaneID] == CommonConfig.levelExp.length) {
                this.data.exps[currentPlaneID] = 0;
            } else {
                this.data.exps[currentPlaneID] = offset;
            }
            this.upGrade(currentPlaneID);
        }
        //刷新战斗界面
        ObserverManager.sendNotification(GameEvent.EXP_INCREASE_IN_FIGHT);
        // g_FightUILayer.setGradeLable(this.getGrade());
        // g_FightUILayer.setExpBar(Math.round(this.getExp() / VVV.getExpByLevel(this.getGrade()) * 100));
    };

    //升级
    public upGrade(planeID): void {
        ObserverManager.sendNotification(GameEvent.EXP_INCREASE_IN_FIGHT);
        // g_FightUILayer.setGradeLable(this.getGrade(planeID));
        // g_sharedGameLayer._ship.levelUpAction();
    };

    //加金币
    public addGold(value): void {
        if (value <= 0) return;
        this.data.gold += value;
    };

    //扣金币
    public deductGold(value): void {
        if (value <= 0) return;
        this.data.gold -= value;
    };

    //增加炸弹
    public addBomb(count): void {
        if (count == undefined) count = 1;
        this.bomb += count;
        if (this.bomb >= VVV.BOMB_MAX_COUNT) {
            this.bomb = VVV.BOMB_MAX_COUNT;
        }
        ObserverManager.sendNotification(GameEvent.ADD_BOMB_IN_FIGHT);
        // g_FightUILayer.setBombCount(this.bomb);
    };

    //使用炸弹
    public useBomb(): boolean {
        if (this.bomb <= 0) return false;
        this.bomb--;
        ObserverManager.sendNotification(GameEvent.USE_BOMB_IN_FIGHT);
        // g_FightUILayer.setBombCount(this.bomb);
        return true;
    };

    //增加本局金币数量
    public addCurrentRewardGold(value) {
        if (value <= 0) return;
        this.currentRewardGold += value;
        //动画
        ObserverManager.sendNotification(GameEvent.ADD_GOLD_IN_FIGHT);
        // g_FightUILayer.setGoldLabel(this.currentRewardGold);
    };

    //刷新最远飞行距离(返回是否创记录)
    public updateMaxDistance(): boolean {
        if (this.currentDistance <= this.data.maxDistance) return false;
        this.data.maxDistance = this.currentDistance;
        return true;
    };

    //增加已玩游戏次数
    public addPlayedCount(): void {
        this.data.playedCount++;
    };

    //获得总在线游戏时间()
    public getTotalOnlineTime(): number {
        let date = new Date();
        let onlineTime = date.getTime() - this.data.bornTime;
        return onlineTime;
    };

    //判断是否拥有指定战机
    public getPlane(planeID): {} {
        if (this.data.planeStorage & planeID) {
            return VVV.getPlaneConfig(planeID);
        }
        return null;
    };

    //购买战机
    public buyPlane(planeID): boolean {
        let planeConfig = VVV.getPlaneConfig(planeID);
        if (!planeConfig) return false;
        if (this.data.gold < planeConfig.price) return false;
        this.deductGold(planeConfig.price);
        this.data.planeStorage += planeConfig.id;
        this.data.currentPlaneID = planeConfig.id;
        return true;
    };

    //设置当前战机
    public setCurrentPlane(planeID): void {
        if (!this.getPlane(planeID)) return;
        this.data.currentPlaneID = planeID;
    };

    //获得玩家身上指定商城道具的数量
    public getStoreItem(itemID): any {
        for (let i = 0; i < this.data.storeItemPackage.length; i++) {
            if (this.data.storeItemPackage[i].itemID == itemID) {
                return this.data.storeItemPackage[i];
            }
        }
        let storeItemConfig = VVV.getStoreItemConfig(itemID);
        if (storeItemConfig) {
            let newItme = {itemID: itemID, count: 0};
            this.data.storeItemPackage.push(newItme);
            return newItme;
        }
        return null;
    };

    //购买商城道具
    public buyStoreItem(itemID): boolean {
        let storeItemConfig = VVV.getStoreItemConfig(itemID);
        if (storeItemConfig == null) return false;
        if (this.data.gold < storeItemConfig.price) return false;
        this.deductGold(storeItemConfig.price);
        let storeItem = this.getStoreItem(itemID);
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

    //使用玩家的商城道具
    public useStoreItem(itemID): boolean {
        let storeItem = this.getStoreItem(itemID);
        if (storeItem == null || storeItem.count <= 0) return false;
        storeItem.count--;
        let item = VVV.getStoreItemConfig(itemID);
        item.itemFunction();
        return true;
    };

    //花一定金币随机获得商城道具
    public randomItem(): any {
        if (this.data.gold < VVV.RANDOM_STOREITME_PRICE) return null;
        let randomItems = [];
        for (let p in StoreItemConfig) {
            //如果已经购买了怎不在随机里面
            if (this.getStoreItem(StoreItemConfig[p].id).count != 0) continue;
            //如果已经拥有全部飞机，跳过 切换战机 道具
            if (StoreItemConfig[p] == StoreItemConfig.changePlane) {
                let haveAllPlane = true;
                for (let k in PlaneConfig) {
                    if (!this.getPlane(PlaneConfig[k].id)) {
                        haveAllPlane = false;
                        break;
                    }
                }
                if (haveAllPlane) continue;
            }
            randomItems.push(StoreItemConfig[p]);
        }
        if (randomItems.length == 0) return null;
        let storeItemConfig = randomItems[CommonUtil.randomInteger(0, randomItems.length - 1)];
        this.randomItemID = storeItemConfig.id;
        this.deductGold(VVV.RANDOM_STOREITME_PRICE);
        return storeItemConfig;
    };

    //获得玩家子弹的威力
    public getBulletPower() {
        let basePower = 1;
        let ratio = 1;
        // if(g_sharedGameLayer._doublePower) ratio = 2;
        // if(g_sharedGameLayer._ship._invincible) ratio = 10000;
        // if(g_sharedGameLayer._ship.debugMode) ratio = 10000;
        return basePower * ratio;
    };

    //飞行距离对应的难度等级
    public getDistanceStage(): number {
        return Math.ceil(this.currentDistance / VVV.DISTANCE_STAGE_UNIT);
    };

    //每次战斗开始时，重置一次相关信息
    public resetFightData() {
        this.bomb = 1;
        this.currentDistance = 0;
        this.currentRewardGold = 0;
    }

}