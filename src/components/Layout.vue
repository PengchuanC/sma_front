<template>
    <div class="layout">
        <div class="banner">
            <img :src="logo">
            <h3 @click="toHome" class="portfolio"><i class="icon icon-bar-chart"></i>组合管理</h3>
            <i @click="toLogin" class="icon icon-user user"></i>
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
    import logo from '../assets/logo-03.png'

    export default {
        name: "Layout",
        data(){
            return {
                logo: logo
            }
        },
        methods: {
            toHome(){
                this.$router.push({name: 'portfolio'})
            },
            toLogin(){
                this.$router.push({name: 'login'})
            }
        },
        mounted(){
            // this.$router.push({name: 'portfolio'})
        }
    }
</script>

<style scoped lang="less">
    @width: 60vw;

    .banner {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0;
        padding: 0;
        background: linear-gradient(to right, #ff0844, #ffb199);
        background-size: 200%;
        height: 50px;

        img {
            position: absolute;
            width: 100px;
            left: 10px;
            margin: 0;
        }

        h3 {
            margin: 0;
            color: #f0f0f4;
            vertical-align: center;
        }

        .user {
            position: absolute;
            right: 30px;
            font-size: large;
            color: whitesmoke;
            cursor: pointer;
        }
    }

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
        margin-top: 15px;
    }

    .portfolio {
        cursor: pointer;
    }

    hr {
        margin: 0 0 15px;
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
