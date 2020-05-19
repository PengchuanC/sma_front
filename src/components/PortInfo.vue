<template>
    <div class="layout">
        <div class="banner">
            <img class="image" :src="banner"  alt=""/>
            <img class="logo" :src="logo" alt="" />
            <div class="page-title">
                <h3>{{portinfo.port_name}}</h3>
                <p>{{portinfo.describe}}</p>
            </div>
        </div>
        <div class="performance">
            <div class="card1"><SimpleDescribe :performance="performance1" :id="1" v-if="netValueDataOk"/></div>
            <div class="card2"><SimpleDescribe :performance="performance2" :id="2" @selectDate="changeDate" v-if="netValueDataOk" /></div>
        </div>
        <NetValueChart :data="netValueChart" v-if="netValueDataOk"/>
        <footer>注：{{portinfo.base}}</footer>
        <div>
            <button @click="changePeriod(1)" :class="month===1?'left active': 'left'">近1月</button>
            <button @click="changePeriod(3)" :class="month===3?'active': ''">近3月</button>
            <button @click="changePeriod(6)" :class="month===6?'active': ''">近6月</button>
            <button @click="changePeriod(12)" :class="month===12?'active': ''">近1年</button>
            <button @click="changePeriod(0)" :class="month===0?'active right': 'right'">成立来</button>
        </div>
        <div class="detail">
            <div class="operations">
                <h6>操作日志</h6>
                <hr>
                <Instruction class="col" :history="swapHistory" v-if="swapHistoryOk" />
            </div>
            <div class="operations">
                <h6>持仓信息</h6>
                <hr>
                <AssetChart :data="assetAllocate" v-if="assetAllocateOk" />
                <AssetTable :data="invest" v-if="assetAllocateOk"/>
            </div>
            <div class="operations">
                <h6>累计收益贡献</h6>
                <hr>
                <ContributionChart :data="contribute" v-if="earningsOk" />
                <ContributionTable :data="earnings" v-if="earningsOk" />
            </div>
        </div>
        <p class="disclaimer">
            Disclaimer： 本页所示信息基于底层基金最新可得公开披露数据测算，仅供参考。本资产管理计划为净值型产品，不保证本金和收益，本材料不得转载或给第三方传阅
        </p>
    </div>
</template>

<script>
    import logo from '../assets/logo-03.png'
    import banner from '../assets/banner.png'
    import SimpleDescribe from "@/components/cards/SimpleDescribe"
    import NetValueChart from "@/components/cards/NetValueChart"
    import AssetChart from "@/components/cards/AssetChart"
    import AssetTable from "@/components/cards/AssetTable"
    import ContributionChart from "@/components/cards/ContributionChart"
    import ContributionTable from "@/components/cards/ContributionTable"
    import Instruction from "./cards/Instruction"

    export default {
        name: "PortInfo",
        components: {
            Instruction,
            ContributionTable,
            ContributionChart, AssetTable, AssetChart, NetValueChart, SimpleDescribe},
        data(){
            return {
                logo: logo,
                banner: banner,
                port_id: 1,
                date: '',
                portinfo: {},
                performance1: {},
                performance2: {},
                month: 0,
                netValueChart: {},
                netValueDataOk: false,
                swapHistory: [],
                swapHistoryOk: false,
                assetAllocate: [],
                assetAllocateOk: false,
                invest: [],
                earnings: [],
                contribute: {},
                earningsOk: false,
            }
        },
        methods: {
            getPortInfo(){
                this.http.post('/api/v1/portfolio/',
                    {
                        portId: this.port_id
                    },
                    {headers: {
                            'Authorization': this.$token
                        },
                    }
                ).then(resp=>{
                    this.portinfo = resp.data
                })
            },
            getPerformance(){
                this.netValueDataOk = false
                this.http.get('/api/v1/portfolio/nav/', {
                    headers: {
                        'Authorization': this.$token
                    },
                    params: {portId: this.port_id, date: this.date}
                }).then(resp=>{
                    let data = resp.data
                    this.performance1 = data.info
                    this.performance2 = data.performance
                    let dateStr = data.info.date
                    this.performance2.dateArray = this.$moment(dateStr, "YYYY/MM/DD").toArray()
                    this.netValueChart = data.nav
                    this.netValueDataOk = true
                }).catch(()=>{
                    this.$Message.error(`所选时间${this.date}对组合表现不适用`)
                    this.netValueDataOk = true
                })
            },
            changePeriod(e){
                this.netValueDataOk = false
                this.month = e
                this.http.get('/api/v1/portfolio/nav/', {
                    headers: {
                        'Authorization': this.$token
                    },
                    params: {portId: this.port_id, date: this.date, period: e}
                }).then(resp=>{
                    let data = resp.data
                    this.netValueChart = data.nav
                    this.netValueDataOk = true
                })
            },
            getSwapHistory(){
                this.swapHistoryOk = false
                this.http.get('/api/v1/portfolio/instruct/', {
                    headers: {
                        'Authorization': this.token
                    },
                    params: {portId: this.port_id, date: this.date}
                }).then(resp=>{
                    this.swapHistory = resp.data
                    this.swapHistoryOk = true
                }).catch(()=>{
                    this.$Message.error(`所选时间${this.date}对调仓记录不适用`)
                    this.netValueDataOk = true
                })
            },
            getInvest(){
                this.assetAllocateOk = false
                this.http.get('/api/v1/portfolio/asset/', {
                    headers: {
                        'Authorization': this.$token
                    },
                    params: {portId: this.port_id, date: this.date}
                }).then(resp=>{
                    this.invest = resp.data
                    let asset = []
                    this.invest.forEach(x=>{
                        if (x.id===null){
                            asset.push({name: x.name, value: x.ratio})
                        }
                    })
                    this.assetAllocate = asset
                    this.assetAllocateOk = true
                }).catch(()=>{
                    this.$Message.error(`所选时间${this.date}对资产配置不适用`)
                    this.assetAllocateOk = true
                })
            },
            getEarning(){
                this.earningsOk = false
                this.http.get('/api/v1/portfolio/earning/', {
                    headers: {
                        'Authorization': this.$token
                    },
                    params: {portId: this.port_id, date: this.date}
                }).then(resp=>{
                    let data = resp.data
                    this.earnings = data
                    this.contribute = data.contribution
                    this.earningsOk = true
                }).catch(()=>{
                    this.earningsOk = false
                }).catch(()=>{
                    this.$Message.error(`所选时间${this.date}对累计回报不适用`)
                    this.earningsOk = true
                })
            },
            changeDate(date){
                this.date = date
            },
            init() {
                this.getPortInfo()
                this.getPerformance()
                this.getInvest()
                this.getEarning()
                this.getSwapHistory()
            }
        },
        mounted(){
            this.$token = localStorage.getItem('token')
            if (!this.$token) {
                this.$router.push({name: 'layout'})
            }
            this.port_id = this.$route.params.port_id
            if (this.port_id){
                this.init()
            } else {
                this.$router.push({name: 'layout'})
            }
        },
        watch: {
            date: function () {
                this.init()
            },
            $route (to) {
                if (to.name === 'info'){
                    this.port_id = this.$route.params.port_id
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/style/portinfo";
</style>
