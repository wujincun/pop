/**
 * Created by admin on 2015/12/6.
 */
seajs.config({
  alias:{
    pop:'pop',
    widget:'widget'
  }
});
seajs.use('./seaJs/main');
//路径解析
//1、
/*http:example.com/test/js/sea/sea.js
http:example.com/test/index.html
在index.html中调用了sea.js
base的默认值为 "http://example.com/test/js/sea/"
如果使用seajs.config()设置了base
seajs.config({
  base: "home"  // base值为 "http://example.com/test/js/sea/home"
});
seajs.confg({
  base: "./home"  // base值为 "http://example.com/test/home"
});
seajs.conifg({
  base: "/home"   // base值为 "http://example.com/home"
});*/
//2、
/*http://example.com/test/js/sea/sea.js
http://example.com/test/js/home/main.js
http://example.com/test/js/home/tpl.js
http://example.com/test/index.html
1、index.html页面调用sea.js
seajs.config({
  base: "./js"        // base为 "http://example.com/test/js"
  alias: {
    "jquery": "jquery/jquery"
  }
});
// 调用 mian
seajs.use("home/main");     // 解析后的路径为 "http://example.com/test/js/home/main.js"
// 也可以这么写
seajs.use("./js/home/main");    // 解析路径为 "http://example.com/test/js/home/main.js"

2、main.js
define(function(require) {
  var $ = require("jquery");      // "http://example.com/test/js/jquery/jquery.js"
  // 调用 tpl
  var tpl = require("./tpl");     // "http://example.com/test/js/home/tpl.js"   //?????
  // 也可以
  var tpl = require("home/tpl");  // "http://example.com/test/js/home/tpl.js"
});*/
