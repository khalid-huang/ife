(function(){
	//List的内容就是和html里面的container是一样的; 
	var List = function() {
		return new List.prototype.init(container);
	};

	List.prototype = {
		constructor: List,
		init: function(container) {
			this.container = container;
			this.delete = false; //用于标识是否可以删除
		},

		push: function(array) {
			//保证传入的都是可以了进行push的
			var that = this;
			var fragement = document.createDocumentFragment();
			var className = $(this.container).attr() === 'tagContainer' ? 'tag blue' : 'tag yellow';
			array.forEach(function(item) {
				var span = $('<span>' + item + '</span>');
				span.attr('class', className);
				if(that.delete) {
					span.addClass('delete');	
				}
				fragement.appendChild(span.get(0));
			})
			$(this.container).append(fragement);
		},

		enableDelete: function() {
			this.delete = true;
		},

		clear: function() {
			$(this.container).empty();			
		}
	};

	List.prototype.init.prototype = List.prototype;
	window.List = List;
})();

$(function(){
	var separator = /[,、，\r\n\s]+/; //贪婪匹配
	var tagContainer = $('#tagContainer');
	var habbyContainer = $('#habbyContainer');
	var tagList = List(tagContainer);
	tagList.enableDelete();
	var habbyList = List(habbyContainer);

	//绑定事件,在tagContainer上面绑定委托删除的事件
	//container上面要加止增加元素的事件 keyup和click事件
	
});