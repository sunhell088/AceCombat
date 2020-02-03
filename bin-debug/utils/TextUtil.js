var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextUtil = (function () {
    function TextUtil() {
    }
    /**
     * 解析html文本
     */
    TextUtil.parse = function (text) {
        if ((typeof text) + "" != "string")
            text += "";
        if (!text || text.length <= 0)
            text += "";
        if (!this.parser) {
            this.parser = new egret.HtmlTextParser();
        }
        return this.parser.parser(text);
    };
    TextUtil.font = function (text, color) {
        return "<font color=" + color + ">" + text + "</font>";
    };
    TextUtil.underline = function (text) {
        return "<u>" + text + "</u>";
    };
    /**
     * 将传入的字符串 以指定的color拼装成聊天窗格式
     * @param content
     * @param color
     * @param b
     * @return
     */
    TextUtil.fontWithoutSizeForChat = function (content, color) {
        var str = color + content + "#END";
        return str;
    };
    /**
     *将传入的字符串 以指定的color
     * @param content
     * @param color
     * @param size
     * @return
     */
    TextUtil.fontWithoutSize = function (content, color, b) {
        if (b === void 0) { b = false; }
        var str = "<font color='" + color + "'>" + content + "</font>";
        //if (b)
        //    str = "<b>" + str + "</b>";
        return str;
    };
    TextUtil.buildHtmlText = function (content, isA, eventName, isU, color, size) {
        if (isA === void 0) { isA = false; }
        if (eventName === void 0) { eventName = ""; }
        if (isU === void 0) { isU = false; }
        if (color === void 0) { color = ""; }
        if (size === void 0) { size = -1; }
        if (size > 0) {
            var s1 = "<font size='" + size + "'>";
            if (color != "") {
                s1 = "<font color='" + color + "' size='" + size + "'>";
            }
        }
        else {
            if (color != "") {
                s1 = "<font color='" + color + "' size='" + 12 + "'>";
            }
            else {
                s1 = "<font>";
            }
        }
        if (isA)
            content = "<a href='event:" + eventName + "'>" + content + "</a>";
        if (isU)
            content = "<u>" + content + "</u>";
        return s1 + content + "</font>";
    };
    return TextUtil;
}());
__reflect(TextUtil.prototype, "TextUtil");
