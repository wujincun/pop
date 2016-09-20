/**
 * Created by wujincun on 2016/9/5.
 */
;(function ($) {
    $.extend({
        dialog:function (obj) {
            function DialogObj() {
                var opt = {
                    //弹出框的高宽
                    height:null,
                    width:null,
                    //类型
                    type:null,
                    //点击遮罩可以关闭
                    maskClose:true,
                    //头部内容
                    headerContent:'',
                    //中部内容
                    Content:'',
                    //按钮组
                    buttons:[
                        {
                            btnText:'确定',
                            callBack:function () {

                            }
                        },{
                            btnText:'取消',
                            callBack:function () {

                            }
                        }
                    ],
                    //添加不同的样式
                    hasSkinClass:null,
                    //弹出框延迟多久关闭
                    delay:null

                };
                this.obj = $.extend(obj,opt)
            }
            $.extend(DialogObj.prototype,{
                _init:function () {
                    
                },
                _render:function () {
                    
                },
                _bind:function () {
                    
                }
            });
            return new DialogObj();
        }
    })
})(jQuery);
$.dialog();

