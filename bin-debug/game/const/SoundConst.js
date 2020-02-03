var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundConst = (function () {
    function SoundConst() {
    }
    //------------背景音乐
    SoundConst.MUSIC_BG = "bg_mp3";
    //------------通用音效
    SoundConst.ALERT = "alert_mp3"; //提示框弹出时
    //------------功能明确的短音效
    SoundConst.BUTTON_CLICK = "button_mp3";
    SoundConst.CHIP = "chip_mp3";
    SoundConst.DING = "ding_wav"; //结束下注
    SoundConst.CHEERING = "cheering_wav";
    SoundConst.LOOSE = "loose_mp3";
    SoundConst.SENDCARD = "sendCard_mp3";
    SoundConst.VS = "VS_wav";
    SoundConst.WIN = "win_mp3";
    SoundConst.CARDTYPE3_0 = "hulu0_mp3";
    SoundConst.CARDTYPE5_0 = "shunzi0_mp3";
    SoundConst.CARDTYPE4_0 = "tonghua0_mp3";
    SoundConst.CARDTYPE1_0 = "tonghuashun0_mp3";
    SoundConst.CARDTYPE3_1 = "hulu1_mp3";
    SoundConst.CARDTYPE5_1 = "shunzi1_mp3";
    SoundConst.CARDTYPE4_1 = "tonghua1_mp3";
    SoundConst.CARDTYPE1_1 = "tonghuashun1_mp3";
    return SoundConst;
}());
__reflect(SoundConst.prototype, "SoundConst");
