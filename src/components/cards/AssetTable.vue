<template>
    <div>
        <table>
            <tr>
                <th>序号</th>
                <th class="th2">基金简称</th>
                <th>投资金额（元）</th>
                <th>投资比例</th>
            </tr>
            <tr v-for="(row, i) in data" :key="i" :class="row.id? row.id % 2 ===0? '': 'light': 'grey'">
                <td class="td1">{{row.id}}</td>
                <td class="td2">{{row.name}}</td>
                <td class="td3">{{row.scale}}</td>
                <td class="td4">{{`${row.ratio}%`}}</td>
            </tr>
        </table>
        <hr class="table" style="margin: 0"/>
    </div>
</template>

<script>
    export default {
        name: "AssetTable",
        props: {
            data: Array
        }
    }
</script>

<style scoped lang="less">
    table {
        border-collapse: collapse;
        width: 100%;
        font-size: small;
        font-family: Arial, "Kaiti SC", 'Kaiti', sans-serif;
        margin-bottom: 0;
    }

    tr {
        line-height: 16px;
        .th2 {
            text-align: left;
        }

        &:hover{
            transform: scale(1.1);
            font-weight: bolder;
        }
    }

    tr[class='grey']{
        background: #D3D3D3;
        color: #CB2220;
    }

    tr[class='light']{
        background: #efefef;
    }

    th {
        background: #CB2220;
        color: white;
    }

    .td1 {
        text-align: center;
    }

    .td2 {
        text-align: left;
    }

    .td3 {
        text-align: right;
    }

    .td4 {
        text-align: right;
    }

    .table{
        height: 1px;
        width: 100%;
        background-color: #C0C0C0;
        border: none;
    }

</style>
