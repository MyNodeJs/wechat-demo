var wechat = require("wechat");
var express = require("express");
var logger = require("morgan");
var config = require("./config");
var errorhandler = require("errorhandler");
var bodyParser = require("body-parser");


var path = require("path");

var app = express();

//config
app.set('port', process.env.PORT || 3000);

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log("config.wechat\n", config.wechat);
app.use('/', wechat(config.wechat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log("message\n", message);
    var content = message.Content;
    if (content === '约吗') {
        res.reply({
            content: '约你妹呀！',
            type: 'text'
        });
    }
    if (content === '求图片') {
        res.reply([
            {
                title: '菇凉我的靓照!',
                description: '女神嫁到',
                picurl: 'http://picview01.baomihua.com/photos/20120119/m_14_634626046352187500_36036466.jpg',
                url: 'http://weibo.com/fengjieluoyufeng?c=spr_qdhz_bd_baidusmt_weibo_s&nick=%E7%BD%97%E7%8E%89%E5%87%A4'
            }
        ]);
    }
    if (content === '音乐') {
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
    }
}));
app.get('/', function (req, res) {
    console.log('wechat connect come');
    console.log("req.query\n", req.query);
    res.send(req.query.echostr);
});
app.post('/', function (req, res) {
    console.log("req.body\n", req.body);
    res.send('');
});
app.use(errorhandler());
app.listen(app.get('port'), function () {
    console.log('Server listening on:', app.get('port'));
});


