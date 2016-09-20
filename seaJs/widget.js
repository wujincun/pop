/**
 * Created by admin on 2015/12/6.
 */
define(function(require,exports,module){
  function Widget(){
    this.boundingBox = null;
  }
  Widget.prototype = {
    on:function(type,handler){
      if(typeof this.handlers[type] == 'undefined'){
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
      return this;
    },
    fire:function(type,data){
      if(this.handlers[type] instanceof Array){
        var handlers = this.handlers[type];
        for(var i= 0;i<this.handlers[type].length;i++){
          handlers[i](data);
        }
      }
      return this;
    },
    render:function(container){
      this.renderUI();
      this.handlers = {};
      this.bindUI();
      this.initUI();
      $(container||document.body).append(this.boundingBox);
    },
    destroy:function(){
      this.destructor();
      this.boundingBox.off();
      this.boundingBox.remove();
    },
    renderUI:function(){

    },
    bindUI:function(){

    },
    initUI:function(){

    },
    destructor:function(){

    }
  };
  module.exports = {
    Widget:Widget
  }
});