<template>
    <div class="portfolio">
        <div v-for="(p ,i) in portfolio" :key="i">
            <Outlook :data="p" class="card" v-if="showPortfolio"/>
        </div>
        <div v-for="(p ,i) in portfolio" :key="i">
            <Outlook :data="p" class="card" v-if="showPortfolio"/>
        </div>
        <div v-for="(p ,i) in portfolio" :key="i">
            <Outlook :data="p" class="card" v-if="showPortfolio"/>
        </div>
        <div v-for="(p ,i) in portfolio" :key="i">
            <Outlook :data="p" class="card" v-if="showPortfolio"/>
        </div>
        <div v-for="(p ,i) in portfolio" :key="i">
            <Outlook :data="p" class="card" v-if="showPortfolio"/>
        </div>
    </div>
</template>

<script>
    import Outlook from "./cards/Outlook"
    export default {
        name: "Portfolio",
        components: {
            Outlook
        },
        data() {
            return {
                portfolio: [
                ],
                showPortfolio: false
            }
        },
        methods: {
            show(i){
                let port_id = this.portfolio[i].port_id
                this.$router.push({'name': 'info', params: {port_id: port_id}})
            },
            getPortfolio(){
                this.showPortfolio = false
                this.http.get('/api/v1/portfolio/', {
                    headers: {'Authorization': this.$token},
                }).then(resp=>{
                    this.portfolio = resp.data
                    this.showPortfolio = true
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

<style scoped lang="less">
    .portfolio {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        cursor: unset;
        max-width: 1000px;
        margin: 0 auto;

        .card {
            width: 300px;
            margin: 10px;
        }
    }
</style>
