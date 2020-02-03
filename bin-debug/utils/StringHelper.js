var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringHelper = (function () {
    function StringHelper() {
    }
    /**
     * 格式化字符串，将相应的代替字符替换到目标字符串里，例如：
     *
     * var str:String = '欢迎 $1 来到三国的世界，你先到 $2 那里报个到吧！';
     * trace(StrUtils.substitute(str,'指甲钳','村长'));
     * //输出结果：'欢迎 指甲钳 来到三国的世界，你先到 村长 那里报个到吧！'
     *
     * @param str
     * @param rest
     * @return
     */
    StringHelper.substitute = function (str) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        if (str == null)
            return '';
        // Replace all of the parameters in the msg string.
        var len = parameters.length;
        var args;
        if (len == 1 && parameters[0] instanceof Array) {
            args = parameters[0];
            len = args.length;
        }
        else {
            args = parameters;
        }
        var keyValueMap = {};
        var i = 0;
        for (i = 0; i < len; i++) {
            keyValueMap['$' + (i + 1)] = args[i];
        }
        var reg = /\$[0-9]+/;
        var obj;
        while (obj = reg.exec(str)) {
            if (keyValueMap[obj[0]] == null || keyValueMap[obj[0]] == undefined)
                keyValueMap[obj[0]] = '';
            str = str.replace(obj[0], keyValueMap[obj[0]]);
        }
        return str;
    };
    //
    ///**
    // * 获得文本框输入的字符总长度，中文占2个长度，字母占1个长度
    // * @param textboxTextStr 输入的字符串
    // * @return  长度
    // *
    // */
    //public static getTextLength(textStr:string):number {
    //	var nLength:number = 0;
    //	var tempChars:number=0
    //	for (var i:number = 0; i < textStr.length; i++) {
    //		if(StringHelper.checkCharUnicode(textStr.charCodeAt(i),StringHelper.CHINESE_UNICODE)) {
    //			nLength += 2;
    //			tempChars++;
    //		}
    //		else {
    //			nLength++;
    //			tempChars++;
    //		}
    //	}
    //	return nLength;
    //}
    /**
    * 是否在语言区间内
    * @param charUnicode 字符的unicode码
    * @param unicodeArea 核查语言区间
    * @return Boolean
    *
    */
    StringHelper.checkCharUnicode = function (charUnicode, unicodeArea) {
        var minVale = unicodeArea[0];
        var maxVale = unicodeArea[1];
        if (minVale <= charUnicode && maxVale >= charUnicode) {
            return true;
        }
        return false;
    };
    /**
     *中文unicode区间
     */
    StringHelper.CHINESE_UNICODE = [0x4e00, 0x9fa5];
    /**
     *英文unicode区间 (含數字和符號)
     */
    StringHelper.ENGLISH_UNICODE = [0x0021, 0x007e];
    /**
     *泰文unicode区间
     */
    StringHelper.THAILAND_UNICODE = [0x0e00, 0x0e7f];
    /**
     *越南文unicode区间
     */
    StringHelper.VIETNAM_UNICODE = [0xab00, 0xab5f];
    return StringHelper;
}());
__reflect(StringHelper.prototype, "StringHelper");
