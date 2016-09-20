    /**
 * Created by admin on 2015/12/6.
 */
define(function(require,exports,module){
  var widget = require('widget');
  function Pop(){
    this.cfg = {
      width:'500',
      height:'500',
      titleContent:'',
      content:'',
      footerContent:'',
      text4SureBtn:'确定',
      text4CancelBtn:'取消',
      text4ShareBtn:'分享',
      handler4SureBtn:null,
      handler4CancelBtn:null,
      handler4ShareBtn:null,
      hasMask:true,
      hasCloseBtn:false,
      skinClassName:false,
      hasAnimate:null
    };
  }
  Pop.prototype = $.extend({},new widget.Widget(),{
    renderUI:function(){
      switch (this.cfg.winType){
        case 'alert':
          this.cfg.footerContent = '<div class="pop-footer"><div class="pop-sureBtn">' + this.cfg.text4SureBtn + '</div></div> ';
          break;
        case 'confirm':
          this.cfg.footerContent =
            '<div class="pop-sureBtn">' + this.cfg.text4SureBtn + '</div>' +
            '<div class="pop-cancelBtn">' + this.cfg.text4CancelBtn + '</div>';
          break;
        case 'share':
          this.cfg.footerContent =
            '<div class="pop-sureBtn">' + this.cfg.text4SureBtn + '</div>' +
            '<div class="pop-shareBtn">' + this.cfg.text4ShareBtn + '</div>';
          break;
      }
      this.boundingBox = $(
        '<div class="boundingBox">' +
          '<div class="pop-content">' + this.cfg.content + '</div>'+
        '</div>'
      );
      if(this.cfg.winType != 'onlyContent'){
        this.boundingBox.prepend($('<div class="pop-title">' + this.cfg.titleContent + '</div>'));
        this.boundingBox.append($('<div class="pop-footer">' +  this.cfg.footerContent + '</div>'))
      }
      //遮罩
      if(this.cfg.hasMask){
        this.mask = $('<div class="pop-mask"></div>');
        this.mask.appendTo($('body'));
      }
      if(this.cfg.closeBtn){
        var closeBtn = $('<div class="pop-closeBtn">X</div>');
        closeBtn.appendTo(this.boundingBox)
      }
    },
    bindUI:function(){
      var that = this;
      this.boundingBox.on('click','.pop-sureBtn',function(){
        that.fire('sure');
        that.destroy();
      });
      this.boundingBox.on('click','.pop-closeBtn',function(){
        that.fire('close');
        that.destroy();
      });
      this.boundingBox.on('click','.pop-cancelBtn',function(){
        that.fire('cancel');
        that.destroy();
      });
      this.boundingBox.on('click','.pop-shareBtn',function(){
        that.fire('share');
        that.destroy();
      });
      if(this.cfg.text4SureBtn){
        this.cfg.handler4SureBtn && this.cfg.handler4SureBtn();
        //this.on('sure',this.cfg.handler4SureBtn)
      }
      if(this.cfg.text4CancelBtn){
        this.cfg.handler4CancelBtn && this.cfg.handler4CancelBtn();
        //this.on('cancel',this.cfg.handler4CancelBtn )
      }
      if(this.cfg.text4ShareBtn){
        this.cfg.handler4ShareBtn && this.cfg.handler4ShareBtn();
        //this.on('share',this.cfg.handler4ShareBtn)
      }
      if(this.cfg.hasAnimate){
        this.boundingBox.addClass(this.cfg.hasAnimate.animateName);
        if(this.cfg.hasAnimate.animateDie){
          setTimeout(function(){
            that.destroy.apply(that);
          },this.cfg.hasAnimate.animateTime);
        }
      }
    },
    initUI:function(){
      this.boundingBox.css({
        width:this.cfg.width + 'px',
        height:this.cfg.height + 'px',
        left:(this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
        top:(this.cfg.y || (window.innerHeight - this.cfg.width)/2) + 'px'
      });
      if(this.cfg.skinClassName){
        this.boundingBox.addClass(this.cfg.skinClassName);
      }
    },
    destructor:function(){
      this.mask && this.mask.remove();
    },
    alert:function(cfg){
      $.extend(this.cfg,cfg,{winType:'alert'});
      this.render();
      return this;
    },
    confirm:function(cfg){
      $.extend(this.cfg,cfg,{winType:'confirm'});
      this.render();
      return this;
    },
    onlyContent:function(cfg){
      $.extend(this.cfg,cfg,{winType:'onlyContent'});
      this.render();
      return this;
    },
    common:function(cfg){
      $.extend(this.cfg,cfg,{winType:'common'});
      this.render();
      return this;
    },
    share:function(cfg){
      $.extend(this.cfg,cfg,{winType:'share'});
      this.render();
      return this;
    }

  });
  module.exports = {
    Pop:Pop
  }
});
