var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.getRandom = function (min, max) {
        return min + Math.random() * (max - min);
    };
    ArrayUtil.shuffleArray = function (arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
            var j = Math.random() * i >> 0;
            if (j != i) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    };
    ArrayUtil.sortOn = function (arr, prop, isReverse) {
        if (isReverse === void 0) { isReverse = false; }
        if (!isReverse)
            arr.sort(function (a, b) { return a[prop] - b[prop]; });
        else
            arr.sort(function (a, b) { return b[prop] - a[prop]; });
    };
    ArrayUtil.sortOnDescending = function (arr, prop) {
        arr.sort(function (a, b) { return b[prop] - a[prop]; });
    };
    ArrayUtil.sortOnPositive = function (arr, prop) {
        arr.sort(function (a, b) {
            if (+b[prop] < 0) {
                return -1;
            }
            else if (+a[prop] < 0) {
                return 1;
            }
            return a[prop] - b[prop];
        });
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
