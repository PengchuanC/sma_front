<template>
    <div class="layout">
        <div class="login">
            <div>
                <p class="title">组合管理</p>
                <at-input v-model="username" placeholder="用户名"></at-input>
                <br>
                <at-input v-model="password" type="password" placeholder="密码"></at-input>
                <br>
                <at-button class="submit" type="info" @click="login">登陆</at-button>
            </div>
        </div>
    </div>
</template>

<script>

    import {Input as AtInput, Button as AtButton} from 'at-ui'
    export default {
        name: "Login",
        components: {
            AtInput,
            AtButton
        },
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods:{
            login(){
                this.http.post('/auth/', {username: this.username, password: this.password}).then(resp=>{
                    let data = resp.data
                    let token = data.token
                    localStorage.setItem('token', 'Token '+token)
                    this.$token = "Token " + token
                    this.$router.push({name: 'layout'})
                }).catch((e)=>{
                    console.log(e.response.statusText)
                    this.$Message.warning("登陆失败，请检查账户或密码")
                })
            }
        }
    }
</script>

<style scoped>
    .layout {
        position: relative;
        text-align: center;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    .layout:before{
        position: absolute;
        background: url('../assets/flower.jpg') no-repeat;
        background-size:cover;
        z-index: -1;
        filter: blur(5px);
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: -30px;
    }
    .login{
        position: relative;
        left: 50%;
        border: 1px solid #C0C0C0;
        width: 40%;
        min-width: 300px;
        max-width: 400px;
        transform: translate(-50%, 50%);
        border-radius: 5px;
        padding: 20px;
        background-color: rgba(239, 239, 239, 0.8);
    }
    .login .title {
        font-size: 36px;
        line-height: 80px;
        margin-bottom: 20px;
    }

    .login .submit {
        margin-bottom: 20px;
    }
</style>
