/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//跨浏览器绑定事件
function addHandler(elem, type, handler) {
  if(elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else if(elem.attachEvent) {
    elem.attackEvent('on' + type, handler);
  } else {
    elem['on' + type] = handler;
  }
}

//颜色生成颜色 
function getRandomColor() {
  return '#' + (Math.random()*0xffffff << 0).toString(16);
}

//get weekData 
function getWeekData(dayData) {
  var result = {};
  var count = 0, sum = 0;
  for(var city in dayData) {
    result[city] = [];
    for(var i = 0, size = dayData[city].length; i < size; i++) {
      count++;
      sum += dayData[city][i].height;
      if(count === 7) {
        var data = {
          week: dayData[city][i - 6].day + ' TO ' + dayData[city][i].day,
          height: sum / 7
        };
        result[city].push(data);
        count = 0;
        sum = 0;
      }
    }
  }
  return result;
}

function getMonthData(dayData) {
  var result = {};
  var sum = 0, month, count = 0;
  for(var city in dayData) {
    result[city] = [];
    month = dayData[city][0].day[6]; 
    console.log(month);
    for(var i = 0, size = dayData[city].length; i < size; i++) {
      if(i != size-1 && month === dayData[city][i].day[6]) {
        sum += dayData[city][i].height;
        count++;
      } else {
        month = dayData[city][i].day[6];
        var data = {
          month: dayData[city][i].day.slice(0,6),
          height: sum/count
        };
        sum = 0;
        count = 0;
        result[city].push(data);
      }
    }
  }
  return result;
}

// 用于渲染图表的数据
// 整体的结构为 {day: {beijing: [], shanghai: []}
//                week:
//                 month:}
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

var className = {
  day: 'day',
  week: 'week',
  month: 'month'
}

var leftNum = {
  day: 1.08,
  week: 7.08,
  month: 30
}

var leftInit = {
  day: 1,
  week: 6,
  month: 10
}
/**
 * 渲染图表   // dayData 的结构 {beijin: [{day: "2016-01-01", height: ""}], }
 */
function renderChart() {
  var chartArea = document.getElementById('chartArea');
  chartArea.innerHTML = ""; //清除已有的图表
  var fragment = document.createDocumentFragment();
  var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  var div = null;
  var size = selectedData ? selectedData.length : 0;
  for(var i = 0, left = leftInit[pageState.nowGraTime]; i < size; i++) {
    div = document.createElement('div');
    div.title = selectedData[i].title + ': ' + selectedData[i].height;
    div.className = 'bar ' + className[pageState.nowGraTime];
    div.style.left = left + '%';
    div.style.backgroundColor = getRandomColor();
    left += leftNum[pageState.nowGraTime];
    div.style.height = selectedData[i].height * 0.8;
    fragment.appendChild(div);
  }
  chartArea.appendChild(fragment);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
  if(event.target.value !== pageState.nowGraTime) {
      // 设置对应数据
    pageState.nowGraTime = event.target.value;
      // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化 
  var nowSelectCity = this.value;
  if(nowSelectCity !== pageState.nowSelectCity) {
    // 设置对应数据
    pageState.nowSelectCity = nowSelectCity;
    // 调用图表渲染函数    
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var fieldset = document.getElementById('form-gra-time');
  addHandler(fieldset, 'click', graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var fragment = document.createDocumentFragment();
  var option = null;
  for(var item in aqiSourceData) {
    option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    fragment.appendChild(option);
  }
  var select = document.getElementById('city-select')
  select.appendChild(fragment);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addHandler(select, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  // dayData 的结构 {beijin: [{day: "2016-01-01", height: ""}], }
  var dayData = {};
  var weekData = {};
  var monthData = {};
  var city, item;
  //初始化
  for(city in aqiSourceData) {
    dayData[city] = [];
    weekData[city] = [];
    monthData[city] = [];    
  }

  //转换数据 for day
  for(city in aqiSourceData) {
    for(item in aqiSourceData[city]) {
      dayData[city].push({day: item, height: aqiSourceData[city][item]});
    }
  }

  weekData = getWeekData(dayData);
  monthData = getMonthData(dayData);

  chartData.day = dayData; 
  chartData.week = weekData;
  chartData.month = monthData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
window.onload = function () { 
  init();
  renderChart();
}