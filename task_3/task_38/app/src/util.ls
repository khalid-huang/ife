((window) ->
	util = {}

	# 辅助函数
	tool = 
		#根据新传入的值来修定原有的参数值
		_mixin: (rcv, gv) !->
			for method of gv
				rcv[method] = gv[method]

	# for sortabled table
	( ->
		sortable = (id) !->
			@ele = id
			@th = [] # [,,,]
			@td = [] # [{}, {}, {}]
			@columns =  0 #记录每行的列数
			@rows = 0 #记录table的行数
			@options = 
				frozen: false

		sortable.prototype = 
			init: (options) ->
				# 加入排序按钮之类的,同时获取get-table-tr, get-table-td
				tool._mixin(@options, options)

				@get-table-info!
				@enable-table-style!
				@enable-table-action!
				@enable-table-property!

			get-table-info: ->
				@get-table-rows!
				@get-table-columns!
				@get-table-th!
				@get-table-td!

			#入强排序外观
			enable-table-style: !->
				$ @ele .find 'th' .each ->
					ascend =  $ '<span class="ascending-sort"></span>'
					descend = $ '<span class="descending-sort"></span>'
					$ this .append ascend .append descend

			#加入排序事件
			enable-table-action: !->
				$ @ele .find 'th' .find '.ascending-sort' .on 'click', (event) ~>
					item = $ event.target .parent! .text!
					@render item, 'ascending-sort'

				$ @ele .find 'th' .find '.descending-sort' .on 'click', (event) ~>
					item = $ event.target .parent! .text!
					@render item, 'descending-sort' 

			enable-table-property: !->
				table = @ele
				$ window .on 'scroll', (event) ->
					scrollTop = $ 'body' .scrollTop!
					offsetTop = $ table .offset! .top
					gridHeight = $ table .children! .find('tr') .height!
					console.log(gridHeight)
					height = $ table .height!
					if scrollTop > offsetTop
						diff = scrollTop - offsetTop
						$ table .children! .find 'tr' .eq 0  .css 'position', 'absolute'
						$ table .children! .find 'tr' .eq 0  .css 'top' , diff + 'px'
					if scrollTop > height + offsetTop 
						$ table .children! .children 'tr' .eq 0 .css 'transform', 'translateY(0px)'

			get-table-rows: ->
				@rows = $ @ele .find 'tr' .length - 1 #减去行头

			get-table-columns: ->
				@columns = $ @ele .find 'tr' .first! .children! .length
			get-table-th: ->
				$ @ele .find 'th' .each (item, th) ~>
					@th.push($ th .text!)

			get-table-td: ->
				tdArray = []
				$ @ele .find 'td' .each (item, td) ->
					tdArray.push($ td .text!)

				count = 0
				for row from 0 to @rows - 1
					tr = {}
					for column from 0 to @columns - 1
						item = @th[column]
						tr[item] = tdArray[count++] 
					@td.push(tr)


			render: (item, method) ->
				#item 表示根据哪个来排序，method表示排序的方式
				if method is 'ascending-sort'
					@ascending-sort item
				else if method is 'descending-sort'
					@descending-sort item

				trStr = ''
				for i from 0 to @rows - 1
					str = '<tr>'
					for key of @td[i]
						str  += '<td>' + @td[i][key] + '</td>'
					str += '</tr>'
					trStr += str
				$ @ele .find 'tr' .first! .nextAll! .remove!
				$ @ele .find 'tbody' .append $ trStr

			ascending-sort: (sort-by) ->
				@td.sort (a,b) ->
					a[sort-by] - b[sort-by]
			descending-sort: (sort-by) ->
				@td.sort (a, b) ->
					b[sort-by] - a[sort-by]

		enabled-sort = (id, options) !->
			sortObj = new sortable id
			sortObj.init options

		util.enabled-sort = enabled-sort
	)(util)

	window.util = util
)(window)