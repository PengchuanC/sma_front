<template>
    <div class="simple-describe">
        <h6>{{performance.name}}</h6>
        <div class="row">
            <div v-for="(item, i) in formatNumber(row1)" :key="i">
                <div class="item">
                    <h4 :style="{color: item.color}">{{item.value}}</h4>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
        <div class="row2">
            <div v-for="(item, i) in formatNumber(row2)" :key="i">
                <div class="item">
                    <h4>{{item.value}}</h4>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleDescribe",
        props: {
            performance: Object,
        },
        data(){
            return {
                row1: [],
                row2: []
            }
        },
        methods: {
            formatNumber(row){
                if (row.length===4){
                    return row.map(x=>{
                        if (x.value < 1000){
                            return {name:x.name, value: x.value===0? '-':x.value}
                        }
                        return {
                            name: x.name,
                            value: x.value.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
                        }
                    })
                }
                return row.map(x=>{
                    if (x.value === 0){
                        return {name: x.name, value: '-'}
                    }
                    if (x.name === '夏普比') {
                        return x
                    }
                    if (['累计收益'].includes(x.name)) {
                        let color = x.value > 0? 'red': 'green'
                        return {name: x.name, value: this.formatPercent(x.value), color: color}
                    }
                    return {name: x.name, value: this.formatPercent(x.value)}
                })
            },
            formatPercent(num){
                if (num===0){
                    return '-'
                }
                return `${num}%`
            }
        },
        mounted(){
            let data = this.performance.data
            let row = data.length / 2
            this.row1 = data.slice(0, row)
            this.row2 = data.slice(row, row*2)
        }
    }
</script>

<style scoped lang="less">
@import "../style/portinfo";
</style>
