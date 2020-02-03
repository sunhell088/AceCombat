class ArrayUtil
{
    constructor() {
    }

    public static getRandom(min, max):number
    {
        return min + Math.random() * (max - min);
    }
    public static shuffleArray(arr:Array<any>)
    {
        for (var i=0, l=arr.length; i < l; i++) {
            var j = Math.random() * i >> 0;
            if(j != i)
            {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    public static sortOn(arr:Array<any>, prop:string,isReverse:boolean=false)
    {
        if(!isReverse)
            arr.sort((a, b)=>{return a[prop] - b[prop];})
        else
            arr.sort((a, b)=>{return b[prop] - a[prop];})
    }

    public static sortOnDescending(arr:Array<any>, prop:string)
    {
        arr.sort((a, b)=>{return b[prop] - a[prop];})
    }

    public static sortOnPositive(arr:Array<any>, prop:string)
    {
        arr.sort((a, b)=>{
            if(+b[prop] < 0){
                return -1;
            }
            else if(+a[prop] < 0){
                return 1;
            }
            return a[prop] - b[prop];})
    }
}