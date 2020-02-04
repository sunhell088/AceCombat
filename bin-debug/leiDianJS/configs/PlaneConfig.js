/**
 * Created by kurt on 2015/3/27.
 */
var PlaneConfig = {
    plane0: {
        id: 1,
        name: "虚空之眼",
        textureName: "#ui_role_head0.png",
        fightTextureName: "#role0.png",
        levelUpTextureName: "#levelup1.png",
        bigPngName: "res/ui/role_big0.png",
        bulletType: "1",
        bombType: "#1_35.png",
        planeFunction: function (shipSprite) { },
        description: "虚空孕育出的维克兹，它是一种为了学习目的而创造的可怕生物。维克兹能不断吸收知识，并透过大量的测试和扫描累积各种理解。",
        price: 0
    },
    plane1: {
        id: 2,
        name: "黑暗元首",
        textureName: "#ui_role_head1.png",
        fightTextureName: "#role1.png",
        levelUpTextureName: "#levelup2.png",
        bigPngName: "res/ui/role_big1.png",
        bulletType: "bullet3",
        bombType: "#bullet3_35.png",
        //磁铁（且双倍金币-金币变大）
        planeFunction: function (shipSprite) {
            shipSprite.setMagnet(true);
        },
        description: "暗黑元首生来就具有无边的魔法潜能，除了爱好以自己的意志来运用这难以置信的能量外，就再无所好。",
        price: 5000
    },
    plane2: {
        id: 4,
        name: "战争之王",
        textureName: "#ui_role_head2.png",
        fightTextureName: "#role2.png",
        levelUpTextureName: "#levelup3.png",
        bigPngName: "res/ui/role_big2.png",
        bulletType: "bullet5",
        bombType: "#bullet5_35.png",
        //自带双倍火力
        planeFunction: function (shipSprite) {
            shipSprite._doubleFire = true;
        },
        description: "“就没有更能打的人了么？”潘森，站在德玛西亚营地的废墟中说道。",
        price: 10000
    }
};
VVV.getPlaneConfig = function (planeID) {
    for (var p in PlaneConfig) {
        if (PlaneConfig[p].id == planeID) {
            return PlaneConfig[p];
        }
    }
    return null;
};
