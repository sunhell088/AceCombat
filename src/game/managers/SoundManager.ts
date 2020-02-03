/**
 * 声音管理类
 */
class SoundManager {
    private static musicVolume:number = 0.25;
    private static _instance:SoundManager;
    //缓存标识字段
    private localStorageMusicID:string = "musicSwitch" + CommonConst.GAME_ID;
    private localStorageEffectID:string = "effectSwitch" + CommonConst.GAME_ID;
    //音乐
    private musicSound:egret.Sound;
    //音乐的声道
    private musicChannel:egret.SoundChannel;
    //音乐开关
    private musicSwitch:boolean = true;
    //音效开关
    private effectSwitch:boolean = true;
    //背景音乐ID（用于直接开关时播放之前的音乐）
    private musicResName:string;
    //播放中的音效的SoundChannel缓存（用于停止指定类型音效）
    private effectChannelMap:any = {};
    //同时播放通一个音效（实际是很短的时间内播放音效），那么只播放一次
    private ignoreSameSound:{} = {};
    //当前背景音乐的所在时间
    private musicPosition:number = 0;

    constructor() {
        //如果没有音乐开关的缓存记录，那么默认为开启音乐
        var status:string = egret.localStorage.getItem(this.localStorageMusicID);
        if (status == null) {
            this.musicSwitch = true;
        } else {
            this.musicSwitch = (status == "1") ? true : false;
        }

        status = egret.localStorage.getItem(this.localStorageEffectID);
        if (status == null) {
            this.effectSwitch = true;
        } else {
            this.effectSwitch = (status == "1") ? true : false;
        }
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listenMutually, this);
    }

    public static get instance():SoundManager {
        if (!SoundManager._instance)
            SoundManager._instance = new SoundManager();
        return SoundManager._instance;
    }

    //获得音乐开关的状态
    public getMusicSwitch():boolean {
        return this.musicSwitch;
    }

    public setMusicSwitch(value:boolean):void {
        this.musicSwitch = value;
        egret.localStorage.setItem(this.localStorageMusicID, value ? "1" : "0");
        if (value) {
            this.playMusic(this.musicResName);
        } else {
            this.stopMusic();
        }
    }

    //获得音效开关的状态
    public getEffectSwitch():boolean {
        return this.effectSwitch;
    }

    public setEffectSwitch(value:boolean):void {
        this.effectSwitch = value;
        egret.localStorage.setItem(this.localStorageEffectID, value ? "1" : "0");
    }

    //监听点击事件，用于浏览器在用户交互后才能播放声音的问题
    private listenMutually():void {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listenMutually, this);
        if (this.musicChannel && this.musicChannel.position == 0) {
            this.resumeMusic();
        }
    }

    //播放背景音乐
    public playMusic(musicName:string = null):void {
        if (musicName == null) {
            if (this.musicResName) {
                musicName = this.musicResName;
            } else {
                // egret.warn("music name and reocord name is null");
                //musicName = SoundConst.MUSIC_WAGER;
            }
        }
        if (this.musicResName != musicName) {
            this.musicSound = null;
        }
        this.musicResName = musicName;
        if (!this.musicSwitch) return;
        if (this.musicChannel) {
            this.musicChannel.stop();
        }
        if (!this.musicSound) {
            this.musicSound = RES.getRes(musicName);
            //避免在加载前，被onActive调用导致为空
            if (!this.musicSound) return;
            this.musicSound.type = egret.Sound.MUSIC;
        }
        this.musicChannel = this.musicSound.play(0, -1);
        // this.musicChannel.volume = SoundManager.musicVolume;
    }

    //播放音效
    public playEffect(soundName:string):void {
        if (!this.effectSwitch) return;
        if (!ViewManager.instance.isWinActivate) return;
        if (!soundName || soundName.length == 0) return;
        var lastTime:number = this.ignoreSameSound[soundName];
        var nowTime:number = (new Date()).getTime();
        if (lastTime && nowTime - lastTime < 50) {
            return;
        }
        this.ignoreSameSound[soundName] = nowTime;
        var sound:egret.Sound = RES.getRes(soundName);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            //用于停止指定类型音效
            var channel:egret.SoundChannel = sound.play(0, 1);
            // CommonUtil.log("playEffect    " + soundName);
            var keyName = soundName;
            if (this.effectChannelMap[soundName]) {
                keyName += channel.hashCode;
            }
            this.effectChannelMap[keyName] = channel;
            channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                delete this.effectChannelMap[keyName];
            }, this);
            // temp code
            // channel.volume = (soundName == "Win_3_mp3") ? 0.1 : 1;
        } else {
            egret.warn("sound not load! soundName=" + soundName);
        }
    }

    //停止音效
    public stopEffect(soundName:string):void {
        if (!soundName || soundName.length == 0) return;
        for (var key in this.effectChannelMap) {
            if (key.indexOf(soundName) >= 0) {
                this.effectChannelMap[key].stop();
            }
            delete this.effectChannelMap[key];
        }
    }

    //停止音乐
    public stopMusic():void {
        if (this.musicChannel) {
            this.musicPosition = this.musicChannel.position;
            this.musicChannel.stop();
        }
    }

    //恢复音乐（用于浏览器失去焦点又回来时）
    public resumeMusic():void {
        if (!this.musicSwitch) return;
        if (!this.musicChannel || !this.musicSound) return;
        //这里用于刷新当前播放位置，用于在没有stopMusic的情况下，调用了resumeMusic，导致从头开始播放
        if (this.musicPosition == 0) {
            this.musicPosition = this.musicChannel.position;
        }
        this.musicChannel.stop();
        this.musicChannel = this.musicSound.play(this.musicPosition);
        // this.musicChannel.volume = SoundManager.musicVolume;
    }
}
