/**
 * 应用主入口，统一接口管理
 **/
class Game {
    //初始化模块
    public initGameModule():void {
        GlobalProxy.globalProxy = new GlobalProxy();
    }

    //多国语言配置
    private languageDict:any;

    //初始化游戏视图相关内容
    public initGameView(main:egret.DisplayObjectContainer):void {
        //初始化显示容器相关节点
        ViewManager.instance.init(main);
        //启动时就显示出loading界面
        ViewManager.instance.showLoading(1, 100);
    }

    //游戏开始
    public startGame():void {
        //读取多国语言化配置
        this.languageDict = RES.getRes("language_json");
        RES.destroyRes("language_json");

        ViewManager.instance.OPEN_WINDOW(LobbyMediator);
        ViewManager.instance.hideLoading();
    }

    //根据key 获取文字  如：getLanguage("{0} + {1} = {2}", 5, 7, 12)
    public static getLanguage(txtKey:string, ...parameters):string {
        if (!Game.instance.languageDict) return txtKey;
        //暂时只设计为不区分模块
        var languageName:string = "common";
        var format = Game.instance.languageDict[languageName] && Game.instance.languageDict[languageName][txtKey] ?
            Game.instance.languageDict[languageName][txtKey] :
            txtKey;
        for (var i = 0, l = parameters.length; i < l; i++) {
            format = format.replace(new RegExp("\\{" + i + "\\}", "g"), parameters[i]);
        }
        return format;
    }

    public static getLoadingLanguage(key:string):string {
        key = key + "_zh";
        return window["loadingLanguage"][key];
    }

    private static _instance:Game;
    public static get instance():Game {
        if (!Game._instance)
            Game._instance = new Game();
        return Game._instance;
    }
}