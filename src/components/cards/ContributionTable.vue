<template>
    <div>
        <table>
            <tr>
                <th>序号</th>
                <th class="th2">基金简称</th>
                <th>累计收益（元）</th>
            </tr>
            <tr v-for="(row, i) in data" :key="i" :class="row[0]%2===0? '': 'light'">
                <td class="td1">{{row[0]? row[0]: '-'}}</td>
                <td class="td2" :class="row[0]? '':'bold'">{{row[1]}}</td>
                <td class="td3" :class="row[0]? '':'bold'" :style="row[2] >= 0?{color: 'red'}: {color: 'green'}">{{row[2]}}</td>
            </tr>
        </table>
        <hr class="table" style="margin: 0"/>
    </div>
</template>

<script>
    export default {
        name: "ContributionTable",
        props:{
            data: Array,
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
        line-height: 17px;
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

    .bold{
        font-weight: bolder;
    }

    .green {
        color: green;
    }

    .red{
        color: red;
    }

    .td3 {
        text-align: right;
    }


    .table{
        height: 1px;
        width: 100%;
        background-color: #C0C0C0;
        border: none;
    }

</style>
