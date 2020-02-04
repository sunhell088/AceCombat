/**
 * Created by kurt on 2015/3/18.
 */

var ItemConfig = {
    //冲刺
    item_cc:{
        name:"item_cc",
        textureName:"#item_cc.png",
        presetCount:2,
        effectTexture:"#fly_buff0.png",
        itemFunction:function(){
        //     if(g_sharedGameLayer._spurt||g_sharedGameLayer._spurtReadying) return;
        //     //吃道具效果
        //     VVV.eatItemEffect(ItemConfig.item_cc);
        //     //冲刺持续时间（分为普通冲刺、开局道具冲刺、死亡冲刺）
        //     var spurtDuration = g_sharedGameLayer._startSpurtDuration>0?g_sharedGameLayer._startSpurtDuration:VVV.SPURT_DURATION;
        //     spurtDuration = g_sharedGameLayer._deathSpurtDuration>0?g_sharedGameLayer._deathSpurtDuration:spurtDuration;
        //     //冲刺准备
        //     var spurtReadyAction = cc.callFunc(
        //         function(){
        //             //音效
        //             VVV.playEffect(res.cc_ready);
        //             g_sharedGameLayer._spurtReadying = true;
        //             //清屏
        //             g_sharedGameLayer.cleanEnemy();
        //             //蓄能动画
        //             var spurtReadySprite = g_sharedGameLayer._ship.spurtReadySprite;
        //             spurtReadySprite.setVisible(true);
        //             var animate = VVV.getAnimateAction(EffectConfig.cc_start_efx);
        //             spurtReadySprite.runAction(cc.sequence(
        //                 animate,
        //                 VVV.getHideSelfCallFun(spurtReadySprite)
        //             ));
        //         },null
        //     );
        //     //冲刺开始
        //     var spurtStartAction = cc.callFunc(
        //         function(){
        //             //开始冲刺
        //             g_sharedGameLayer._spurtReadying = false;
        //             g_sharedGameLayer.setSpurt(true);
        //             g_sharedGameLayer.unschedule(g_sharedGameLayer.scheduleNormalEnemey);
        //             g_sharedGameLayer.schedule(g_sharedGameLayer.scheduleNormalEnemey, VVV.ENEMY_SPURT_DELAY);
        //         },null
        //     );
        //     //冲刺结束
        //     var spurtOverAction = cc.callFunc(
        //         function(){
        //             //爆炸效果
        //             g_sharedGameLayer._ship.levelUpRing.setVisible(true);
        //             g_sharedGameLayer._ship.levelUpLight.setVisible(false);
        //             g_sharedGameLayer._ship.levelUpRing.setScale(0.5);
        //             g_sharedGameLayer._ship.levelUpRing.runAction(cc.sequence(cc.scaleBy(1,50),
        //                 cc.callFunc(function(){
        //                     g_sharedGameLayer._ship.levelUpRing.setVisible(false);
        //                     g_sharedGameLayer._ship.levelUpRing.setScale(1);
        //                 },null)
        //             ));
        //             //冲刺完时当前屏幕的飞机暴落物品
        //             var enemyArray = [];
        //             for(var e=0; e<VVV.CONTAINER.ENEMYS_CHECK_COLLIDE.length; e++){
        //                 var enemy = VVV.CONTAINER.ENEMYS_CHECK_COLLIDE[e];
        //                 if(!enemy.visible) continue;
        //                 enemyArray.push(enemy);
        //             }
        //             //暴落当前飞机数目的两倍
        //             var dropItemArray = VVV.getDropItemArray(enemyArray.length);
        //             for(var i=0;i<dropItemArray.length;i++){
        //                 var item = ItemSprite.getItem(dropItemArray[i]);
        //                 if(!item) continue;
        //                 item.setPosition(enemyArray[i].getPosition());
        //                 if(i<enemyArray.length){
        //                     item.x += CommonUtil.randomInteger(-100,100);
        //                     item.y += CommonUtil.randomInteger(0,100);
        //                 }
        //                 item.drop();
        //             }
        //
        //             g_sharedGameLayer.setSpurt(false);
        //             g_sharedGameLayer.cleanEnemy();
        //             g_sharedGameLayer.unschedule(g_sharedGameLayer.scheduleNormalEnemey);
        //             g_sharedGameLayer.schedule(g_sharedGameLayer.scheduleNormalEnemey, VVV.ENEMY_DELAY);
        //             //开局冲刺标识重置
        //             g_sharedGameLayer._startSpurtDuration = 0;
        //             //死亡冲刺后死掉
        //             if(g_sharedGameLayer._deathSpurtDuration>0){
        //                 g_sharedGameLayer._ship.death();
        //                 g_sharedGameLayer._ship.runAction(cc.sequence(
        //                     cc.delayTime(1),
        //                     cc.callFunc(g_sharedGameLayer.onGameOver)
        //                 ));
        //             }
        //         },
        //         null
        //     );
        //
        //     g_sharedGameLayer.runAction(cc.sequence(
        //         spurtReadyAction,
        //         cc.delayTime(0.5),
        //         spurtStartAction,
        //         cc.delayTime(spurtDuration),
        //         spurtOverAction
        //     ));
        }
    },
    //屏蔽 火力全开，解除屏蔽时记得 解除 双倍火力里的 默认双倍火力飞机吃的效果
    ////加粗
    //item_double:{
    //    name:"item_double",
    //    textureName:"#item_double.png",
    //    presetCount:2,
    //    effectTexture:"#fly_buff3.png",
    //    itemFunction:function(){
    //        //升级状态 无效
    //        if(g_sharedGameLayer._ship._invincible||g_sharedGameLayer._ship._levelUpIng) return;
    //        //这里移除action是为了每次获得效果后，重置效果时间
    //        g_sharedGameLayer.stopActionByTag("DoublePower");
    //        g_sharedGameLayer._ship._doublePower = true;
    //        var action = g_sharedGameLayer.runAction(cc.sequence(
    //            cc.delayTime(10),
    //            cc.callFunc(
    //                function(){ g_sharedGameLayer._ship._doublePower = false; }
    //            )
    //        ));
    //        action.setTag("DoublePower");
    //        //效果
    //        VVV.eatItemEffect(ItemConfig.item_double);
    //    }
    //},
    //二条
    item_doubleFire:{
        name:"item_doubleFire",
        textureName:"#item_up_skill.png",
        presetCount:2,
        effectTexture:"#fly_buff4.png",
        itemFunction:function(){
        //     //升级状态 无效
        //     if(g_sharedGameLayer._ship._invincible||g_sharedGameLayer._ship._levelUpIng) return;
        //     if(g_sharedGameLayer._ship.planeID!=PlaneConfig.plane2.id){
        //         //这里移除action是为了每次获得效果后，重置效果时间
        //         g_sharedGameLayer.stopActionByTag("DoubleFire");
        //         g_sharedGameLayer._ship._doubleFire = true;
        //         var action = g_sharedGameLayer.runAction(cc.sequence(
        //             cc.delayTime(15),
        //             cc.callFunc(
        //                 function(){ g_sharedGameLayer._ship._doubleFire = false; }
        //             )
        //         ));
        //         action.setTag("DoubleFire");
        //         //效果
        //         VVV.eatItemEffect(ItemConfig.item_doubleFire);
        //     }else{
        //         //ItemConfig.item_double.itemFunction();
        //     }
        }
    },
    //磁铁
    item_xts:{
        name:"item_xts",
        textureName:"#item_xts.png",
        presetCount:2,
        effectTexture:"#fly_buff1.png",
        itemFunction:function(){
        //     //if(true) return;
        //     if(g_sharedGameLayer._ship.planeID==PlaneConfig.plane1.id){
        //         return;
        //     }
        //     //这里移除action是为了每次获得效果后，重置效果时间
        //     g_sharedGameLayer.stopActionByTag("magnet");
        //     g_sharedGameLayer._ship.setMagnet(true);
        //     var action = g_sharedGameLayer.runAction(cc.sequence(
        //         cc.delayTime(15),
        //         cc.callFunc(
        //             function(){ g_sharedGameLayer._ship.setMagnet(false); },
        //             null
        //         )
        //     ));
        //     action.setTag("magnet");
        //     //特效
        //     VVV.eatItemEffect(ItemConfig.item_xts);
        }
    },
    //炸弹
    item_down_skill:{
        name:"item_down_skill",
        textureName:"#item_down_skill.png",
        presetCount:2,
        effectTexture:"#fly_buff5.png",
        itemFunction:function(){
            // g_player.addBomb();
            // //特效
            // VVV.eatItemEffect(ItemConfig.item_down_skill);
        }
    },
    //10金币
    item_coin:{
        name:"item_coin",
        textureName:"#item_coin.png",
        presetCount:20,
        gold:10,
        itemFunction:function(){
            // g_player.addCurrentRewardGold(this.gold);
            // VVV.eatItemEffect(ItemConfig.item_coin);
        }
    },
    //50金币
    item_red:{
        name:"item_red",
        textureName:"#item_red.png",
        presetCount:7,
        gold:50,
        itemFunction:function(){
            // g_player.addCurrentRewardGold(this.gold);
            // VVV.eatItemEffect(ItemConfig.item_red);
        }
    },
    //100金币
    item_green:{
        name:"item_green",
        textureName:"#item_green.png",
        presetCount:5,
        gold:100,
        itemFunction:function(){
            // g_player.addCurrentRewardGold(this.gold);
            // VVV.eatItemEffect(ItemConfig.item_green);
        }
    }
};

//吃道具特效
VVV.eatItemEffect = function(itemConfig){
//     var eatEffect = VVV.getEatEffectPreset();
//     if(eatEffect!=null){
//         eatEffect.setPosition(g_sharedGameLayer._ship.x, g_sharedGameLayer._ship.y - 10);
//         eatEffect.runAction(cc.sequence(
//             cc.scaleTo(0.2, 0, 1),
//             cc.callFunc(function(sender){
//                 sender.setScale(1);
//                 sender.setVisible(false);
//             })
//         ));
//     }
//     if(itemConfig.gold){
//         //音效
//         if(itemConfig == ItemConfig.item_coin){
//             VVV.playEffect(res.get_coin);
//         }else{
//             VVV.playEffect(res.get_bs);
//         }
//     }else{
//         var effectSprite = VVV.CONTAINER.ITEM_NAME_TEXTURE[itemConfig.name]
//         effectSprite.setVisible(true);
//         effectSprite.setScale(2, 0);
//         effectSprite.setPosition(g_sharedGameLayer._ship.x, g_sharedGameLayer._ship.y + effectSprite.height*1.5);
//         //超过屏幕边界修正过来
//         hlx.pClamp(effectSprite);
//         effectSprite.runAction(cc.sequence(
//             cc.scaleTo(0.1, 1.2),
//             cc.scaleTo(0.2, 1),
//             cc.delayTime(0.4),
//             cc.scaleTo(0.2, 2, 0),
//             cc.callFunc(function(sender){ sender.setVisible(false);})
//         ));
//         //音效
//         VVV.playEffect(res.get_item);
//     }
};