/**
 * Created by kurt on 2015/3/27.
 */
var CommonConfig = {
    levelExp: [0, 60, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]
};
//获得指定等级升到下一级需要的经验（如：1级升2级所需要的经验，参数为1）
VVV.getExpByLevel = function (level) {
    if (level < 0 || level >= CommonConfig.levelExp.length)
        return -1;
    return CommonConfig.levelExp[level];
};
