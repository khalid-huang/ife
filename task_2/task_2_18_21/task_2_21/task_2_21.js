(function(){
	//List的内容就是和html里面的container是一样的; 
var List = function(container) {
		return new List.prototype.init(container);
	};

	List.prototype = {
		constructor: List,
		init: function(container) {
			this.container = container;
			this.delete = false; //用于标识是否可以删除
			this.className = "tag";
		},

		check: function() {
			var list = this.getList();
			var removeNum = 0;
			if(list.length > 10) {
				removeNum = list.length - 10;
			}
			console.log(removeNum);
			while(removeNum--) {
				$(this.container).children().first().remove();
			}
		},

		push: function(array) {
			//保证传入的都是可以了进行push的
			var that = this;
			var fragement = document.createDocumentFragment();
			array.forEach(function(item) {
				var span = $('<span>' + item + '</span>');
				$(span).attr('class', that.className);
				if(that.delete) {
					$(span).addClass('delete');	
				}
				fragement.appendChild($(span).get(0));
			})
			$(this.container).append(fragement);
			this.check(); //检查是否已经超过10个了；
		},

		getList: function() {
			var list = [];
			$(this.container).children().each(function(index, item) {
				list.push($(item).text());
			});
			return list;
		},

		enableDelete: function() {
			this.delete = true;
		},
		setTagClass: function(className) {
			this.className = className;
		},

		clear: function() {
			$(this.container).empty();			
		}
	};

	List.prototype.init.prototype = List.prototype;
	window.List = List;
})();

function indexOf(array, itemee) {
	var index = -1;
	array.forEach(function (itemer,curIndex) {
		if(itemee === itemer) {
			index = curIndex ;
		}
	});
	return index;
}

$(function(){
	var separator = /[,、，\r\n\s]+/; //贪婪匹配
	var tagContainer = $('#tagContainer');
	var hobbyContainer = $('#hobbyContainer');
	var tagList = List(tagContainer);
	tagList.enableDelete();
	tagList.setTagClass('tag blue');

	var hobbyList = List(hobbyContainer);
	hobbyList.setTagClass('tag yellow');

	//绑定事件,在tagContainer上面绑定委托删除的事件
	//container上面要加止增加元素的事件 keyup和click事件
	$('#tagInput').on('keyup', function(event) {
		if(RegExp(separator).test($(this).val()) || event.keyCode ===13) {
			var curList = tagList.getList();
			var array = $(this).val().split(separator).filter(function(item) {
				return (item !== '') && (indexOf(curList, item) === -1);
			});
			tagList.push(array);
			$(this).val("");
		}
	});

	$('#tagContainer').on('click', function(event) {
		if($(event.target).is('span')) {
			$(event.target).remove();
		}
	})
	$('#surehobby').on('click', function(event) {
		var curList = hobbyList.getList();
		var array = $('#hobbyInput').val().split(separator).filter(function(item) {
			return (item !== '') && (indexOf(curList, item) === -1);
		});
		hobbyList.push(array);
	})

});