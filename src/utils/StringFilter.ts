


class StringFilter{
	
	/**
	 * 字符过滤对象
	 */		
	public static dirtyStrings:Array<any>;
	
	/**
	 * 构造函数
	 * 
	 */		
	public constructor(){
		
	}
	
	/**
	 * 过滤替换
	 * @param $str
	 * @param $replace
	 * @return 
	 * 
	 */		
	public static filterAndReplace(chechStr:string,replaceSign:string='*'):string{
		if(StringFilter.dirtyStrings==null){
			StringFilter.initFiltersLib();
		}
		var len:number = StringFilter.dirtyStrings.length; 
		var i:number =0;
		while(i<len){
			var reg:RegExp = new RegExp(StringFilter.dirtyStrings[i],"gi");
			chechStr=chechStr.replace(reg, replaceSign);
			i++;
		}
		return chechStr;
	}
	/**初始化过滤字库
	 */		
	private static initFiltersLib():void{
		if(StringFilter.dirtyStrings==null){
            var filterConfig:any = RES.getRes("filterConfig_json");
			var filterStr:string = filterConfig["filter_name"];
			if(!filterStr || (filterStr && filterStr == "")){
				StringFilter.dirtyStrings=[];
				return;
			}
			var reg:RegExp = /\n/g;
			filterStr = filterStr.replace(reg,"");
			reg=/\r/g;
			filterStr = filterStr.replace(reg,"");
			reg=/\t/g;
			filterStr = filterStr.replace(reg,"");
			StringFilter.dirtyStrings = filterStr.split(",");
			//GameDescTextMgr.instance().filterFont = "";
			var Arrlen:number = StringFilter.dirtyStrings.length;
			var k:number =0;
			while(k < Arrlen){
				StringFilter.dirtyStrings[k]=StringFilter.dirtyStrings[k].toString().toLowerCase();
				k++;
			}
			if (StringFilter.dirtyStrings.length > 0 && StringFilter.dirtyStrings[StringFilter.dirtyStrings.length-1] == ""){
				StringFilter.dirtyStrings.pop();
			}
		}
	}
	/**
	 * 是否有过滤字符 
	 * @param $str
	 * @return 
	 * 
	 */		
	public static hasFilter($str:string):boolean{
		
		if(StringFilter.dirtyStrings==null){
			StringFilter.initFiltersLib();
		}
		var len:number = StringFilter.dirtyStrings.length;
		var i:number =0;
		while(i<len){
			var value:number=$str.toLowerCase().indexOf(StringFilter.dirtyStrings[i]);
			if(value>-1){
				return true;
			}
			i++;
		}
		return false;
	}
}
