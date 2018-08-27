$(function(){
	var myChart = echarts.init(document.getElementById('container1'));
	var option = {

	//backgroundColor:'(21,34,17,0)',//图标背景颜色
	color:['#7ed02e','#2121b8'],//折线颜色
    title : {
        text: '未来一周气温变化',
		//show:false,
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['最高气温','最低气温']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint : {
                data : [
                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
	//true参数 是当数据改变时清除原本的数据
	myChart.setOption(option,true);

	//loading动画
	//myChart.showLoading();
	//myChart.hideLoading() ; 
	
	//更新数据
	//var option = myChart.getOption();
    //  option.series[0].data = data;   
    //  myChart.setOption(option);  
	
	//添加数据 echart2  appendData echart3
// 	 myChart.addData([
// 
//                         [
// 
//                             0,        // 系列索引
// 
//                             {
// 
//                                 value:Math.round(Math.random() * 1000), // 新增数据
// 
//                             },
// 
//                             true,     // 新增数据是否从队列头部插入
// 
//                             false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
// 
//                         ],
// 
//                     ]);
})