var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResUtil = (function () {
    function ResUtil() {
    }
    //重写并覆盖引擎提供的RES.getResByUrl方法，在里面增加判断：如果url不带 “?”，那么return 空，并报错
    ResUtil.rewriteGetResByUrl = function () {
        ResUtil.egretGetResByUrlFn = RES.getResByUrl;
        RES.getResByUrl = ResUtil.newGetResByUrl;
    };
    //DEBUG下皮肤加载是异步的，所以不用判断版本号
    ResUtil.newGetResByUrl = function (url, compFunc, thisObject, type) {
        if (type === void 0) { type = ""; }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && false) {
            if (url.indexOf("?") == -1) {
                console.error("RES.getResByUrl param is invalid, url =" + url);
                return;
            }
        }
        ResUtil.egretGetResByUrlFn(url, compFunc, thisObject, type);
    };
    //根据资源的版本生成一个避免CDN缓存的url地址（可以用于任何类型的资源，不局限于Image）
    ResUtil.getImageURL = function (fileName, filePath) {
        if (!fileName || fileName.length == 0) {
            fileName = "";
        }
        var url = filePath + fileName;
        //获取url中的文件夹名字，用于版本号
        var startIndex = ResUtil.URL_ROOT_FOLDER.length;
        var endIndex = filePath.indexOf(ResUtil.URL_ROOT_FOLDER_END, startIndex);
        var folderName = filePath.substring(startIndex, endIndex);
        var version = "";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            if (filePath == ResUtil.LOADINGSHEET) {
                version = window["loading_json"];
            }
            else if (filePath == ResUtil.DEFAULT_RES) {
                version = window["default_res"];
            }
            else if (filePath == ResUtil.ICON) {
                version = window["item"];
            }
            else {
                version = window[folderName];
            }
            if (!version) {
                console.error("get Res by url fail, version is invalid:" + filePath);
                return null;
            }
            if (url.indexOf("?") == -1)
                url += "?v=" + version;
            return url;
        }
        else {
            return url;
        }
    };
    //过滤已经加载过的资源组，返回过滤后的（既未加载过的）
    ResUtil.filterLoadedGroup = function (groupName) {
        var newGroupName = null;
        var loaded = ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            if (loaded.indexOf(groupName) < 0) {
                newGroupName = groupName;
            }
        }
        else if (groupName.length > 0) {
            newGroupName = [];
            for (var key in groupName) {
                if (loaded.indexOf(groupName[key]) < 0) {
                    newGroupName.push(groupName[key]);
                }
            }
            if (newGroupName.length == 0) {
                newGroupName = null;
            }
        }
        return newGroupName;
    };
    //回收预加载资源
    ResUtil.destroyRes = function (groupName) {
        var index;
        var loaded = ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            index = loaded.indexOf(groupName);
            if (index > -1) {
                loaded.splice(index, 1);
            }
        }
        else if (groupName.length > 0) {
            for (var i = groupName.length - 1; i >= 0; i--) {
                index = loaded.indexOf(groupName[i]);
                if (index > -1) {
                    loaded.splice(index, 1);
                }
            }
        }
    };
    //解析UI EXML
    ResUtil.analyzeEXML = function (groupName) {
        var exmlList = [];
        var resItem;
        var intN;
        var j;
        var tempItem;
        if (typeof groupName == "string") {
            resItem = RES.getGroupByName(groupName);
            intN = resItem.length;
            for (j = 0; j < intN; j++) {
                tempItem = resItem[j].name;
                if (tempItem.indexOf("_exml") > -1) {
                    exmlList.push(tempItem);
                }
            }
        }
        else if (groupName.length > 0) {
            var intL = groupName.length;
            var item;
            for (var i = 0; i < intL; i++) {
                item = groupName[i];
                if (item.indexOf("_exml") > -1) {
                    exmlList.push(item);
                }
                else {
                    resItem = RES.getGroupByName(item);
                    intN = resItem.length;
                    for (j = 0; j < intN; j++) {
                        tempItem = resItem[j].name;
                        if (tempItem.indexOf("_exml") > -1) {
                            exmlList.push(tempItem);
                        }
                    }
                }
            }
        }
        intN = exmlList.length;
        var exmlStr;
        for (j = 0; j < intN; j++) {
            exmlStr = RES.getRes(exmlList[j]);
            /**可能是加载过后删除的*/
            if (exmlStr)
                EXML.parse(exmlStr);
            RES.destroyRes(exmlList[j]);
        }
    };
    //增加已加载资源组
    ResUtil.addLoadedGroupName = function (groupName) {
        var loaded = ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            if (loaded.indexOf(groupName) < 0) {
                loaded.push(groupName);
            }
        }
        else if (groupName.length > 0) {
            for (var key in groupName) {
                if (loaded.indexOf(groupName[key]) < 0) {
                    loaded.push(groupName[key]);
                }
            }
        }
    };
    ResUtil.URL_ROOT_FOLDER = "resource/assets/icon/";
    ResUtil.URL_ROOT_FOLDER_END = "/";
    //三个特殊路径的url资源
    ResUtil.LOADINGSHEET = ResUtil.URL_ROOT_FOLDER + "loading.json";
    ResUtil.DEFAULT_RES = "resource/";
    ResUtil.ICON = ResUtil.URL_ROOT_FOLDER;
    //其余的都是放在icon目录下的文件夹
    ResUtil.LOGINUI = ResUtil.URL_ROOT_FOLDER + "login" + ResUtil.URL_ROOT_FOLDER_END;
    //重写引擎GetResByUrl前的函数本身
    ResUtil.egretGetResByUrlFn = null;
    //已经加载过的资源组
    ResUtil.loadedGroupNames = [];
    return ResUtil;
}());
__reflect(ResUtil.prototype, "ResUtil");
