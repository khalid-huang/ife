(function(){
  var util;
  util = {};
  (function(){
    var sortable, enabledSort;
    sortable = function(id){
      this.ele = id;
      this.th = [];
      this.td = [];
      this.columns = 0;
      return this.rows = 0;
    };
    sortable.prototype = {
      init: function(){
        this.getTableInfo();
        this.enableTableStyle();
        return this.enableTableAction();
      },
      getTableInfo: function(){
        this.getTableRows();
        this.getTableColumns();
        this.getTableTh();
        return this.getTableTd();
      },
      getTableRows: function(){
        return this.rows = $(this.ele).find('tr').length - 1;
      },
      getTableColumns: function(){
        return this.columns = $(this.ele).find('tr').first().children().length;
      },
      getTableTh: function(){
        var this$ = this;
        $(this.ele).find('th').each(function(item, th){
          return this$.th.push($(th).text());
        });
        return console.log(this.th);
      },
      getTableTd: function(){
        var tdArray, count, i$, to$, row, tr, j$, to1$, column, item;
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
          console.log(tr);
          this.td.push(tr);
        }
        return console.log(this.td);
      },
      enableTableStyle: function(){
        return $(this.ele).find('th').each(function(){
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
        return $(this.ele).find('th').find('.descending-sort').on('click', function(event){
          var item;
          item = $(event.target).parent().text();
          return this$.render(item, 'descending-sort');
        });
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
          console.log(this.td[i]);
          for (key in this.td[i]) {
            str += '<td>' + this.td[i][key] + '</td>';
          }
          str += '</tr>';
          trStr += str;
        }
        console.log(trStr);
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
    enabledSort = function(id){
      var sortObj;
      sortObj = new sortable(id);
      return sortObj.init();
    };
    return util.enabledSort = enabledSort;
  })(util);
  return window.util = util;
})(window);