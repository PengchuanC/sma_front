<template>
    <div class="outlook">
        <div class="header">
            <h5>{{data.port_name}}</h5>
            <i class="icon icon-maximize-2" @click="show"></i>
        </div>
        <div class="performance">
            <p class="nav" :class="color">{{data.nav}}</p>
            <div class="change">
                <p class="item" :class="color">{{data.change}}</p>
                <p class="item" :class="color">{{data.pct.toFixed(2)}}%</p>
            </div>
        </div>
        <hr>
        <div class="performance">
            <p>净资产(万元)</p>
            <p>{{data.total}}</p>
        </div>
        <div class="performance">
            <p>今日盈亏(元)</p>
            <p>{{data.profit}}</p>
        </div>
        <p class="note">{{data.date}}</p>
    </div>
</template>

<script>
    export default {
        name: "Outlook",
        props: {
            data: Object
        },
        data(){
            return {
                color: 'red'
            }
        },
        methods: {
            formatNumber(num){
                if (typeof(num) === undefined) {
                    return num
                }
                return num.toFixed(2).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
            },
            show(){
                let port_id = this.data.port_id
                this.$router.push({'name': 'info', params: {port_id: port_id}})
            },
        },
        created() {
            this.data.total = this.formatNumber(this.data.total)
            this.data.profit = this.formatNumber(this.data.profit)
            this.color = this.data.pct >=0? 'red': 'green'
        }
    }
</script>

<style scoped lang="less">
 .outlook {
     border: 1px solid #efefef;
     background-color: #fbfbfb;
     padding: 15px 10px 0 10px;

     h5 {
         text-align: left;
         /*text-decoration: underline;*/
     }

     i {
         cursor: pointer;
     }

     .header {
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
         margin-bottom: 10px;
     }

     .performance {
         display: flex;
         flex-direction: row;
         justify-content: space-between;

         .nav {
             font-size: xx-large;
         }

         .change {
             display: block;
             text-align: right;
         }
     }

     hr {
         margin: 10px 0;
         padding: 0;
         border: 1px dashed #C0C0C0;
     }

     .note {
         text-align: left;
         font-size: smaller;
         color: #C0C0C0;
         margin-top: 5px;
     }

     .red {
         color: #CB2220;
     }

     .green {
         color: #42b983;
     }
 }
</style>
