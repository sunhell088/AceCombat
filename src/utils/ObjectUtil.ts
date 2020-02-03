class ObjectUtil {
    constructor() {
    }
    /**
     * 得到一个对象属性数量
     * */
    static getLength(obj:any):number
    {
        if(obj==null)return 0;
        var len:number=0;
        for(var key in obj)
        {
            len++;
        }
        return len;
    }
    /**
     * 浅拷贝 从一个动态对象中拷贝属性值到另一个对象中
     * 注意排除hashCode，hashCode不允许更改
     * @param fromObject
     * @param toObject
     * @param excludeProps 要排除的属性值，这些属性名不会拷贝，如["name", "id", ...] 只拷贝除了name id 以外的属性值
     * @param includeProps 要拷贝的属性值，只有这些属性名会拷贝，如["name", "id", ...] 只拷贝name id 属性值
     */
    static shallowCopy(fromObject:any, toObject:Object, excludeProps:string[] = null, includeProps:string[] = null):any {
        var k:any;
        if (excludeProps) {
            for (k in fromObject) {
                if (excludeProps.indexOf(k) != -1||k=="hashCode"||k=="$hashCode") continue;
                toObject[k] = fromObject[k];
            }
        } else if (includeProps) {
            for (var i in includeProps) {
                if (i=="hashCode"||i=="$hashCode") continue;
                k = includeProps[i];
                toObject[k] = fromObject[k];
            }
        } else {
            for (k in fromObject) {
                if (k=="hashCode"||k=="$hashCode") continue;
                toObject[k] = fromObject[k];
            }
        }
        return toObject;
    }

    static deepCopy(fromObject:any, toObject:any):any {
        for (var key in fromObject) {
            if (fromObject[key] != null && typeof fromObject[key] == "object" && toObject[key] != null) {
                arguments.callee(fromObject[key], toObject[key]);
            } else {
                if (key=="hashCode"||key=="$hashCode") continue;
                toObject[key] = fromObject[key];
            }
        }
        return toObject;
    }
}