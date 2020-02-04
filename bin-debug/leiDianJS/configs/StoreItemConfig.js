/**
 * Created by kurt on 2015/3/27.
 */
var StoreItemConfig = {
    //宙斯护盾
    protect: {
        id: "protect",
        name: "宙斯护盾",
        textureName: "#shop_icon0.png",
        sortValue: 0,
        itemFunction: function () {
            g_sharedGameLayer._ship.setProtect(true);
        },
        trigger: "start",
        description: "抵挡一次任何形式的伤害",
        showStore: true,
        price: 1000
    },
    //炸弹（满载炸弹3枚）
    bomb: {
        id: "bomb",
        name: "炸弹3枚",
        textureName: "#shop_icon3.png",
        sortValue: 0,
        itemFunction: function () {
            GlobalProxy.globalProxy.addBomb(3);
        },
        trigger: "start",
        description: "开局就拥有3枚炸弹",
        showStore: true,
        price: 1000
    },
    //复活甲（并且接力）
    revive: {
        id: "revive",
        name: "复活甲",
        textureName: "#shop_icon4.png",
        sortValue: 0,
        itemFunction: function () {
            // //从未拥有飞机中随机一架，如果都拥有了，则随机非当前飞机
            // var randomArr = []
            // for(var p in PlaneConfig){
            //     if(PlaneConfig[p].id==GlobalProxy.globalProxy.data.currentPlaneID) continue;
            //     randomArr.push(PlaneConfig[p].id);
            // }
            // //乱序
            // randomArr.sort(function(){return Math.random()>0.5?-1:1;});
            // for(var k in randomArr){
            //     if(!GlobalProxy.globalProxy.getPlane(randomArr[k])){
            //         g_sharedGameLayer._revivePlaneID = randomArr[k];
            //         break;
            //     }
            // }
            // if(g_sharedGameLayer._revivePlaneID<=0){
            //     g_sharedGameLayer._revivePlaneID = randomArr[0];
            // }
        },
        trigger: "start",
        description: "死亡后，使用其他战机接力作战",
        showStore: true,
        price: 2000
    },
    //开局冲刺（从最好成绩处一半开始）
    spurt: {
        id: "spurt",
        name: "开局冲刺",
        textureName: "#shop_icon2.png",
        sortValue: 0,
        itemFunction: function () {
            // //出现道具图标
            // var storeItemIcon = g_FightUILayer._storeItemSpurt;
            // storeItemIcon.setPosition(VVV.WIDTH_HALF, VVV.HEIGHT_HALF);
            // storeItemIcon.setScale(8);
            // storeItemIcon.runAction(cc.sequence(
            //     cc.delayTime(g_sharedGameLayer._ship._changePlaneIng?3:0),
            //     cc.delayTime(1.5),
            //     cc.callFunc(function(){
            //         storeItemIcon.setVisible(true);
            //     }),
            //     cc.scaleTo(0.2,1),
            //     hlx.shakeBy(0.3,10,5),
            //     cc.callFunc(function(){
            //         g_sharedGameLayer._startSpurtDuration = 3000/VVV.DISTANCE_SPURT_SPEED;
            //         ////至少冲刺默认时间
            //         //if(g_sharedGameLayer._startSpurtDuration < VVV.SPURT_DURATION*2){
            //         //    g_sharedGameLayer._startSpurtDuration = VVV.SPURT_DURATION*2;
            //         //}
            //         ItemConfig.item_cc.itemFunction();
            //     }),
            //     cc.delayTime(1.5),
            //     VVV.getHideSelfCallFun(storeItemIcon)
            // ));
        },
        trigger: "start",
        description: "开局冲刺3000米",
        showStore: true,
        price: 2000
    },
    //死亡冲刺(冲刺本次距离1/10)
    death: {
        id: "death",
        name: "死亡冲刺",
        textureName: "#shop_icon8.png",
        sortValue: 0,
        itemFunction: function () {
            // g_sharedGameLayer._ship.death();
            // //出现道具图标
            // var storeItemIcon = g_FightUILayer._storeItemDeath;
            // storeItemIcon.setPosition(VVV.WIDTH_HALF, VVV.HEIGHT_HALF);
            // storeItemIcon.setScale(8);
            // storeItemIcon.runAction(cc.sequence(
            //     cc.delayTime(1.5),
            //     cc.callFunc(function(){
            //         storeItemIcon.setVisible(true);
            //     }),
            //     cc.scaleTo(0.2,1),
            //     hlx.shakeBy(0.3,10,5),
            //     cc.callFunc(function(){
            //         g_sharedGameLayer._ship.revive();
            //         g_sharedGameLayer._ship.setPosition(VVV.WIDTH_HALF,g_sharedGameLayer._ship.height*2);
            //
            //         g_sharedGameLayer._deathSpurtDuration = 1000/VVV.DISTANCE_SPURT_SPEED;
            //         ////至少冲刺默认时间
            //         //if(g_sharedGameLayer._deathSpurtDuration < VVV.SPURT_DURATION*3){
            //         //    g_sharedGameLayer._deathSpurtDuration = VVV.SPURT_DURATION*3;
            //         //}
            //         ItemConfig.item_cc.itemFunction();
            //     }),
            //     cc.delayTime(1.5),
            //     VVV.getHideSelfCallFun(storeItemIcon)
            // ));
        },
        trigger: "death",
        description: "拥有死亡后再冲刺1000米的能力",
        showStore: false,
        price: 100
    },
    //开局可选择随机使用未拥有新战机一次
    changePlane: {
        id: "changePlane",
        name: "随机新战机",
        textureName: "#shop_icon9.png",
        sortValue: 1,
        itemFunction: function () {
            // g_sharedGameLayer._ship._changePlaneIng = true;
            // //出现道具图标
            // var storeItemIcon = g_FightUILayer._storeItemChange;
            // storeItemIcon.setPosition(VVV.WIDTH_HALF, VVV.HEIGHT_HALF);
            // storeItemIcon.setScale(8);
            // storeItemIcon.runAction(cc.sequence(
            //     cc.delayTime(1),
            //     cc.callFunc(function(){
            //         storeItemIcon.setVisible(true);
            //     }),
            //     cc.scaleTo(0.2,1),
            //     hlx.shakeBy(0.3,10,5),
            //     //老飞机退场
            //     cc.callFunc(function(){
            //         g_sharedGameLayer._ship.runAction(cc.moveTo(0.5, g_sharedGameLayer._ship.x, -g_sharedGameLayer._ship.height));
            //     }),
            //     cc.delayTime(0.5),
            //     cc.callFunc(function(){
            //         var planeArray = [];
            //         for(var p in PlaneConfig){
            //             if(!g_player.getPlane(PlaneConfig[p].id)){
            //                 planeArray.push(PlaneConfig[p]);
            //             }
            //         }
            //         if(planeArray.length==0) return;
            //         var randomIndex = CommonUtil.randomInteger(0,planeArray.length-1);
            //         g_sharedGameLayer._ship.changePlane(planeArray[randomIndex]);
            //     }),
            //     cc.delayTime(1),
            //     VVV.getHideSelfCallFun(storeItemIcon),
            //     cc.callFunc(function(){
            //         g_sharedGameLayer._ship._changePlaneIng = false;
            //     })
            // ));
        },
        trigger: "start",
        description: "开局可选择随机使用未拥有新战机一次",
        showStore: false,
        price: 1000
    }
};
VVV.getStoreItemConfig = function (itemID) {
    for (var p in StoreItemConfig) {
        if (StoreItemConfig[p].id == itemID) {
            return StoreItemConfig[p];
        }
    }
    return null;
};
