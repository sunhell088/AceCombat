/**
 * Created by kurt on 2015/3/13.
 */

var EffectConfig = {
    efx_bomb2:{
        name:"efx_bomb2",
        frames:["efx_bomb20.png", "efx_bomb21.png", "efx_bomb22.png", "efx_bomb23.png"],
        delayTime:0.1
    },
    bomb_efx1:{
        name:"bomb_efx1",
        frames:["bomb_efx10.png", "bomb_efx11.png", "bomb_efx12.png", "bomb_efx13.png"],
        delayTime:0.1
    },
    cc_start_efx:{
        name:"cc_start_efx",
        frames:["cc_start_efx0.png", "cc_start_efx1.png", "cc_start_efx2.png", "cc_start_efx3.png", "cc_start_efx4.png", "cc_start_efx5.png"],
        delayTime:0.1
    }
};

//获得动画
VVV.getAnimateAction = function(effectConfig){
    // var frames = [];
    // for(var i=0; i<effectConfig.frames.length; i++)
    // {
    //     frames.push(cc.spriteFrameCache.getSpriteFrame(effectConfig.frames[i]));
    // }
    // var animation = new cc.Animation(frames, effectConfig.delayTime);
    // var animate = new cc.Animate(animation);
    // var animateAction = animate;
    // if(effectConfig.repeat){
    //     animateAction = animate.repeatForever();
    // }
    // return animateAction;
};

//获得动画播放总时间
VVV.getAnimateDuration = function(effectConfig){
    return effectConfig.frames.length*effectConfig.delayTime;
};