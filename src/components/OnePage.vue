<template>
    <div class="layout">
        <div class="banner">
            <img class="image" :src="logo"  alt=""/>
            <div class="page_title">
                <h3>{{portinfo.port_name}}</h3>
                <p>{{portinfo.describe}}</p>
            </div>
        </div>
        <div id="net_value"></div>
        <div class="control">
            <p class="small_font note">注：{{portinfo.base}}</p>
            <div>
                <button class="left" @click="changePeriod(1)">近1月</button>
                <button @click="changePeriod(3)">近3月</button>
                <button @click="changePeriod(6)">近6月</button>
                <button @click="changePeriod(12)">近1年</button>
                <button class="right" @click="changePeriod(0)">成立来</button>
            </div>
        </div>
        <div class="row at-row performance">
            <div class="col-7 left">
                <p class="title">成立以来表现<span>({{period.start}}至{{period.end}})</span></p>
                <hr>
                <div class="row" v-for="(row, ri) in performance" :key="ri">
                    <div class="col-8" v-for="(col, ci) in row" :value="row" :key="ci" style="margin-bottom: 20px">
                        <p
                                class="ratio"
                                :style="col[0]==='累计收益' && col[1] >= 0? {'color': 'red'}: col[0]==='累计收益' && col[1] < 0?{'color': 'green'}: {}">
                            <b>{{col[0] === "夏普比" ? col[1]:`${col[1]}%`}}</b>
                        </p>
                        <p class="describe">{{col[0]}}</p>
                    </div>
                    <br>
                </div>
                <p class="title" style="margin-top: 50px">操作记录</p>
                <hr>
                <SwapHistory :history="swapHistory" class="swap" v-if="swapHistory.length !== 0"/>
            </div>
            <div class="col-16">
                <div class="row at-row">
                    <div class="col-15">
                        <p class="title">持仓信息</p>
                        <hr>
                        <table>
                            <tr>
                                <th class="th1">序号</th>
                                <th class="th2">基金简称</th>
                                <th class="th3">规模(亿元)</th>
                                <th class="th3">配置比例</th>
                            </tr>
                            <tr v-for="(item, index) in invest" :key="index"
                                :class="item.id === null? 'grey': null">
                                <td>{{item.id}}</td>
                                <td class="td2">{{item.name}}</td>
                                <td>{{item.scale}}</td>
                                <td :class="item.id === null? 'red': null">{{item.ratio}}%</td>
                            </tr>
                        </table>
                        <hr class="grey">
                    </div>
                    <div class="col-9">
                        <p class="title">基金配置比例</p>
                        <hr>
                        <div id="asset"></div>
                    </div>
                </div>
                <div class="col-20 earning">
                    <table>
                        <tr>
                            <th class="th1">序号</th>
                            <th class="th2">基金简称</th>
                            <th class="th3">累计收益(元)</th>
                        </tr>
                        <tr v-for="(row, i) in earnings" :key="i" :class="i===0? 'tr_bold': i % 2 ===0? null: 'tr_grey'">
                            <td class="td1">
                                {{row[0]}}
                            </td>
                            <td class="td2">
                                {{row[1]}}
                            </td>
                            <td class="td3"
                                :class="row[2] > 0? 'td3-red': 'td3-green'">
                                {{row[2]}}
                            </td>
                        </tr>
                    </table>
                    <hr class="grey">
                </div>
            </div>
        </div>
        <div class="disclaimer">
            <p>
                Disclaimer： 本页所示信息基于底层基金最新可得公开披露数据测算，仅供参考。本资产管理计划为净值型产品，不保证本金和收益，本材料不得转载或给第三方传阅
            </p>
        </div>
    </div>
</template>

<script>
    import logo from '../assets/nomura.jpg'
    import echarts from 'echarts'
    import SwapHistory from "@/components/cards/SwapHistory"

    export default {
        name: "OnePage",
        components: {SwapHistory},
        data() {
            return {
                logo: logo,
                port_id: 0,
                portinfo: {},
                performance: {
                    // 'row1': [['累计收益', 4.18], ['夏普比', 0.79], ['年化收益', 7.26]],
                    // 'row2': [['最大回撤', -6.49], ['年化波动', 7.32], ['超额收益', 1.90]]
                },
                period: {start: "2020-01-01", end: "2020-01-01"},
                invest: [],
                earnings: [],
                swapHistory: []
            }
        },
        methods: {
            getPortInfo(){
                this.http.post('/api/v1/portfolio/',
                    {
                        portId: this.port_id
                    },
                    {headers: {
                            'Authorization': this.token
                        },
                    }
                ).then(resp=>{
                    this.portinfo = resp.data
                })
            },
            getPerformance(){
                this.http.get('/api/v1/portfolio/nav/', {
                    headers: {
                    'Authorization': this.token
                    },
                    params: {portId: this.port_id, benchmark: '000300'}
                }).then(resp=>{
                    let data = resp.data
                    let p = data.performance
                    this.performance = {
                        row1: [['累计收益', p.acc_return], ['夏普比', p.sharpe], ['年化收益', p.annual_return]],
                        row2: [['最大回撤', p.max_drawback], ['年化波动', p.annual_volatility], ['超额收益', p.acc_return_over]]
                    }
                    let nav = data.nav
                    this.period.start = nav.date[0]
                    this.period.end = nav.date[nav.date.length - 1]
                    this.drawNav(nav.date, nav.portfolio, nav.benchmark)
                })
            },
            getInvest(){
                this.http.get('/api/v1/portfolio/asset/', {
                    headers: {
                        'Authorization': this.token
                    },
                    params: {portId: this.port_id, benchmark: '000300'}
                }).then(resp=>{
                    this.invest = resp.data
                    let asset = []
                    this.invest.forEach(x=>{
                        if (x.id===null){
                            asset.push({name: x.name, value: x.ratio})
                        }
                    })
                    this.drawAsset(asset)
                })
            },
            getEarning(){
              this.http.get('/api/v1/portfolio/earning/', {
                  headers: {
                      'Authorization': this.token
                  },
                  params: {portId: this.port_id, benchmark: '000300'}
              }).then(resp=>{
                  this.earnings = resp.data
              })
            },
            getSwapHistory(){
                this.http.get('/api/v1/portfolio/swap/', {
                    headers: {
                        'Authorization': this.token
                    },
                    params: {portId: this.port_id, benchmark: '000300'}
                }).then(resp=>{
                    this.swapHistory = resp.data
                })
            },
            drawNav(x, y1, y2){
            //    绘制净值图
                let chart = echarts.init(document.getElementById('net_value'))
                let options = {
                    legend : {
                        show : true,
                        icon: 'line'
                    },
                    textStyle: {
                        fontFamily: ['Arial', 'kaiti SC', 'Kaiti']
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            show: true
                        }
                    },
                    grid : {
                        left : '4%',
                        right : '6%',
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
                    },
                    series: [
                        {
                            name: '本组合',
                            type: 'line',
                            data: y1,
                            // symbol: 'none',
                            markPoint: {
                                symbol: 'rect',
                                symbolSize: [30 , 20],
                                symbolOffset: [0, -15],
                                fontFamily: 'Kaiti',
                                data: [
                                    {
                                        name: '加仓', value: '加仓', xAxis: x[1], yAxis: y1[1],
                                        itemStyle: {color: '#CB2220'}
                                        },
                                    {name: '加仓', value: '减仓', xAxis: x[2], yAxis: y1[2], itemStyle: {color: '#668B8B'}}
                                ]
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
            },
            drawAsset(data){
            //    基金资产配置
                let chart = echarts.init(document.getElementById('asset'))
                let options = {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#c23531','#2f4554', '#61a0a8', '#6e7074',],
                    textStyle: {
                        fontFamily: ['Arial', 'kaiti SC', 'Kaiti'],
                        fontSize: 12
                    },
                    legend: {
                        show: true,
                        // align: 'center',
                        fontSize: 10,
                        textStyle: {
                            align: 'center',
                            lineHeight: 12,
                            justifyItems: 'center'
                        },
                        itemWidth: 16,
                        itemHeight: 12,
                    },
                    series: {
                        type: 'pie',
                        radius: ['25%', '70%'],
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
                        data: data
                    }
                }
                chart.setOption(options)
            },
            changePeriod(e){
                alert(e)
            }
        },
        mounted(){
            this.token = localStorage.getItem('token')
            if (!this.token) {
                this.$router.push({name: 'layout'})
            }
            this.port_id = this.$route.params.port_id
            if (this.port_id){
                this.getPortInfo()
                this.getPerformance()
                this.getInvest()
                this.getEarning()
                this.getSwapHistory()
            } else {
                this.$router.push({name: 'layout'})
            }
        }
    }
</script>

<style scoped>
    .layout {
        text-align: center;
        width: 100%;
        border: 3px #CB2220 solid;
        font-family: Arial, "Kaiti SC", "Kaiti", monospace;
        position: relative;
        margin-bottom: 5vh;
        overflow-x: hidden;
        padding: 0 0 1vh;
    }

    .banner {
        position: relative;
        height: 100px;
        width: 100%;
        border: 1px #CB2220 solid;
    }

    .banner .image {
        height: 100px;
        width: 100%;
    }
    .page_title {
        position: absolute;
        z-index: 2;
        left: 25%;
        bottom: 1px;
    }

    .page_title h3 {
        color: white;
        text-align: left;
    }

    .page_title p {
        color: white;
        text-align: left;
        font-size: small;
    }

    #net_value {
        width: 100%;
        height: 300px
    }

    #asset {
        margin-top: 30px;
        width: 100%;
        height: 300px;
    }

    .control {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    /*小字体*/
    .small_font {
        font-size:12px;
        -webkit-transform: scale(0.80);
        text-align: left;
        left: -80px;
        margin-bottom: 0;
    }
    .note {
        position: relative;
        font-size: 12px;
        text-align: left;
        left: -40px;
        margin-bottom: 0;
    }

    button {
        margin: 0;
        padding: 4px 5px 1px;
        border-radius: 0;
        background: #efefef;
        border: 0;
        font-size: 10px;
        border-bottom: 4px #efefef solid;
        cursor: pointer;
        font-family: Arial, "Kaiti SC", 'Kaiti', sans-serif;
    }
    button:focus{
        outline: none;
        color: gray;
        background: #F8F8FF;
    }

    button:active{
        outline: none;
        color: gray;
        background: #F8F8FF;
    }

    button .left {
        padding-left: 4px;
        border-radius: 5px 0 0 5px;
    }

    button .right {
        padding-right: 4px;
        border-radius: 0 5px 5px 0;
    }

    /*业绩表现部分*/
    .performance {
        font-size: small;
        margin-top: 15px;
    }

    .performance .left {
        margin-left: 3%;
    }

    .performance .title {
        white-space: nowrap;
        font-size: 12px;
        color: black;
        text-align: left;
        font-weight: bolder;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    hr {
        margin-top: 3px;
        margin-bottom: 3px;
        height: 2px;
        width: 100%;
        padding-left: 2px;
        background-color: #CB2220;
        border: none;
    }

    hr.grey {
        margin-top: 0;
        margin-bottom: 0;
        height: 1px;
        width: 100%;
        background-color: #C0C0C0;
        border: none;
    }

    .ratio {
        font-family: "Kaiti SC", Arial, monospace;
        text-align: center;
        font-weight: bolder;
        font-size: large;
        color: black;
    }

    .describe {
        text-align: center;
        font-size: 12px;
        color: black;
    }
    /*表格*/
    table {
        border-collapse: collapse;
        width: 100%;
        font-size: small;
    }

    tr .small_font {
        font-size:12px;
        -webkit-transform: scale(0.80);
    }

    tr.grey{
        background: #efefef;
        border: #efefef solid 2px;
        width: 100%;
    }

    td {
        color: black;
    }

    td.red {
        color: red;
    }

    th {
        background: #CB2220;
        color: white;
        padding: 0;
        margin: 0;
        border: 2px #CB2220 solid;
    }

    .th1 {
        min-width: 30px;
    }
    .th2 {
        text-align: left;
    }
    .th3 {
        min-width: 60px;
    }
    .td2 {
        text-align: left;
    }

    /*损益表*/
    .earning {
        margin-top: 10px;
        margin-left: -2px;
    }

    .earning .tr_bold {
        font-weight: bolder;
    }

    .earning .tr_grey{
        background: #efefef;
        border: #efefef solid 2px;
        width: 100%;
    }

    .earning .th1 {
        text-align: center;
    }

    .earning .th2 {
        text-align: left;
    }

    .earning .th3 {
        text-align: right;
        padding-right: 10px;
    }

    .earning .td1 {
        text-align: center;
    }

    .earning .td2 {
        text-align: left;
    }

    .earning .td3 {
        text-align: right;
        padding-right: 10px;
    }

    .earning .td3-red{
        color: red;
    }

    .earning .td3-green{
        color: green;
    }

    .swap {
        border: none;
        margin-top: -10px;
    }

    .disclaimer {
        text-align: left;
        margin-left: 0;
        margin-top: 10px;
        margin-bottom: 0;
        font-size: xx-small;
        color: black;
        -webkit-transform: scale(0.90);
    }

</style>
