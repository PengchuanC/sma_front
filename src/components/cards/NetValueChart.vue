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
            drawNavValue(x, y1, y2, swap, ticker){
                let width = window.innerWidth;
                //    绘制净值图
                let chart = echarts.init(document.getElementById('net-value-chart'))
                let options = {
                    legend : {
                        show : true,
                        icon: 'line',
                        textStyle: {
                            fontSize: width >= 480? 18: 12
                        },
                        top: '5%'
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
                        bottom : '4%',
                        top : 30,
                        containLabel : true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: x,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            interval: x.length - 2
                        },
                    },
                    yAxis: {
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
                        }
                    },
                    series: [
                        {
                            name: '本组合',
                            type: 'line',
                            data: y1,
                            // symbol: 'none',
                            markPoint: {
                                symbol: 'rect',
                                symbolSize: width >= 480 ? [30 , 20]: [25, 16],
                                symbolOffset: [0, -15],
                                fontFamily: 'Kaiti',
                                fontSize: width >= 480 ? 12: 8,
                                data: swap.map(x=>{
                                    let colors = {1: '#668B8B', 2: '#2f4554', 3: '#CB2220'}
                                    return {
                                        name: x.x, value: x.value, xAxis: x.x, yAxis: x.y,
                                        itemStyle: {color: colors[x.code], opacity: 0.9},
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
                                        type:'dashed'
                                    }
                                }
                            }
                        },
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
            this.drawNavValue(nav.date, nav.portfolio, nav.benchmark, nav.swap, nav.ticker)
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
