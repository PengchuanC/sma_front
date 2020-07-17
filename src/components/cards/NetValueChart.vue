<template>
    <div>
        <div id="net-value-chart"></div>
    </div>
</template>

<script>
    import echarts from "echarts"

    export default {
        name: "NetValueChart",
        props: {
            data: Object,
        },
        methods: {
            drawNavValue(x, y1, y2, excess, swap, ticker){
                let width = window.innerWidth;
                //    绘制净值图
                let chart = echarts.init(document.getElementById('net-value-chart'))
                let options = {
                    legend : {
                        show : true,
                        icon: 'line',
                        textStyle: {
                            fontSize: width >= 480? 15: 12
                        },
                        top: 0
                    },
                    textStyle: {
                        fontFamily: ['Arial', 'kaiti SC', 'Kaiti'],
                        fontSize: 12
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            show: true
                        }
                    },
                    grid : {
                        left : '4%',
                        right : 50,
                        bottom : 0,
                        top : 30,
                        containLabel : true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: x,
                        splitLine: {
                            show: false
                        },
                        // axisLabel: {
                        //     interval: x.length - 2
                        // },
                        axisLabel: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'white'
                            }
                        },
                        position: 'bottom',
                    },
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x,
                            splitLine: {
                                show: false
                            },
                            // axisLabel: {
                            //     interval: x.length - 2,
                            //     show: false
                            // },
                            axisLine:{
                                lineStyle:{
                                    color:'#A6A6A6'
                                }
                            },
                            position: 'bottom',
                        }],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            splitLine: {
                                show: false
                            },
                            interval: ticker.interval,
                            min: ticker.min,
                            max: ticker.max,
                            axisLabel: {
                                formatter: (value)=>{
                                    return value.toFixed(4)
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#A6A6A6'
                                }
                            },
                        },
                        {
                            type: 'value',
                            scale: true,
                            max: ticker.e_max,
                            min: ticker.e_min,
                            interval: ticker.e_ticker,
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: (value)=>{
                                    return `${(value*100).toFixed(2)}%`
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#A6A6A6'
                                }
                            },
                        }],
                    series: [
                        {
                            name: '本组合',
                            type: 'line',
                            data: y1,
                            markPoint: {
                                symbol: 'rect',
                                symbolSize: width >= 480 ? function (value) {
                                    return [42, (value.length/3).toFixed(0)*16]
                                }: [30, 20],
                                symbolOffset: [0, -20],
                                fontFamily: 'Kaiti',
                                fontSize: width >= 480 ? 6: 8,
                                data: swap.slice(1, swap.length).map(x=>{
                                    return {
                                        name: x.x, value: x.value.join('\n'), xAxis: x.x, yAxis: x.y, height: x.code,
                                        itemStyle: {color: '#CB2220', opacity: 0.9},
                                    }
                                })
                            }
                        },
                        {
                            name: '基准',
                            type: 'line',
                            data: y2,
                            // symbol: 'none',
                            itemStyle:{
                                normal:{
                                    lineStyle:{
                                        width:2,
                                        type:'dashed',
                                        color: '#D18484'
                                    },
                                    color: '#D18484'
                                },
                            },
                        },
                        {
                            name: "超额收益(右)",
                            data: excess,
                            type: 'line',
                            areaStyle: {},
                            yAxisIndex: 1,
                            itemStyle:{
                                normal:{
                                    lineStyle:{
                                        width:2,
                                        type:'dashed',
                                        color: '#E9E9E9'
                                    },
                                    color: '#E9E9E9'
                                },
                            },
                        }
                    ]
                }
                chart.setOption(options)
                window.addEventListener("resize", () => {
                    chart.resize();
                });
            },
        },
        mounted(){
            let nav = this.data
            this.drawNavValue(nav.date, nav.portfolio, nav.benchmark, nav.excess, nav.swap, nav.ticker)
        }
    }
</script>

<style scoped>
    #net-value-chart{
        width: 100%;
        height: 300px;
    }

    @media screen and (max-width: 480px){
        #net-value-chart{
            width: 100%;
            height: 200px;
        }
    }
</style>
