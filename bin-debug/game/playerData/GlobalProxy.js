var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局的持久化数据对象
 */
var GlobalProxy = (function () {
    function GlobalProxy() {
    }
    return GlobalProxy;
}());
__reflect(GlobalProxy.prototype, "GlobalProxy");
