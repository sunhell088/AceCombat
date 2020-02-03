var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    /**
     * 得到一个对象属性数量
     * */
    ObjectUtil.getLength = function (obj) {
        if (obj == null)
            return 0;
        var len = 0;
        for (var key in obj) {
            len++;
        }
        return len;
    };
    /**
     * 浅拷贝 从一个动态对象中拷贝属性值到另一个对象中
     * 注意排除hashCode，hashCode不允许更改
     * @param fromObject
     * @param toObject
     * @param excludeProps 要排除的属性值，这些属性名不会拷贝，如["name", "id", ...] 只拷贝除了name id 以外的属性值
     * @param includeProps 要拷贝的属性值，只有这些属性名会拷贝，如["name", "id", ...] 只拷贝name id 属性值
     */
    ObjectUtil.shallowCopy = function (fromObject, toObject, excludeProps, includeProps) {
        if (excludeProps === void 0) { excludeProps = null; }
        if (includeProps === void 0) { includeProps = null; }
        var k;
        if (excludeProps) {
            for (k in fromObject) {
                if (excludeProps.indexOf(k) != -1 || k == "hashCode" || k == "$hashCode")
                    continue;
                toObject[k] = fromObject[k];
            }
        }
        else if (includeProps) {
            for (var i in includeProps) {
                if (i == "hashCode" || i == "$hashCode")
                    continue;
                k = includeProps[i];
                toObject[k] = fromObject[k];
            }
        }
        else {
            for (k in fromObject) {
                if (k == "hashCode" || k == "$hashCode")
                    continue;
                toObject[k] = fromObject[k];
            }
        }
        return toObject;
    };
    ObjectUtil.deepCopy = function (fromObject, toObject) {
        for (var key in fromObject) {
            if (fromObject[key] != null && typeof fromObject[key] == "object" && toObject[key] != null) {
                arguments.callee(fromObject[key], toObject[key]);
            }
            else {
                if (key == "hashCode" || key == "$hashCode")
                    continue;
                toObject[key] = fromObject[key];
            }
        }
        return toObject;
    };
    return ObjectUtil;
}());
__reflect(ObjectUtil.prototype, "ObjectUtil");
