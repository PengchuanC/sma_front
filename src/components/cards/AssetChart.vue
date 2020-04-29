<template>
    <div>
        <div id="asset-chart"></div>
    </div>
</template>

<script>
    import echarts from "echarts"

    export default {
        name: "AssetChart",
        props: {
            data: Array,
        },
        methods: {
            drawAsset(data){
                //    基金资产配置
                let chart = echarts.init(document.getElementById('asset-chart'))
                let options = {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#c23531','#2f4554', '#61a0a8', '#6e7074',],
                    textStyle: {
                        fontFamily: ['Arial', 'kaiti SC', 'Kaiti'],
                        fontSize: 12
                    },
                    grid: {
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        fontSize: 10,
                        textStyle: {
                            align: 'left',
                            lineHeight: 12,
                            justifyItems: 'center'
                        },
                        itemWidth: 16,
                        itemHeight: 12,
                    },
                    series: {
                        type: 'pie',
                        radius: ['35%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'inner',
                            formatter: '{c}%'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        center: ['35%', '50%'],
                        data: data
                    }
                }
                chart.setOption(options)
            },
        },
        mounted(){
            this.drawAsset(this.data)
        }
    }
</script>

<style scoped>
    #asset-chart{
        width: 300px;
        height: 200px;
    }
</style>
