(function(window){
  var floatLayer;
  floatLayer = function(id){
    this.ele = document.getElementById(id);
    this.visible = false;
    this.init();
  };
  floatLayer.prototype = {
    show: function(){
      this.visible = true;
      this.ele.className = this.ele.className.replace(" hide", "");
    },
    hide: function(){
      this.visible = false;
      this.ele.className += " hide";
    },
    init: function(){
      this.ele.className += " hide";
      this.setDragAble(this.ele.children[0]);
    },
    setDragAble: function(ele){
      ele.style.cursor = 'move';
      ele.addEventListener('mousedown', function(event){
        /*to get the old cursor position and the old ele position dis*/
        var disX, disY, move;
        console.log('a');
        disX = event.clientX - ele.offsetLeft;
        disY = event.clientY - ele.offsetTop;
        move = function(event){
          ele.style.left = event.clientX - disX + 'px';
          ele.style.top = event.clientY - disY + 'px';
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function(){
          document.removeEventListener('mousemove', move);
        });
      });
    }
  };
  window.floatLayer = floatLayer;
})(window);
$(function(){
  var fltobj;
  fltobj = new floatLayer('floatItem');
  $('#login').on('click', function(){
    fltobj.show();
  });
  $('#sure').on('click', function(){
    fltobj.hide();
  });
  $('#cancle').on('click', function(){
    fltobj.hide();
  });
});