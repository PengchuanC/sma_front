<template>
    <div id="contribution-chart"></div>
</template>

<script>
    import echarts from "echarts"

    export default {
        name: "ContributionChart",
        props:{
            data: Object,
        },
        methods: {
            drawChart(data){
                let chart = echarts.init(document.getElementById('contribution-chart'))
                let options = {
                    tooltip: {
                        trigger: 'item',
                    },
                    grid: {
                        left: 40,
                        top: 30,
                        height: 135
                    },
                    textStyle: {
                        fontFamily: ['Arial', 'kaiti SC', 'Kaiti'],
                        fontSize: 12
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        data: ['\n总计', '\n权益', '\n固收', '\n另类', '货币\n及现金'],
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        name: '单位：%',
                        nameLocation: 'end'
                    },
                    series: [{
                        type: 'bar',
                        data: [data['总计'], data['权益'], data['固收'], data['另类'], data['货币及现金']],
                        itemStyle: {
                            normal: {
                                color: (x)=>{
                                    let colors = ['#c00000', '#E0B5B5', '#E0B5B5', '#E0B5B5', '#E0B5B5']
                                    return colors[x.dataIndex]
                                },
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            color: 'black'
                        },
                    }]
                }
                chart.setOption(options)
            }
        },
        mounted(){
            this.drawChart(this.data)
        }
    }
</script>

<style scoped lang="less">
    #contribution-chart{
        width: 100%;
        height: 200px;
    }
</style>
