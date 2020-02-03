var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 声音管理类
 */
var SoundManager = (function () {
    function SoundManager() {
        //缓存标识字段
        this.localStorageMusicID = "musicSwitch" + CommonConst.GAME_ID;
        this.localStorageEffectID = "effectSwitch" + CommonConst.GAME_ID;
        //音乐开关
        this.musicSwitch = true;
        //音效开关
        this.effectSwitch = true;
        //播放中的音效的SoundChannel缓存（用于停止指定类型音效）
        this.effectChannelMap = {};
        //同时播放通一个音效（实际是很短的时间内播放音效），那么只播放一次
        this.ignoreSameSound = {};
        //当前背景音乐的所在时间
        this.musicPosition = 0;
        //如果没有音乐开关的缓存记录，那么默认为开启音乐
        var status = egret.localStorage.getItem(this.localStorageMusicID);
        if (status == null) {
            this.musicSwitch = true;
        }
        else {
            this.musicSwitch = (status == "1") ? true : false;
        }
        status = egret.localStorage.getItem(this.localStorageEffectID);
        if (status == null) {
            this.effectSwitch = true;
        }
        else {
            this.effectSwitch = (status == "1") ? true : false;
        }
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listenMutually, this);
    }
    Object.defineProperty(SoundManager, "instance", {
        get: function () {
            if (!SoundManager._instance)
                SoundManager._instance = new SoundManager();
            return SoundManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    //获得音乐开关的状态
    SoundManager.prototype.getMusicSwitch = function () {
        return this.musicSwitch;
    };
    SoundManager.prototype.setMusicSwitch = function (value) {
        this.musicSwitch = value;
        egret.localStorage.setItem(this.localStorageMusicID, value ? "1" : "0");
        if (value) {
            this.playMusic(this.musicResName);
        }
        else {
            this.stopMusic();
        }
    };
    //获得音效开关的状态
    SoundManager.prototype.getEffectSwitch = function () {
        return this.effectSwitch;
    };
    SoundManager.prototype.setEffectSwitch = function (value) {
        this.effectSwitch = value;
        egret.localStorage.setItem(this.localStorageEffectID, value ? "1" : "0");
    };
    //监听点击事件，用于浏览器在用户交互后才能播放声音的问题
    SoundManager.prototype.listenMutually = function () {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listenMutually, this);
        if (this.musicChannel && this.musicChannel.position == 0) {
            this.resumeMusic();
        }
    };
    //播放背景音乐
    SoundManager.prototype.playMusic = function (musicName) {
        if (musicName === void 0) { musicName = null; }
        if (musicName == null) {
            if (this.musicResName) {
                musicName = this.musicResName;
            }
            else {
                // egret.warn("music name and reocord name is null");
                //musicName = SoundConst.MUSIC_WAGER;
            }
        }
        if (this.musicResName != musicName) {
            this.musicSound = null;
        }
        this.musicResName = musicName;
        if (!this.musicSwitch)
            return;
        if (this.musicChannel) {
            this.musicChannel.stop();
        }
        if (!this.musicSound) {
            this.musicSound = RES.getRes(musicName);
            //避免在加载前，被onActive调用导致为空
            if (!this.musicSound)
                return;
            this.musicSound.type = egret.Sound.MUSIC;
        }
        this.musicChannel = this.musicSound.play(0, -1);
        // this.musicChannel.volume = SoundManager.musicVolume;
    };
    //播放音效
    SoundManager.prototype.playEffect = function (soundName) {
        if (!this.effectSwitch)
            return;
        if (!ViewManager.instance.isWinActivate)
            return;
        if (!soundName || soundName.length == 0)
            return;
        var lastTime = this.ignoreSameSound[soundName];
        var nowTime = (new Date()).getTime();
        if (lastTime && nowTime - lastTime < 50) {
            return;
        }
        this.ignoreSameSound[soundName] = nowTime;
        var sound = RES.getRes(soundName);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            //用于停止指定类型音效
            var channel = sound.play(0, 1);
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
        }
        else {
            egret.warn("sound not load! soundName=" + soundName);
        }
    };
    //停止音效
    SoundManager.prototype.stopEffect = function (soundName) {
        if (!soundName || soundName.length == 0)
            return;
        for (var key in this.effectChannelMap) {
            if (key.indexOf(soundName) >= 0) {
                this.effectChannelMap[key].stop();
            }
            delete this.effectChannelMap[key];
        }
    };
    //停止音乐
    SoundManager.prototype.stopMusic = function () {
        if (this.musicChannel) {
            this.musicPosition = this.musicChannel.position;
            this.musicChannel.stop();
        }
    };
    //恢复音乐（用于浏览器失去焦点又回来时）
    SoundManager.prototype.resumeMusic = function () {
        if (!this.musicSwitch)
            return;
        if (!this.musicChannel || !this.musicSound)
            return;
        //这里用于刷新当前播放位置，用于在没有stopMusic的情况下，调用了resumeMusic，导致从头开始播放
        if (this.musicPosition == 0) {
            this.musicPosition = this.musicChannel.position;
        }
        this.musicChannel.stop();
        this.musicChannel = this.musicSound.play(this.musicPosition);
        // this.musicChannel.volume = SoundManager.musicVolume;
    };
    SoundManager.musicVolume = 0.25;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
