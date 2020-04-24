<template>
    <div class="layout">
        <div>
            <h3 @click="toHome" class="portfolio"><i class="icon icon-bar-chart"></i>组合管理</h3>
            <hr>
        </div>
        <div class="content">
            <keep-alive>
                <router-view class="view" v-if="$route.meta.keepAlive"/>
            </keep-alive>
            <router-view class="view" v-if="!$route.meta.keepAlive"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data(){
            return {
            }
        },
        methods: {
            toHome(){
                this.$router.push({name: 'portfolio'})
            }
        },
        mounted(){
            // this.$router.push({name: 'portfolio'})
        }
    }
</script>

<style scoped lang="less">
    @width: 60vw;

    .layout {
        overflow-x: hidden;
    }

    .content {
        position: relative;
        width: @width;
        left: 50%;
        min-width: 1000px;
        transform: translate(-50%, 0);
        overflow-y: auto;
    }

    .portfolio {
        cursor: pointer;
    }

    hr {
        margin-left: 1vw;
    }

    h3 {
        margin-top: 2vh;
    }

    .icon {
        margin-right: 5px;
    }

    .view {
        height: 100%;
    }
</style>
