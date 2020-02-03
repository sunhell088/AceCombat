class ResUtil
{

    //重写并覆盖引擎提供的RES.getResByUrl方法，在里面增加判断：如果url不带 “?”，那么return 空，并报错
    public static rewriteGetResByUrl():void {
        ResUtil.egretGetResByUrlFn = RES.getResByUrl;
        RES.getResByUrl = ResUtil.newGetResByUrl;
    }

    //DEBUG下皮肤加载是异步的，所以不用判断版本号
    public static newGetResByUrl(url:string, compFunc:Function, thisObject:any, type:string = ""):void {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && RELEASE) {
            if (url.indexOf("?") == -1) {
                console.error("RES.getResByUrl param is invalid, url =" + url);
                return;
            }
        }
        ResUtil.egretGetResByUrlFn(url, compFunc, thisObject, type);
    }
    
    static URL_ROOT_FOLDER:string = "resource/assets/icon/";
    static URL_ROOT_FOLDER_END:string = "/";

    //三个特殊路径的url资源
    static LOADINGSHEET:string = ResUtil.URL_ROOT_FOLDER + "loading.json";
    static DEFAULT_RES:string = "resource/";
    static ICON:string = ResUtil.URL_ROOT_FOLDER;
    //其余的都是放在icon目录下的文件夹
    static LOGINUI:string=ResUtil.URL_ROOT_FOLDER+"login"+ResUtil.URL_ROOT_FOLDER_END;

    //重写引擎GetResByUrl前的函数本身
    public static egretGetResByUrlFn:any = null;
    //根据资源的版本生成一个避免CDN缓存的url地址（可以用于任何类型的资源，不局限于Image）
    static getImageURL(fileName:string, filePath:string):string
    {
        if(!fileName || fileName.length==0){
            fileName = "";
        }
        var url:string= filePath + fileName;

        //获取url中的文件夹名字，用于版本号
        var startIndex:number = ResUtil.URL_ROOT_FOLDER.length;
        var endIndex:number = filePath.indexOf(ResUtil.URL_ROOT_FOLDER_END, startIndex);
        var folderName:string = filePath.substring(startIndex, endIndex);
        var version:string = "";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            if (filePath == ResUtil.LOADINGSHEET) {
                version = window["loading_json"];
            } else if (filePath == ResUtil.DEFAULT_RES) {
                version = window["default_res"];
            } else if (filePath == ResUtil.ICON) {
                version = window["item"];
            } else {
                version = window[folderName];
            }
            if (!version) {
                console.error("get Res by url fail, version is invalid:" + filePath)
                return null;
            }
            if(url.indexOf("?")==-1)
                url += "?v=" + version;
            return url;
        }else
        {
            return url;
        }
    }
    //已经加载过的资源组
    private static loadedGroupNames:string[] = [];
    //过滤已经加载过的资源组，返回过滤后的（既未加载过的）
    public static filterLoadedGroup(groupName:any):any {
        var newGroupName:any = null;
        var loaded:string[]=ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            if(loaded.indexOf(groupName)<0){
                newGroupName = groupName;
            }
        } else if (groupName.length > 0) {
            newGroupName = [];
            for(var key in groupName){
                if(loaded.indexOf(groupName[key])<0){
                    newGroupName.push(groupName[key]);
                }
            }
            if(newGroupName.length==0){
                newGroupName = null;
            }
        }
        return newGroupName;
    }
    //回收预加载资源
    public static destroyRes(groupName:any):void {
        var index:number;
        var loaded:string[]=ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            index=loaded.indexOf(groupName);
            if(index>-1){
                loaded.splice(index,1);
            }
        } else if (groupName.length > 0) {
            for(var i:number=groupName.length-1;i>=0;i--){
                index=loaded.indexOf(groupName[i]);
                if(index>-1){
                    loaded.splice(index,1);
                }
            }
        }
    }
    //解析UI EXML
    public static analyzeEXML(groupName:any):void
    {
        var exmlList:string[]=[];
        var resItem:Array<RES.ResourceItem>
        var intN:number;
        var j:number;
        var tempItem:string;
        if (typeof groupName == "string") {
            resItem=RES.getGroupByName(groupName);
            intN=resItem.length;
            for (j=0;j<intN;j++)
            {
                tempItem=resItem[j].name;
                if(tempItem.indexOf("_exml")>-1)
                {
                    exmlList.push(tempItem);
                }
            }
        } else if (groupName.length > 0) {
            var intL:number=groupName.length;
            var item:string;
            for(var i:number=0;i<intL;i++)
            {
                item=groupName[i];
                if(item.indexOf("_exml")>-1)
                {
                    exmlList.push(item);
                }else
                {
                    resItem=RES.getGroupByName(item);
                    intN=resItem.length;
                    for (j=0;j<intN;j++)
                    {
                        tempItem=resItem[j].name;
                        if(tempItem.indexOf("_exml")>-1)
                        {
                            exmlList.push(tempItem);
                        }
                    }
                }
            }
        }
        intN=exmlList.length;
        var exmlStr:string;
        for (j=0;j<intN;j++)
        {
            exmlStr=RES.getRes(exmlList[j]);
            /**可能是加载过后删除的*/
            if(exmlStr)
                EXML.parse(exmlStr);
            RES.destroyRes(exmlList[j]);
        }
    }
    //增加已加载资源组
    public static addLoadedGroupName(groupName:any):void{
        var loaded:string[]=ResUtil.loadedGroupNames;
        if (typeof groupName == "string") {
            if(loaded.indexOf(groupName)<0){
                loaded.push(groupName);
            }
        } else if (groupName.length > 0) {
            for(var key in groupName){
                if(loaded.indexOf(groupName[key])<0){
                    loaded.push(groupName[key]);
                }
            }
        }
    }
}