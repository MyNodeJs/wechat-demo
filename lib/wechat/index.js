var weChat = require("wechat");
var config = require("./../../config");
var os = require("./../os/");
var handler = weChat(config.wechat, weChat.text(function (info, req, res, next) {
    var content = info.Content;
    if (/约/.test(content)) {
        res.reply({
            content: '约你妹呀！',
            type: 'text'
        });
    } else if (/图/.test(content)) {
        res.reply([
            {
                title: '菇凉我的靓照!',
                description: '女神嫁到',
                picurl: 'http://picview01.baomihua.com/photos/20120119/m_14_634626046352187500_36036466.jpg',
                url: 'http://weibo.com/fengjieluoyufeng?c=spr_qdhz_bd_baidusmt_weibo_s&nick=%E7%BD%97%E7%8E%89%E5%87%A4'
            }
        ]);
    } else if (/乐/.test(content)) {
        res.reply({
            type: 'music',
            content: {
                title: '来段音乐吧',
                description: '好听的轻音乐',
                musicUrl: 'http://114.215.159.50:7000/%E7%BA%AF%E9%9F%B3%E4%B9%90%20-%20%E6%82%A0%E4%B9%85%E3%81%AE%E6%99%82.mp3',
                hqMusicUrl: 'http://114.215.159.50:7000/%E7%BA%AF%E9%9F%B3%E4%B9%90%20-%20%E6%82%A0%E4%B9%85%E3%81%AE%E6%99%82.mp3',
                thumbMediaId: 'thisThumbMediaId'
            }
        });
    } else if (/系统/.test(content)) {
        var attr = os.getOsInfo();
        var content = 'type:' + attr.type + '\r\n' + 'platform:' + attr.platform + '\r\n' + 'arch:' + attr.arch + '\r\n'
          + 'release:' + attr.release + '\r\n' + 'hostname:' + attr.hostname;

        res.reply({
            content: content,
            type: 'text'
        });

    } else if (/内存/.test(content)) {
        var attr = os.getMemInfo();
        var content = '总内存:' + attr.total + '\r\n' + '剩余内存:' + attr.free + '\r\n' + '使用率:' + attr.usePercent + '%';
        res.reply({
            content: content,
            type: 'text'
        });
    } else {
        res.reply({
            content: '收到,收到, 但我不知道',
            type: 'text'
        });
    }
}).image(function (image, req, res, next) {
    console.log("image\n", image);
    res.send('');
}).voice(function (voice, req, res, next) {
    console.log("voice\n", voice);
    res.send('');
}).video(function (video, req, res, next) {
    console.log("video\n", video);
    res.send('');
}).location(function (location, req, res, next) {
    console.log("location\n", location);
    res.send('');
}).link(function (link, req, res, next) {
    console.log("link\n", link);
    res.send('');
}).event(function (event, req, res, next) {
    console.log("event\n", event);
    res.send('');
}));
module.exports = handler;