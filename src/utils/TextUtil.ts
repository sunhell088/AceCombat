class TextUtil {
    constructor() {
    }

    private static parser:egret.HtmlTextParser;

    /**
     * 解析html文本
     */
    public static parse(text:string):Array<egret.ITextElement> {
        if ((typeof text) + "" != "string") text += "";
        if (!text || text.length <= 0) text += "";
        if (!this.parser) {
            this.parser = new egret.HtmlTextParser();
        }
        return this.parser.parser(text);
    }

    public static font(text:string, color:any):string {
        return "<font color=" + color + ">" + text + "</font>";
    }

    public static underline(text:string):string {
        return "<u>" + text + "</u>";
    }

    /**
     * 将传入的字符串 以指定的color拼装成聊天窗格式
     * @param content
     * @param color
     * @param b
     * @return
     */
    public static fontWithoutSizeForChat(content:string, color:string):string {
        var str:string = color + content + "#END";
        return str;
    }

    /**
     *将传入的字符串 以指定的color
     * @param content
     * @param color
     * @param size
     * @return
     */
    public static fontWithoutSize(content:string, color:string, b:Boolean = false):string {
        var str:string = "<font color='" + color + "'>" + content + "</font>";
        //if (b)
        //    str = "<b>" + str + "</b>";
        return str;
    }

    public static buildHtmlText(content:string, isA:boolean = false, eventName:string = "", isU:boolean = false, color:string = "", size:number = -1):string {
        if (size > 0) {
            var s1:string = "<font size='" + size + "'>";
            if (color != "") {
                s1 = "<font color='" + color + "' size='" + size + "'>";
            }
        } else {
            if (color != "") {
                s1 = "<font color='" + color + "' size='" + 12 + "'>";
            } else {
                s1 = "<font>";
            }
        }

        if (isA)
            content = "<a href='event:" + eventName + "'>" + content + "</a>";

        if (isU)
            content = "<u>" + content + "</u>";

        return s1 + content + "</font>";
    }
}