/**
 * Mediator的加载相关操作类
 **/
class Mediator {    
    private enterParameters:any;
    private bInitView:boolean = false;
    //该Mediator监听的列表（用于关闭时移除）
    private gameEventListenerMap:{} = null;

    public constructor() {
    }

    open(...parameters):void {
        this.enterParameters = parameters;
        if(!this.bInitView){
            this.initView();
        }
        this.bInitView = true;
        this.onEnter.apply(this, this.enterParameters);
        if(!this.gameEventListenerMap){
            this.gameEventListenerMap = {};
            this.addGameEventListener();
        }
    }

    close():void {
        for (var key in this.gameEventListenerMap) {
            var type = this.gameEventListenerMap[key].type;
            var listener = this.gameEventListenerMap[key].listener;
            var thisObject = this.gameEventListenerMap[key].thisObject;
            ObserverManager.instance.removeEventListener(type, listener, thisObject);
        }
        this.gameEventListenerMap = null;
        this.onExit();
    }


    protected addEventListener(type:string, listener:Function, thisObject:any):void {
        ObserverManager.instance.addEventListener(type, listener, thisObject);
        this.gameEventListenerMap[type] = new GameEventListenerData(type, listener, thisObject);
    }

    public register():void{
        if(!this.gameEventListenerMap){
            this.gameEventListenerMap = {};
            this.addGameEventListener();
        }
    }

    //--------↓↓↓↓↓↓这部分代码只是为了执行子类的同名方法，构架可以再优化和清晰点----------
    //会在第一次打开的时候执行一次，以后关闭后，再打开将不再执行
    initView():void {
    }

    onEnter(...parameters):void {
    }

    onExit():void {
    }

    addGameEventListener():void {
    }

    //--------↑↑↑↑↑↑↑↑这部分代码只是为了执行子类的同名方法，构架可以再优化和清晰点----------
}

class GameEventListenerData {
    public constructor(type:string, listener:Function, thisObject:any) {
        this.type = type;
        this.listener = listener;
        this.thisObject = thisObject;
    }

    public type:string;
    public listener:Function;
    public thisObject:any;
}

