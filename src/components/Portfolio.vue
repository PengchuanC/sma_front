<template>
    <div class="portfolio">
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
            getPortfolio(){
                this.showPortfolio = false
                this.http.get('/api/v1/portfolio/').then(resp=>{
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
            this.getPortfolio()
        }
    }
</script>

<style scoped lang="less">
    @media screen and (min-width: 480px) {
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
    }

    @media screen and (max-width: 480px) {
        .portfolio {
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            cursor: unset;
            max-width: 1000px;
            margin: 0 auto;

            .card {
                width: 90vw;
                margin: 10px;
                min-width: 250px;
            }
        }
    }
</style>
