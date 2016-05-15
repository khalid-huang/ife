((window) !->

	floatLayer = (id) !->
		@ele = document.getElementById id
		@visible = false
		@init!

	floatLayer.prototype = 
		show: !->
			@visible = true
			@ele.className = @ele.className.replace(" hide", "");			


		hide: !->
			@visible = false
			@ele.className += " hide"

		init: !->
			@ele.className += " hide"
			@setDragAble(@ele.children[0])

		setDragAble: (ele)!->
			ele.style.cursor = 'move'
			ele.addEventListener 'mousedown' (event)!->
				/*to get the old cursor position and the old ele position dis*/
				console.log 'a'
				disX = event.clientX - ele.offsetLeft
				disY = event.clientY - ele.offsetTop
				move = (event) !->
					ele.style.left = event.clientX - disX + 'px'
					ele.style.top = event.clientY - disY + 'px'

				document.addEventListener 'mousemove' move
				document.addEventListener 'mouseup' !->
					document.removeEventListener 'mousemove' move

	window.floatLayer = floatLayer
) window

$ !->
	fltobj = new floatLayer 'floatItem'
	$ '#login' .on 'click' !-> fltobj.show!
	$ '#sure' .on 'click' !-> fltobj.hide!
	$ '#cancle' .on 'click' !-> fltobj.hide!