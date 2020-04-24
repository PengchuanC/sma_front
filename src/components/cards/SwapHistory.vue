<template>
    <div class="layout-swap">
        <div class="date" v-for="(h, i) in history" :key="i">
            <i class="icon icon-circle"></i> <span>{{h.date}}</span>
            <ul class="swap">
                <li v-for="(r, i) in h.history" :key="i" class="item">
                    <div v-show="!more || r.id < maxRows">
                        <p :class="['买入', '转入'].includes(r.direction)? 'buy': 'sell'">{{r.direction}}</p>
                        <p class="name">{{r.name}}</p>
                        <p class="amount">{{formatNumber(r.amount)}}</p>
                        <p class="describe">{{r.direction === '买入'? '元': '份'}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="more" class="more"><a class="more" @click="more = !more">show more</a></div>
    </div>
</template>

<script>
    export default {
        name: "SwapHistory",
        props: {
            history: Array
        },
        data(){
            return {
                more: false,
                maxRows: 24
            }
        },
        methods: {
            formatNumber(num){
                return num.toFixed(2).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
            },
        },
        mounted(){
            let h = this.history[this.history.length-1].history
            let id = h[h.length - 1].id
            if (id >= this.maxRows) {
                this.more = true
            }
        }
    }
</script>

<style scoped>
    .layout-swap{
        font-size: small;
        color: black;
        width: 300px;
    }
    .date {
        text-align: left;
        padding-left: 0;
        padding-right: 0;
        margin-top: 10px;
        font-size: small;
    }

    .icon {
        margin-right: 10px;
    }

    .swap {
        margin-top: 10px;
        border: 1px solid #C0C0C0;
        padding: 10px;
    }

    .swap .item {
        margin-top: 5px;
    }

    .swap .item:hover{
        transform: scale(1.05);
        font-weight: bolder;
    }
    .swap p {
        display: inline-block;
        font-size: smaller;
        color: black;
    }

    .swap .buy{
        background-color: #CB2220;
        padding: 2px 10px;
        color: white;
        width: 45px;
    }

    .swap .sell{
        background-color: #80A9AE;
        padding: 2px 10px;
        color: white;
        width: 45px;
    }

    .swap .name{
        margin-left: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 130px;
        vertical-align: middle;
        overflow-x: hidden;
    }

    .swap .amount{
        padding-bottom: 0;
        vertical-align: middle;
        width: 70px;
        text-align: right;
    }

    .swap .describe {
        margin-left: 5px;
        text-align: right;
        padding-bottom: 0;
        vertical-align: middle;
        width: 12px;
    }

    .more {
        text-decoration: underline;
        color: #2c3e50;
        font-style: italic;
        text-align: left;
        margin-top: 5px;
    }

    .more:hover{
        color: #42b983;
    }
    .more:visited{
        display: none;
        color: red;
    }
</style>
