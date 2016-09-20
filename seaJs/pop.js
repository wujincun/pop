/**
 * Created by admin on 2015/12/6.
 */
define(function (require, exports, module) {
    var widget = require('widget');

    function Pop() {
        this.cfg = {
            width: '500',
            height: '500',
            titleContent: '',
            content: '',
            footerContent:null,
            footerButtons: [
                {
                    btnText: '确定',
                    callBack: function () {
                    }
                }, {
                    btnText: '取消',
                    callBack: function () {
                    }
                }
            ],
            text4SureBtn: '确定',
            text4CancelBtn: '取消',
            handler4SureBtn: null,
            handler4CancelBtn: null,
            hasMask: true,
            hasCloseBtn: false,
            skinClassName: false,
            hasAnimate: {
                animateName: null,
                animateDuration: null
            }
        };
    }

    Pop.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function () {
            switch (this.cfg.winType) {
                //一个确定按钮
                case 'alert':
                    this.cfg.footerContent = '<div class="pop-footer"><div class="pop-sureBtn">' + this.cfg.text4SureBtn + '</div></div> ';
                    break;
                // 两个按钮：确定，取消
                case 'confirm':
                    this.cfg.footerContent =
                        '<div class="pop-sureBtn">' + this.cfg.text4SureBtn + '</div>' +
                        '<div class="pop-cancelBtn">' + this.cfg.text4CancelBtn + '</div>';
                    break;
                // 自定义按钮
                case 'dialog':
                    var str = '';
                    var buttons = this.cfg.footerButtons;
                    for (var i = 0; i < buttons.length; i++) {
                        str += '<div onClick=' + buttons[i].callBack + '>' + buttons[i].btnText + '</div>'
                    }
                    this.cfg.footerContent = str;
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
            if (this.cfg.closeBtn) {
                var closeBtn = $('<div class="pop-closeBtn">X</div>');
                closeBtn.appendTo(this.boundingBox)
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
            this.cfg.handler4SureBtn && this.cfg.handler4SureBtn();
            this.cfg.handler4CancelBtn && this.cfg.handler4CancelBtn();
            this.cfg.handler4ShareBtn && this.cfg.handler4ShareBtn();
            if (this.cfg.hasAnimate) {
                this.boundingBox.addClass(this.cfg.hasAnimate.animateName);
                if (this.cfg.hasAnimate.animateDuration) {
                    setTimeout(function () {
                        that.destroy.apply(that);
                    }, this.cfg.hasAnimate.animateDuration);
                }
            }
        },
        initUI: function () {
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.width) / 2) + 'px'
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
    });
    module.exports = {
        Pop: Pop
    }
});
