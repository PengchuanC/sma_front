<template>
    <div class="layout">
        <at-card class="card" v-for="(p, i) in portfolio" :key="i" :bodyStyle="{
            marginLeft: '5%', padding: 0, marginTop: '1%', marginBottom: '2%'
        }">
            <h4 slot="title" class="title">{{p.port_name}}</h4>
            <div slot="extra"><a @click="show(i)">查看</a></div>
            <div>
                <div class="row">
                    <div class="col-11">
                        <p>投入资金</p>
                    </div>
                    <div class="col-11 col-offset-1" style="text-align: right">
                        <p><strong>{{p.init_money.toFixed(0)}}</strong>  元</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-11">
                        <p>当前净值</p>
                    </div>
                    <div class="col-11 col-offset-1" style="text-align: right">
                        <p><strong>{{p.total.toFixed(0)}}</strong>  元</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-11">
                        <p>创建日期</p>
                    </div>
                    <div class="col-11 col-offset-1" style="text-align: right">
                        <p>{{p.launch_date.slice(0, 10)}}</p>
                    </div>
                </div>
            </div>
        </at-card>
    </div>
</template>

<script>
    import { Card as AtCard } from 'at-ui'
    export default {
        name: "Portfolio",
        components: {
            AtCard
        },
        data() {
            return {
                portfolio: [
                ]
            }
        },
        methods: {
            show(i){
                let port_id = this.portfolio[i].port_id
                this.$router.push({'name': 'info', params: {port_id: port_id}})
            },
            getPortfolio(){
                this.http.get('/api/v1/portfolio/', {
                    headers: {'Authorization': this.$token},
                }).then(resp=>{
                    this.portfolio = resp.data
                }).catch(()=>{
                    this.$Message.warning("认证失败，即将返回登陆页面")
                    setTimeout(()=>{this.$router.push({name: 'login'})}, 2000)
                })
            },
        },
        mounted(){
        },
        created(){
            let token = localStorage.getItem('token')
            if (token === null) {
                this.$router.push({name: 'login'})
                return
            }
            this.$token = token
            this.getPortfolio()
        }
    }
</script>

<style scoped>
    .layout {
        display: flex;
        position: relative;
        overflow: hidden;
        font-family: Arial, "Kaiti SC", 'Kaiti', sans-serif;
    }

    .card {
        margin-left: 2px;
        margin-right: 2px;
        margin-bottom: 5px;
        text-align: left;
        width: 60vh;
    }

    .title {
        text-align: left;
        font-size: smaller;
    }
</style>
