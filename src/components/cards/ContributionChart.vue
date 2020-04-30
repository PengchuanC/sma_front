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
                        height: 140
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
                        data: ['总计', '权益', '固收', '其他']
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
                        data: [data['总计'], data['权益'], data['固收'], data['其他']],
                        itemStyle: {
                            normal: {
                                color: (x)=>{
                                    let colors = ['#c23531', '#61a0a8', '#61a0a8', '#61a0a8']
                                    return colors[x.dataIndex]
                                }
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
        width: 300px;
        height: 200px;
    }
</style>
