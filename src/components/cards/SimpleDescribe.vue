<template>
    <div class="simple-describe">
        <div class="active-calendar">
            <div class="header">
                <h6>{{performance.name}}</h6>
                <!--                <p>{{performance.date? performance.date: ''}}</p>-->
            </div>
            <AtPopover trigger="click" placement="bottom" class="popover" v-if="id===2">
                <i class="icon icon-calendar calendar-icon"></i>
                <template slot="content">
                    <calendar :value="calendar.value" @select="select" class="selector" />
                </template>
            </AtPopover>
        </div>
        <div class="row">
            <div v-for="(item, i) in formatNumber(row1)" :key="i">
                <div :class="id===2? i===0?'item2 highlight': 'item2': 'item'">
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
    import {Popover as AtPopover} from 'at-ui'
    import Calendar from "../common/calendar";

    export default {
        name: "SimpleDescribe",
        props: {
            performance: Object,
            id: Number,
        },
        components: {Calendar, AtPopover },
        data(){
            return {
                row1: [],
                row2: [],
                calendar: {
                    value: [2020, 4, 27],
                    weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                },
                date: null,
            }
        },
        methods: {
            formatNumber(row){
                if (this.id===1){
                    return row.map(x=>{
                        if (x.value < 1000 && x.value > -1000){
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
                    if (['累计收益率', '当日收益率'].includes(x.name)) {
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
            },
            select(e){
                e = new Date(e[0], e[1]-1, e[2])
                let d = this.$moment(e).format('YYYY-MM-DD')
                this.$emit('selectDate', d)
                this.calendar.value = [2020, 4, 5]
            }
        },
        mounted(){
            let data = this.performance.data
            let row = data.length / 2
            this.row1 = data.slice(0, row)
            this.row2 = data.slice(row, row*2)
            if (this.performance.dateArray){
                let d = this.performance.dateArray
                this.calendar.value = [d[0], d[1]+1, d[2]]
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/portinfo";
    .calendar-icon{
        position:absolute;
        cursor: pointer;
        display: inline;
        top: -22px;
        left: 250px;
        color: white;
    }

    .selector {
        .calendar-icon();
        transform: translate(-40%, 2%);
    }

    @media screen and (max-width: 480px) {
        .simple-describe {
            border: @red-border;

            .header {
                display: flex;
                justify-content: space-between;
                background-color: #CC2220;

                h6 {
                    text-align: left;
                    margin-left: 2%;
                    line-height: 30px;
                    margin-bottom: 10px;
                    color: white;
                }

                p {
                    text-align: right;
                    margin-right: 2%;
                    line-height: 30px;
                    margin-bottom: 10px;
                    font-size: 14px;
                }
            }

            .active-calendar{
                display: inline;
            }


            .popover {
                display: flex;
                margin-left: 10px;
                white-space: nowrap;
                text-align: left;
                justify-content: left;
            }

            .row{
                display: flex;
                padding: 0;
                margin-left: 0;
                margin-right: 0;
                text-align: justify;
                justify-content: space-around;

                .item {
                    width: 80px;
                    display: inline-block;
                    text-align: center;
                    &:hover{
                        transform: scale(1.3);
                    }

                    h4 {
                        text-align: center;
                        font-size: 16px;
                    }
                    p {
                        font-size: 12px;
                    }
                }
            }

            .row2 {
                margin-top: 10px;
                margin-bottom: 10px;
                .row();
            }
        }
    }
</style>
