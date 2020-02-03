/**
 * To successfully store and retrieve (key->value) mapping from a HashMap.
 * HashMap accept any type of object to be the key: number, string, Object etc...
 * But it is only get fast accessing with string type keys. Others are slow.
 * ----------------------------------------------------------
 * This example creates a HashMap of friends. It uses the number of the friends as keys:
 * <listing>
 *     function person(name,age,sex){
	 *         this.name=name;
	 *         this.age=age;
	 *         this.sex=sex;
	 *     }
 *     var friends = new HashMap();
 *     friends.put("one", new person("iiley",21,"M"));
 *     friends.put("two", new person("gothic man",22,"M"));
 *     friends.put("three", new person("rock girl",19,"F"));
 * </listing>
 * To retrieve a friends, use the following code:
 *
 * <listing>
 *     var thisperson = friends.get("two");
 *     if (thisperson != null) {
	 *         trace("two name is "+thisperson.name);
	 *         trace("two age is "+thisperson.age);
	 *         trace("two sex is "+thisperson.sex);
	 *     }else{
	 *         trace("two is not in friends!");
	 *     }
 * </listing>
 * @author iiley
 */
class HashMap {

    private length:number;
    private content:any;

    constructor() {
        this.length = 0;
        this.content = {};
    }

    //-------------------public methods--------------------

    /**
     * Returns the number of keys in this HashMap.
     */
    public size():number {
        return this.length;
    }

    /**
     * Returns if this HashMap maps no keys to values.
     */
    public isEmpty():boolean {
        return (this.length == 0);
    }

    /**
     * Returns an Array of the keys in this HashMap.
     */
    public keys():string[] {
        var temp:string[] = new Array(this.length);
        var index:number = 0;
        for (var i in this.content) {
            temp[index] = i;
            index++;
        }
        return temp;
    }

    /**
     * Call func(key) for each key.
     * @param func the to call
     */
    public eachKey(func:Function, thisObj:any = null):void {
        for (var i in this.content) {
            func.call(thisObj, i);
        }
    }

    /**
     * Call func(value) for each value.
     * @param func the to call
     */
    public eachValue(func:Function, thisObj:any = null):void {
        for (var i in this.content) {
            func.call(thisObj, this.content[i]);
        }
    }

    /**
     * Returns an Array of the values in this HashMap.
     */
    public values():any[] {
        var temp:any[] = new Array(this.length);
        var index:number = 0;
        for (var i in this.content) {
            temp[index] = this.content[i];
            index++;
        }
        return temp;
    }

    /**
     * Tests if some key maps numbero the specified value in this HashMap.
     * This operation is more expensive than the containsKey method.
     */
    public containsValue(value:any):boolean {
        for (var i in this.content) {
            if (this.content[i] === value) {
                return true;
            }
        }
        return false;
    }

    /**
     * Tests if the specified object is a key in this HashMap.
     * This operation is very fast if it is a string.
     * @param   key   The key whose presence in this map is to be tested
     * @return <tt>true</tt> if this map contains a mapping for the specified
     */
    public containsKey(key:string):boolean {
        if (this.content[key] != undefined) {
            return true;
        }
        return false;
    }

    /**
     * Returns the value to which the specified key is mapped in this HashMap.
     * Return null if the key is not mapped to any value in this HashMap.
     * This operation is very fast if the key is a string.
     * @param   key the key whose associated value is to be returned.
     * @return  the value to which this map maps the specified key, or
     *          <tt>null</tt> if the map contains no mapping for this key
     *           or it is null value originally.
     */
    public get(key:any):any {
        var value:any = this.content[key];
        if (value !== undefined) {
            return value;
        }
        return null;
    }

    /**
     * Same functionity method with different name to <code>get</code>.
     *
     * @param   key the key whose associated value is to be returned.
     * @return  the value to which this map maps the specified key, or
     *          <tt>null</tt> if the map contains no mapping for this key
     *           or it is null value originally.
     */
    public getValue(key:any):any {
        return this.get(key);
    }

    /**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for this key, the old value is replaced.
     * If value is null, means remove the key from the map.
     * @param key key with which the specified value is to be associated.
     * @param value value to be associated with the specified key. null to remove the key.
     * @return previous value associated with specified key, or <tt>null</tt>
     *           if there was no mapping for key.  A <tt>null</tt> return can
     *           also indicate that the HashMap previously associated
     *           <tt>null</tt> with the specified key.
     */
    public put(key:any, value:any):any {
        if (key == null) {
            throw new Error("cannot put a value with undefined or null key!");
        } else if (value == null) {
            return this.remove(key);
        } else {
            var exist:Boolean = this.containsKey(key);
            if (!exist) {
                this.length++;
            }
            var oldValue:any = this.get(key);
            this.content[key] = value;
            return oldValue;
        }
    }

    /**
     * Removes the mapping for this key from this map if present.
     *
     * @param  key key whose mapping is to be removed from the map.
     * @return previous value associated with specified key, or <tt>null</tt>
     *           if there was no mapping for key.  A <tt>null</tt> return can
     *           also indicate that the map previously associated <tt>null</tt>
     *           with the specified key.
     */
    public remove(key:any):any {
        var exist:Boolean = this.containsKey(key);
        if (!exist) {
            return null;
        }
        var temp:any = this.content[key];
        delete this.content[key];
        this.length--;
        return temp;
    }

    /**
     * Clears this HashMap so that it contains no keys no values.
     */
    public clear():void {
        this.length = 0;
        this.content = {};
    }

    /**
     * Return a same copy of HashMap object
     */
    public clone():HashMap {
        var temp:HashMap = new HashMap();
        for (var i in this.content) {
            temp.put(i, this.content[i]);
        }
        return temp;
    }

    public toString():string {
        var ks:string[] = this.keys();
        var vs:any[] = this.values();
        var temp:string = "HashMap Content:\n";
        for (var i:number = 0; i < ks.length; i++) {
            temp += ks[i] + " -> " + vs[i] + "\n";
        }
        return temp;
    }
}
