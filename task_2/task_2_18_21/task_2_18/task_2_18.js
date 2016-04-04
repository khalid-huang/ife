$(function(){
	$('button').click(function(event){
		var num = $('#num').val();
		if(isNaN(num) || num === "") {
			alert('Please input number only!!');
		} else {
			switch($(this).data('function')) {
				case 'leftIn':
					pushNum('left', num);
					break;
				case 'rightIn':
					pushNum('right', num);
					break;
				case 'leftOut':
					popNum('left');
					break;
				case 'rightOut':
					popNum('right');
					break;
			}
		}
	})

	function pushNum(direction, num) {
		var numDom = $('<span class="num">' + num + "</span>") 
		if(direction === 'left') {
			$('#numList').prepend(numDom);
		} else {
			$('#numList').append(numDom);
		}
	}

	function popNum(direction) {
		if(direction === 'left') {
			$('#numList').children().first().remove();
		} else {
			$('#numList').children().last().remove();
		}
	}
});