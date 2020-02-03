var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringFilter = (function () {
    /**
     * 构造函数
     *
     */
    function StringFilter() {
    }
    /**
     * 过滤替换
     * @param $str
     * @param $replace
     * @return
     *
     */
    StringFilter.filterAndReplace = function (chechStr, replaceSign) {
        if (replaceSign === void 0) { replaceSign = '*'; }
        if (StringFilter.dirtyStrings == null) {
            StringFilter.initFiltersLib();
        }
        var len = StringFilter.dirtyStrings.length;
        var i = 0;
        while (i < len) {
            var reg = new RegExp(StringFilter.dirtyStrings[i], "gi");
            chechStr = chechStr.replace(reg, replaceSign);
            i++;
        }
        return chechStr;
    };
    /**初始化过滤字库
     */
    StringFilter.initFiltersLib = function () {
        if (StringFilter.dirtyStrings == null) {
            var filterConfig = RES.getRes("filterConfig_json");
            var filterStr = filterConfig["filter_name"];
            if (!filterStr || (filterStr && filterStr == "")) {
                StringFilter.dirtyStrings = [];
                return;
            }
            var reg = /\n/g;
            filterStr = filterStr.replace(reg, "");
            reg = /\r/g;
            filterStr = filterStr.replace(reg, "");
            reg = /\t/g;
            filterStr = filterStr.replace(reg, "");
            StringFilter.dirtyStrings = filterStr.split(",");
            //GameDescTextMgr.instance().filterFont = "";
            var Arrlen = StringFilter.dirtyStrings.length;
            var k = 0;
            while (k < Arrlen) {
                StringFilter.dirtyStrings[k] = StringFilter.dirtyStrings[k].toString().toLowerCase();
                k++;
            }
            if (StringFilter.dirtyStrings.length > 0 && StringFilter.dirtyStrings[StringFilter.dirtyStrings.length - 1] == "") {
                StringFilter.dirtyStrings.pop();
            }
        }
    };
    /**
     * 是否有过滤字符
     * @param $str
     * @return
     *
     */
    StringFilter.hasFilter = function ($str) {
        if (StringFilter.dirtyStrings == null) {
            StringFilter.initFiltersLib();
        }
        var len = StringFilter.dirtyStrings.length;
        var i = 0;
        while (i < len) {
            var value = $str.toLowerCase().indexOf(StringFilter.dirtyStrings[i]);
            if (value > -1) {
                return true;
            }
            i++;
        }
        return false;
    };
    return StringFilter;
}());
__reflect(StringFilter.prototype, "StringFilter");
