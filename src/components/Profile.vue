<template>
    <div class="layout">
        <div class="login2">
            <div class="login-wrapper">
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="username" type="text" placeholder="用户名" />
                    </label>
                </div>
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="password" type="password" placeholder="请输原密码" />
                    </label>
                </div>
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="password1" type="password" placeholder="请输入新密码" />
                    </label>
                </div>
                <div class="input-wrapper">
                    <label>
                        <input class="input-item" v-model="password2" type="password" placeholder="请确认新密码" />
                    </label>
                </div>
                <button @click="reset">重置密码</button>
            </div>
            <div class="corp-logo-wrapper">
                <p class="corp-logo">SMA</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                username: '',
                password: '',
                password1: '',
                password2: ''
            }
        },
        methods: {
            reset(){
                if (this.password1 !== this.password2) {
                    this.$Message.warning("两次输入密码不一致")
                }
                if (this.username === '') {
                    this.$Message.warning("请输入用户名")
                }
                if (this.password === '') {
                    this.$Message.warning("请输入原始密码")
                }
                if (this.password1 === '') {
                    this.$Message.warning("请输入新密码")
                }
                this.http.put('/manage/reset/',
                    {'username': this.username, 'password': this.password, 'password1': this.password1, 'password2': this.password2}
                    ).then(resp=>{
                        if (resp.status === 200) {
                            let data = resp.data
                            let code = data.code
                            let msg = data.msg
                            if (code === 0) {
                                this.$Message.info(msg)
                                this.$router.push({'name': 'login'})
                            }else{
                                this.$Message.error(msg)
                            }
                        }else{
                            this.$Message.error(resp.status)
                        }
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
        background: url('../assets/modern.png') no-repeat;
        background-size:cover;
        z-index: -1;
        /*filter: blur(5px);*/
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: -30px;
    }

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
                margin: 15px auto;
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
                border: 2px solid #C00000;
                padding: 0 24px;
                outline: none;
                color: white;
                height: 30px;
                border-radius: 12px;
                transition: 0.25s;
                cursor: pointer;

                &:hover {
                    background: #C00000;
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

