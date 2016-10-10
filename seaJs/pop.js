/**
 * Created by admin on 2015/12/6.
 */
define(function (require, exports, module) {
    var widget = require('widget');

    function Pop() {
        this.cfg = {
            width: '250',
            height: '250',
            titleContent: '',
            content: '',
            footerContent:'',
            footerButtons: [
                {
                    btnText: '确定',
                    callback: function () {
                    }
                }, {
                    btnText: '取消',
                    callback: function () {
                    }
                }
            ],
            text4SureBtn: '确定',
            text4CancelBtn: '取消',
            handler4SureBtn: null,
            handler4CancelBtn: null,
            hasMask: true,
            maskClick: true,
            hasCloseBtn: true,
            handler4CloseBtn: null,
            skinClassName: false,
            hasAnimate: {
                animateName: null,
                animateDuration: null
            }
        };
    }

    Pop.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function () {
            var that = this;
            switch (that.cfg.winType) {
                //一个确定按钮
                case 'alert':
                    that.cfg.footerContent = '<div class="pop-footer"><div class="pop-sureBtn">' + that.cfg.text4SureBtn + '</div></div> ';
                    break;
                // 两个按钮：确定，取消
                case 'confirm':
                    that.cfg.footerContent =
                        '<div class="pop-sureBtn">' + that.cfg.text4SureBtn + '</div>' +
                        '<div class="pop-cancelBtn">' + that.cfg.text4CancelBtn + '</div>';
                    break;
                // 自定义按钮
                case 'dialog':
                    var buttons = that.cfg.footerButtons;
                    var str = '';
                    $(buttons).each(function (key,value) {
                        var text = value.btnText?value.btnText:'按钮'+(++i);
                        str +=  '<div class="button '+ text + '">'+ text +'</div>';
                    });
                    that.cfg.footerContent = str;
                    break;
            }
            this.boundingBox = $(
                '<div class="boundingBox">' +
                '<div class="pop-content">' + this.cfg.content + '</div>' +
                '</div>'
            );
            //没有头尾，只有主题内容
            if (this.cfg.winType != 'onlyContent') {
                this.boundingBox.prepend($('<div class="pop-title">' + this.cfg.titleContent + '</div>'));
                this.boundingBox.append($('<div class="pop-footer">' + this.cfg.footerContent + '</div>'))
            }
            //遮罩
            if (this.cfg.hasMask) {
                this.mask = $('<div class="pop-mask"></div>');
                this.mask.appendTo($('body'));
            }
            if (this.cfg.hasCloseBtn) {
                var closeBtn = $('<div class="pop-closeBtn">X</div>');
                closeBtn.appendTo(this.boundingBox)
            }
            if (this.cfg.hasAnimate) {
                this.cfg.hasAnimate.animateName && this.boundingBox.addClass(this.cfg.hasAnimate.animateName);
                if (this.cfg.hasAnimate.animateDuration) {
                    setTimeout(function () {
                        that.destroy.apply(that);
                    }, this.cfg.hasAnimate.animateDuration);
                }
            }
        },
        bindUI: function () {
            var that = this;
            this.boundingBox.on('click', '.pop-sureBtn', function () {
                that.fire('sure');
                that.destroy();
            }).on('click', '.pop-closeBtn', function () {
                that.fire('close');
                that.destroy();
            }).on('click', '.pop-cancelBtn', function () {
                that.fire('cancel');
                that.destroy();
            });
            if(this.cfg.handler4SureBtn){
                this.on('sure',this.cfg.handler4SureBtn);//观察者模式写法,
            }
            if(this.cfg.handler4CancelBtn){
                this.on('cancel',this.cfg.handler4CancelBtn)
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn)
            }
            if(this.cfg.maskClick){
                this.mask.on('click',function () {
                    that.destroy();
                })
            }
            if(this.cfg.winType == 'dialog' && this.cfg.footerButtons.length >= 0){
                var footerButtonsArr = this.cfg.footerButtons;
                that.boundingBox.on('click', '.pop-footer .button' ,function () {
                    var claName = $(this).attr('class').replace(/button\s/g,'');
                    $(footerButtonsArr).each(function (key,value) {
                        var arrName = value.btnText;
                        if(claName == arrName){
                            value.callback();
                            that.destroy();
                            return false
                        }
                    });
                });
                //还没有考虑不传参数btnText：‘按钮1’、‘按钮2’的情况
            }
        },
        initUI: function () {
            var winWidth = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;
            var winHeight = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight;
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (winWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (winHeight - this.cfg.height) / 2) + 'px'
            });
            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
        },
        destructor: function () {
            this.mask && this.mask.remove();
        },
        //没有头尾，只有主题内容
        onlyContent: function (cfg) {
            $.extend(this.cfg, cfg, {winType: 'onlyContent'});
            this.render();
            return this;
        },
        //一个确定按钮
        alert: function (cfg) {
            $.extend(this.cfg, cfg, {winType: 'alert'});
            this.render();
            return this;
        },
        // 两个按钮：确定，取消
        confirm: function (cfg) {
            $.extend(this.cfg, cfg, {winType: 'confirm'});
            this.render();
            return this;
        },
        // 自定义按钮,可任意数量
        dialog: function (cfg) {
            $.extend(this.cfg, cfg, {winType: 'dialog'});
            this.render();
            return this;
        },
        //有头尾内容，但是底部内容不是按钮
        common: function (cfg) {
            $.extend(this.cfg, cfg, {winType: "common"});
            this.render();
            return this;
        }
        //自定义按钮处理
        /*createButtons:function (buttons) {
            var that = this;
            var str = '';
            $(buttons).each(function (key,value) {
                var text = value.btnText?value.btnText:'按钮'+(++i);
                var callback = value.callback?value.callback:null;
                var button =  '<div>'+ text +'</div>';
                if(callback){
                    $(value).on('click',function () {
                        callback();
                        that.destroy()
                    })
                }else{
                    that.destroy()
                }
                str += button
            });
            this.cfg.footerContent = str;
        }*/
    });
    module.exports = {
        Pop: Pop
    }
});
