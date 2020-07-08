<template>
    <div class="layout">
<!--        <div class="login">-->
<!--            <div>-->
<!--                <p class="title">SMA</p>-->
<!--                <at-input v-model="username" placeholder="用户名"></at-input>-->
<!--                <br>-->
<!--                <at-input v-model="password" type="password" placeholder="密码"></at-input>-->
<!--                <br>-->
<!--                <at-button class="submit" type="info" @click="login">登陆</at-button>-->
<!--            </div>-->
<!--        </div>-->
        <div class="login2">
            <div class="login-wrapper">
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="username" type="text" placeholder="用户名" />
                    </label>
                </div>
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="password" type="password" placeholder="登陆密码" />
                    </label>
                </div>
                <div class="no-resign">
                    <checkbox class="hint" v-model="noResign">7天免登陆</checkbox>
                </div>
                <button @click="login">登陆</button>
            </div>
            <div class="corp-logo-wrapper">
                <p class="corp-logo">SMA</p>
            </div>
        </div>
    </div>
</template>

<script>

    import {Checkbox} from 'at-ui'
    import {Token} from "./scripts/utils"
    import moment from 'moment'

    export default {
        name: "Login",
        components: {
            Checkbox
        },
        data() {
            return {
                username: '',
                password: '',
                noResign: true,
            }
        },
        methods:{
            login(){
                Token.setToke('')
                Token.setLongToken('')
                Token.setExpireDate('')
                this.http.post('/auth/', {username: this.username, password: this.password}).then(resp=>{
                    let data = resp.data
                    let token = data.access
                    let tomorrow = moment(new Date()).add(1,'days').format('MMMM Do YYYY, h:mm:ss a')
                    Token.setToke('Bearer '+ token)
                    Token.setExpireDate(tomorrow)
                    if (this.noResign) {
                        let longToken = data.refresh
                        Token.setLongToken(longToken)
                    } else {
                        localStorage.longToken = null
                    }
                    this.$token = "Bear " + token
                    this.$router.push({name: 'layout'})
                }).catch((e)=>{
                    console.log(e.response.statusText)
                    this.$Message.warning("登陆失败，请检查账户或密码")
                })
            }
        }
    }
</script>

<style scoped lang="less">
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
    /*.login{*/
    /*    position: relative;*/
    /*    left: 50%;*/
    /*    border: 1px solid #C0C0C0;*/
    /*    width: 40%;*/
    /*    min-width: 300px;*/
    /*    max-width: 400px;*/
    /*    transform: translate(-50%, 50%);*/
    /*    border-radius: 5px;*/
    /*    padding: 20px;*/
    /*    background-color: rgba(239, 239, 239, 0.8);*/
    /*}*/
    /*.login .title {*/
    /*    font-size: 36px;*/
    /*    line-height: 80px;*/
    /*    margin-bottom: 20px;*/
    /*}*/

    /*.login .submit {*/
    /*    margin-bottom: 20px;*/
    /*}*/

    .login2 {
        position: relative;
        display: flex;
        left: 50%;
        top: 50%;
        border: none;
        width: 450px;
        padding: 40px 0 40px 0;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        background: #191919;
        text-align: center;
        border-radius: 20px;
        opacity: 0.7;
        transform: translate(-50%, -50%);

        .login-wrapper {
            display: flex;
            flex-direction: column;
            width: 300px;
            align-items: center;
            align-content: center;
            vertical-align: center;
            border-right: 1px solid #C0C0C0;

            .input-item {
                background: none;
                display: block;
                margin: 20px auto;
                text-align: center;
                border: 2px solid #3498db;
                /*padding: 14px 10px;*/
                width: 200px;
                outline: none;
                color: white;
                height: 30px;
                border-radius: 12px;
                transition: 0.25s;

                &:focus {
                    width: 250px;
                    background: transparent
                }
            }

            .no-resign {
                align-items: center;
                .hint {
                    margin-left: 10px;
                    color: white;
                    /*height: 20px;*/
                    vertical-align: middle;
                }
            }

            button{
                background: none;
                display: block;
                margin: 20px auto;
                text-align: center;
                border: 2px solid #2ecc71;
                padding: 0 24px;
                outline: none;
                color: white;
                height: 30px;
                border-radius: 12px;
                transition: 0.25s;
                cursor: pointer;

                &:hover {
                    background: #2ecc71;
                }
            }
        }

        .corp-logo-wrapper {
            position: relative;
            width: 150px;
            align-items: center;
            vertical-align: middle;

            .corp-logo {
                position: absolute;
                top: 50%;
                left: 50%;
                font-weight: 500;
                color: #ffffff;
                font-size: 36px;
                text-align: center;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
