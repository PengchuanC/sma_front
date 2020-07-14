import axios from 'axios'
import {Token} from "./utils"
import moment from "moment"

const url = "http://10.170.129.129:8000/api/sma/"
// const url = "http://0.0.0.0:8000/api/sma/"
const refreshUrl = url + 'token/refresh/'

let request = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        'Authorization': '',
    }
})

request.interceptors.request.use(
    config => saveIdentify(config).then(config => addToken(config).then(config => addIdentify(config))),
    error => {
        return Promise.reject(error)
    }
)

/*拦截请求，添加token*/
async function addToken(config) {
    let now = moment(new Date())
    let expire = moment(Token.getExpireDate(), 'MMMM Do YYYY, h:mm:ss a')
    if (!expire) {
        return config
    }
    if (now > expire) {
        return new Promise(function (resolve, reject) {
            //刷新token
            axios.post(refreshUrl, {'refresh': Token.getLongToken()}).then(response => {
                let token = response.data.access
                config.headers.Authorization = `Bearer ${token}`
                Token.setToke(config.headers.Authorization)
                resolve(config);
            }).catch((e) => {
                Token.setToke('')
                Token.setLongToken('')
                reject(e)
            })
        });
    }
    config.headers['Authorization'] = Token.getToken()
    return config
}

/*拦截请求，添加身份加密信息到请求中*/
async function addIdentify(config) {
    let identify = config.headers.Authorization
    if (!identify) {
        config.headers.Authorization = Token.getIdentify()
    }
    return config
}

/*
* 拦截请求，储存加密后的用户身份信息到本地
* 此拦截器必须在添加身份信息之前才起作用
*/
async function saveIdentify(config) {
    let auth = config.headers.Authorization
    if (!auth || auth.startsWith('Bear') || auth.startsWith('Token')) {
        return config
    }
    Token.setIdentify(auth)
    return config
}

export default request
