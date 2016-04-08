$(function(){
	var total = 2;
	$('button').click(function(event){
		if($(this).data('function') === 'sort') {
			sort();
			return;
		}
		var digit = $('#digit').val();
		var amount = parseInt($('#amount').val());
		if(isNaN(digit) || digit === "") {
			alert('Please input number only!!');
		} else if(digit < 10 || digit > 100) {
			alert('Please input 10 to 100');
		} else if(amount + total > 60) {
			var remain = 60 - total;
			alert('Only ' + remain + ' number can be input');
		} else {
			switch($(this).data('function')) {
				case 'leftIn':
					pushNum('left', digit);
					break;
				case 'rightIn':
					pushNum('right', digit);
					break;
				case 'leftOut':
					popNum('left', amount);
					break;
				case 'rightOut':
					popNum('right', amount);
					break;
				case 'leftInAll':
					pushNum('left', digit, amount);
					break;
				case 'rightInAll':
					pushNum('right', digit, amount);
					break;
			}
			total += amount;
			$('#totalNum').text(total);
		}
	})

	function pushNum(direction, digit, amount) {
		var amount = amount || 1;
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < amount; i++) {
			var numDom = $('<span class="num"></span>');
			numDom.height(digit * 1.5 + 'px');			
			fragment.appendChild(numDom.get(0));
		}
		if(direction === 'left') {
			$('#numList').prepend(fragment);
		} else {
			$('#numList').append(fragment);
		}
	}

	function popNum(direction) {
		if(direction === 'left') {

			$('#numList').children().first().remove();
		} else {
			$('#numList').children().last().remove();
		}
	}

	function sort() {
		bubbling();
	}

	function bubbling() {
		var numList = $('#numList').children();
		for(var i = 0, size = numList.length; i < size; i++) {
			for(var j = 0; j < size - i - 1; j++) {
				var curHeight = $(numList[j]).height();
				var nextHeight = $(numList[j+1]).height();
				if(curHeight > nextHeight) {
					console.log(j+1);
					console.log(curHeight, nextHeight);
					var temp = curHeight;
					$(numList[j]).height(nextHeight);
					$(numList[j+1]).height(temp);
				}
			}
		}
	}
});