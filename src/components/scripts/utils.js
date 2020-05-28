
export function getToken(){
    return localStorage.getItem('token')
}

export class Token {

    static setToke(token) {
        localStorage.setItem('token', token)
    }

    static setExpireDate(date) {
        localStorage.setItem('expire', date)
    }

    static getExpireDate() {
        return localStorage.getItem('expire')
    }

    static getToken(){
        return localStorage.getItem('token')
    }

    static removeToken() {
        localStorage.token = null
        localStorage.longToken = null
    }

    static setLongToken(longToken) {
        localStorage.setItem('longToken', longToken)
    }

    static getLongToken() {
        return localStorage.getItem('longToken')
    }

}
