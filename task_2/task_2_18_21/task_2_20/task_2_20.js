$(function(){
	var separator = /[,、，\r\n\s]+/; //贪婪匹配
	$('button.action').click(function(event){
		var content = $('#content').val().split(separator);  //获得内容val(), text(), html(); 获得属性attr
		if(!content) {
			alert('Please input something');
		} else {
			switch($(this).data('function')) {
				case 'leftIn':
					pushCon('left', content);
					break;
				case 'rightIn':
					pushCon('right', content);
					break;
				case 'leftOut':
					popCon('left');
					break;
				case 'rightOut':
					popCon('right');
					break;
			}
		}
	});
	$('#search').bind('input propertychange', function(event) {
		var search = $(this).val();
		$('.num').each(function(index, item) {
			if(search === '') {
				$(item).fadeIn('slow');
			}
			if($(item).text().indexOf(search) === -1) {
				$(item).fadeOut('slow');
			} else {
				$(item).fadeIn('slow');
			}
		})
	})

	function pushCon(direction, content) {
		var size = content.length;
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < size; i++) {
			var dom = $('<span class="num">' + content[i] + '</span>');
			fragment.appendChild(dom.get(0));
		}

		if(direction === 'left') {
			$('#numList').prepend(fragment);
		} else {
			$('#numList').append(fragment);
		}
	}

	function popCon(direction) {
		if(direction === 'left') {
			$('#numList').children().first().remove();
		} else {
			$('#numList').children().last().remove();
		}
	}
});