var router = require('koa-router')();
var AipSpeechClient = require("baidu-api2").speech;
var fs = require("fs");
// 设置APPID/AK/SK
var APP_ID = "10527091";
var API_KEY = "Y1WWf4PlD2LhgPAHf1WgYhLk";
var SECRET_KEY = "f24981d76276e467bd9ca1853ee35671";
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


router.get('/', function* (next) {
	yield this.render('index', {
		title: 'Hello World Koa!'
	});
});

router.get('/foo', function* (next) {
	yield this.render('index', {
		title: 'Hello World foo!'
	});
});

router.post('/baidu', function* (next) {
	var self = this;
	var txt = this.request.body.txt;
	// 语音合成, 附带合成参数
	yield client.text2audio(txt, { spd: 0, per: 4 }).then(function (result) {
		console.log('<text2audio>: ' + JSON.stringify(result));
		// 把data数据写入到文件
		fs.writeFile('public/baidu.mp3', result.data);
	});
	this.body = {
		"state":1
	}
});

module.exports = router;
