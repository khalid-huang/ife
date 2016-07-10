(function(window){
  var util, tool;
  util = {};
  tool = {
    _mixin: function(rcv, gv){
      var method;
      for (method in gv) {
        rcv[method] = gv[method];
      }
    }
  };
  (function(){
    var sortable, enabledSort;
    sortable = function(id){
      this.ele = id;
      this.th = [];
      this.td = [];
      this.columns = 0;
      this.rows = 0;
      this.options = {
        frozen: false
      };
    };
    sortable.prototype = {
      init: function(options){
        tool._mixin(this.options, options);
        this.getTableInfo();
        this.enableTableStyle();
        this.enableTableAction();
        return this.enableTableProperty();
      },
      getTableInfo: function(){
        this.getTableRows();
        this.getTableColumns();
        this.getTableTh();
        return this.getTableTd();
      },
      enableTableStyle: function(){
        $(this.ele).find('th').each(function(){
          var ascend, descend;
          ascend = $('<span class="ascending-sort"></span>');
          descend = $('<span class="descending-sort"></span>');
          return $(this).append(ascend).append(descend);
        });
      },
      enableTableAction: function(){
        var this$ = this;
        $(this.ele).find('th').find('.ascending-sort').on('click', function(event){
          var item;
          item = $(event.target).parent().text();
          return this$.render(item, 'ascending-sort');
        });
        $(this.ele).find('th').find('.descending-sort').on('click', function(event){
          var item;
          item = $(event.target).parent().text();
          return this$.render(item, 'descending-sort');
        });
      },
      enableTableProperty: function(){
        var table;
        table = this.ele;
        $(window).on('scroll', function(event){
          var scrollTop, offsetTop, gridHeight, height, diff;
          scrollTop = $('body').scrollTop();
          offsetTop = $(table).offset().top;
          gridHeight = $(table).children().find('tr').height();
          console.log(gridHeight);
          height = $(table).height();
          if (scrollTop > offsetTop) {
            diff = scrollTop - offsetTop;
            $(table).children().find('tr').eq(0).css('position', 'absolute');
            $(table).children().find('tr').eq(0).css('top', diff + 'px');
          }
          if (scrollTop > height + offsetTop) {
            return $(table).children().children('tr').eq(0).css('transform', 'translateY(0px)');
          }
        });
      },
      getTableRows: function(){
        return this.rows = $(this.ele).find('tr').length - 1;
      },
      getTableColumns: function(){
        return this.columns = $(this.ele).find('tr').first().children().length;
      },
      getTableTh: function(){
        var this$ = this;
        return $(this.ele).find('th').each(function(item, th){
          return this$.th.push($(th).text());
        });
      },
      getTableTd: function(){
        var tdArray, count, i$, to$, row, tr, j$, to1$, column, item, results$ = [];
        tdArray = [];
        $(this.ele).find('td').each(function(item, td){
          return tdArray.push($(td).text());
        });
        count = 0;
        for (i$ = 0, to$ = this.rows - 1; i$ <= to$; ++i$) {
          row = i$;
          tr = {};
          for (j$ = 0, to1$ = this.columns - 1; j$ <= to1$; ++j$) {
            column = j$;
            item = this.th[column];
            tr[item] = tdArray[count++];
          }
          results$.push(this.td.push(tr));
        }
        return results$;
      },
      render: function(item, method){
        var trStr, i$, to$, i, str, key;
        if (method === 'ascending-sort') {
          this.ascendingSort(item);
        } else if (method === 'descending-sort') {
          this.descendingSort(item);
        }
        trStr = '';
        for (i$ = 0, to$ = this.rows - 1; i$ <= to$; ++i$) {
          i = i$;
          str = '<tr>';
          for (key in this.td[i]) {
            str += '<td>' + this.td[i][key] + '</td>';
          }
          str += '</tr>';
          trStr += str;
        }
        $(this.ele).find('tr').first().nextAll().remove();
        return $(this.ele).find('tbody').append($(trStr));
      },
      ascendingSort: function(sortBy){
        return this.td.sort(function(a, b){
          return a[sortBy] - b[sortBy];
        });
      },
      descendingSort: function(sortBy){
        return this.td.sort(function(a, b){
          return b[sortBy] - a[sortBy];
        });
      }
    };
    enabledSort = function(id, options){
      var sortObj;
      sortObj = new sortable(id);
      sortObj.init(options);
    };
    return util.enabledSort = enabledSort;
  })(util);
  return window.util = util;
})(window);