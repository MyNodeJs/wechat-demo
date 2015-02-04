var wechat = require("wechat");
var express = require("express");
var logger = require("morgan");
var config = require("./config");
var errorhandler = require("errorhandler");


var path = require("path");

var app = express();

//config
app.set('port', process.env.PORT || 3000);

app.use(logger('combined'));

app.use('/wechat', wechat(config.wechat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.FromUserName === 'text') {
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        res.reply({
            type: 'music',
            content: {
                title: '来段音乐吧',
                description: '一无所有',
                musicUrl: 'http://114.215.159.50:7000/%E7%BA%AF%E9%9F%B3%E4%B9%90%20-%20%E6%82%A0%E4%B9%85%E3%81%AE%E6%99%82.mp3',
                hqMusicUrl: 'http://114.215.159.50:7000/%E7%BA%AF%E9%9F%B3%E4%B9%90%20-%20%E6%82%A0%E4%B9%85%E3%81%AE%E6%99%82.mp3',
                thumbMediaId: 'thisThumbMediaId'
            }
        });
    } else {
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高复帅的对话',
                picurl: 'https://avatars1.githubusercontent.com/u/6081537?v=3&u=3fddd9be8bf877151191a69f841d80fc3466b2a2&s=140',
                url: 'https//www.github.com'
            }
        ]);
    }
}));

app.use(errorhandler());
app.listen(app.get('port'), function () {
    console.log('Server listening on:', app.get('port'));
});


