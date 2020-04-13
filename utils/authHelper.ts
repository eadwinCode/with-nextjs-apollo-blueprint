import cookie from 'js-cookie'
import nextCookie from 'next-cookies'

const TOKEN_KEY = "ownerToken"

export const getToken = (ctx: any) => {
    let token_found = null
    if (process.browser) {
        token_found = window.localStorage.getItem(TOKEN_KEY)
    }
    else {
        const { token } = nextCookie(ctx) || { }
        token_found = token
    }
    
    return token_found
}

export const setToken = (token: string, expires: number = 1) => {
    cookie.set(TOKEN_KEY, token, { expires })
    if (process.browser) {
        window.localStorage.setItem(TOKEN_KEY, token)
    }
}

export const removeToken = () => {
    cookie.remove(TOKEN_KEY)
    if (process.browser) {
        window.localStorage.setItem(TOKEN_KEY, "")
        window.localStorage.setItem('logout', Date.now().toString())
    }
}