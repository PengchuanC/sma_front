import axios from 'axios'
import {Token} from "./utils"
import moment from "moment"

const url = "http://product.nomuraoi-sec.com/api/fof/"
const refreshUrl = url + 'token/refresh/'

let request = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        'Authorization': '',
    }
})

request.interceptors.request.use(config=>{
    let now = moment(new Date())
    let expire = moment(Token.getExpireDate(), 'MMMM Do YYYY, h:mm:ss a')
    if (now > expire) {
        return new Promise(function (resolve, reject) {
            //刷新token
            axios.post(refreshUrl, {'refresh': Token.getLongToken()}).then(response => {
                let token = response.data.access
                config.headers.Authorization = `Bearer ${token}`
                Token.setToke(config.headers.Authorization)
                resolve(config);
            }).catch((e) => reject(e))
        });
    }
    config.headers['Authorization'] = Token.getToken()
    return config
    }, error => {
        return Promise.reject(error)
    }
    )


export default request
