<template>
    <div class="layout-swap">
        <div class="date" v-for="(h, i) in history.slice(0, 5)" :key="i" v-show="!more || i < showRowNum">
            <i class="icon icon-circle"></i> <span>{{h.date}}</span>
            <ul class="swap">
                <li v-for="(r, i) in h.history" :key="i" class="item">
                    <div v-show="!more || r.id < maxRows">
                        <p :class="['买入', '转入'].includes(r.direction)? 'buy': 'sell'">{{r.direction}}</p>
                        <p class="name">{{r.name}}</p>
                        <p class="amount">{{formatNumber(r.amount)}}</p>
                        <p class="describe">{{['买入', '退款'].includes(r.direction)? '元': '份'}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="more"><a class="more" @click="showMore">{{moreText}}</a></div>
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
                // 要显示的时间列数，如果第一列的时间个数就超过了maxRows，则只显示一个调仓日，以此类推
                showRowNum: 1,
                maxRows: 25,
                moreText: '更多'
            }
        },
        methods: {
            formatNumber(num){
                return num.toFixed(2).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
            },
            showMore(){
                this.more = !this.more
                this.moreText = this.more ? '更多': '收起'
            }
        },
        mounted(){
            let h = this.history[this.history.length-1].history
            let id = h[h.length - 1].id
            if (id >= this.maxRows) {
                this.more = true
            }
            let lengthCount = 0
            for (let x in this.history) {
                let h = this.history[x]
                lengthCount = lengthCount + h.history.length
                if ( lengthCount < this.maxRows){
                    this.showRowNum ++
                }
            }
            // this.maxRows = this.maxRows - this.showRowNum
        }
    }
</script>

<style scoped>
    .layout-swap{
        font-size: small;
        color: black;
        width: 100%;
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
        /*font-size: smaller;*/
        color: black;
    }

    .swap .buy{
        background-color: #CB2220;
        padding: 2px 10px;
        color: white;
        width: 50px;
    }

    .swap .sell{
        background-color: #80A9AE;
        padding: 2px 10px;
        color: white;
        width: 50px;
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
