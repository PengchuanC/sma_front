<template>
    <div class="layout">
        <nav>
            <a href="#1" class="start-home">Home</a>
            <a href="#2" class="start-about active">About</a>
            <a href="#3" class="start-blog">Blog</a>
            <a href="#4">Portfolio</a>
            <a href="#5">Contact</a>
            <div class="animation start-about">

            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
    .layout {
        background-color: #2c3e50;
    }

    nav {
        position: relative;
        margin: 5% auto 0;
        width: 590px;
        height: 50px;
        background: #34495e;
        border-radius: 8px;
        font-size: 0;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    }

    nav a {
        font-size: 15px;
        text-transform: uppercase;
        color: white;
        text-decoration: none;
        line-height: 50px;
        position: relative;
        z-index: 1;
        display: inline-block;
        text-align: center;
    }

    nav .animation {
        position: absolute;
        height: 5px;
        width: 100px;
        /*top: 0;*/
        bottom: 0;
        z-index: 0;
        background: #1abc9c;
        border-radius: 8px;
        transition: all .5s ease 0s;
    }

    a:nth-child(1){
        width: 100px;
    }

    a .start-home, a:nth-child(1):hover~.animation{
        width: 100px;
        left: 0;
    }

    a:nth-child(2){
        width: 110px;
    }

    a .start-about, a:nth-child(2).active~.animation{
        width: 110px;
        left: 100px;
    }

    a:nth-child(3){
        width: 100px;
    }

    a .start-blog, a:nth-child(3):hover~.animation{
        width: 100px;
        left: 210px;
    }

    a:nth-child(4){
        width: 160px;
    }

    a .start-portfolio, a:nth-child(4):hover~.animation{
        width: 160px;
        left: 310px;
    }

    a:nth-child(5){
        width: 120px;
    }

    a .start-contact, a:nth-child(5):hover~.animation{
        width: 120px;
        left: 470px;
    }


</style>
