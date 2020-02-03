var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 应用主入口，统一接口管理
 **/
var Game = (function () {
    function Game() {
    }
    //初始化模块
    Game.prototype.initGameModule = function () {
        GlobalProxy.globalProxy = new GlobalProxy();
    };
    //初始化游戏视图相关内容
    Game.prototype.initGameView = function (main) {
        //初始化显示容器相关节点
        ViewManager.instance.init(main);
        //启动时就显示出loading界面
        ViewManager.instance.showLoading(1, 100);
    };
    //游戏开始
    Game.prototype.startGame = function () {
        //读取多国语言化配置
        this.languageDict = RES.getRes("language_json");
        RES.destroyRes("language_json");
        ViewManager.instance.OPEN_WINDOW(LobbyMediator);
        ViewManager.instance.hideLoading();
    };
    //根据key 获取文字  如：getLanguage("{0} + {1} = {2}", 5, 7, 12)
    Game.getLanguage = function (txtKey) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        if (!Game.instance.languageDict)
            return txtKey;
        //暂时只设计为不区分模块
        var languageName = "common";
        var format = Game.instance.languageDict[languageName] && Game.instance.languageDict[languageName][txtKey] ?
            Game.instance.languageDict[languageName][txtKey] :
            txtKey;
        for (var i = 0, l = parameters.length; i < l; i++) {
            format = format.replace(new RegExp("\\{" + i + "\\}", "g"), parameters[i]);
        }
        return format;
    };
    Game.getLoadingLanguage = function (key) {
        key = key + "_zh";
        return window["loadingLanguage"][key];
    };
    Object.defineProperty(Game, "instance", {
        get: function () {
            if (!Game._instance)
                Game._instance = new Game();
            return Game._instance;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
__reflect(Game.prototype, "Game");
