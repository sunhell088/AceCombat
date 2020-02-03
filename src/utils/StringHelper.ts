


class StringHelper{
	/**
	 *中文unicode区间 
	 */		
	public static CHINESE_UNICODE:Array<any>=[0x4e00,0x9fa5];
	/**
	 *英文unicode区间 (含數字和符號)
	 */		
	public static ENGLISH_UNICODE:Array<any>=[0x0021,0x007e];
	/**
	 *泰文unicode区间 
	 */		
	public static THAILAND_UNICODE:Array<any>=[0x0e00,0x0e7f];
	/**
	 *越南文unicode区间 
	 */		
	public static VIETNAM_UNICODE:Array<any>=[0xab00,0xab5f];
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
	public static substitute(str:string, ... parameters):string{
		if (str == null) return '';

		// Replace all of the parameters in the msg string.
		var len:number = parameters.length;
		var args:Array<any>;
		if (len == 1 && parameters[0] instanceof Array){
			args = parameters[0];
			len = args.length;
		}
		else{
			args = parameters;
		}

		var keyValueMap:any = {};
		var i:number=0;
		for(i=0;i<len;i++){
			keyValueMap['$'+(i+1)] = args[i];
		}

		var reg:RegExp = /\$[0-9]+/;
		var obj:any;
		while(obj = reg.exec(str)){
			if(keyValueMap[obj[0]] == null || keyValueMap[obj[0]] == undefined)
				keyValueMap[obj[0]] = '';

			str = str.replace(obj[0],keyValueMap[obj[0]]);
		}

		return str;
	}
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
	public static checkCharUnicode(charUnicode:number,unicodeArea:any[]):boolean {
		var minVale:number = unicodeArea[0];
		var maxVale:number = unicodeArea[1];
		if(minVale <= charUnicode && maxVale >= charUnicode){
			return true;
		}
		return false;
	}

	///**
	// * 是否是中文
	// * @param char
	// * @return
	// *
	// */
	//public static isChinese(char:string):boolean {
	//	if (char == null) {
	//		return false;
	//	}
	//	var pattern:RegExp=/[\this.u4e00-\this.u9fa5]+/gi;
	//	if (char.match(pattern).length > 0) {
	//		return true;
	//	} else {
	//		return false;
	//	}
	//}
}
