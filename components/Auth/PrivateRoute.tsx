import React, { useEffect } from 'react'
import Router from 'next/router'
import { getToken, setToken, removeToken } from '../../utils/authHelper'
import { NextPageContext } from 'next'

export const login = ({ token }: { token: string }) => {
    setToken(token)
    let next = Router.query.next
    if (next) {
        Router.push(next as string)
    } else {
        Router.push('/')
    }
}



export const authToken = (ctx: NextPageContext) => {
    const token = getToken(ctx)
    let next = ctx.pathname
    let url = next ? `/login?next=${next}` : "/login"
    // If there's no token, it means the user is not logged in.
    if (!token) {
        if (typeof window === 'undefined') {
            ctx.res!.writeHead(302, { Location: url })
            ctx.res!.end()
        } else {
            Router.push(url)
        }
    }

    return token
}

export const logout = () => {
    removeToken()
    Router.push('/login')
}

export const withAuthSync = (WrappedComponent: React.FC<any>) => {
    const Wrapper = (props: any) => {
        const syncLogout = (event: StorageEvent) => {
            if (event.key === 'logout') {
                console.log('logged out from storage!')
                Router.push('/login')
            }
        }

        useEffect(() => {
            window.addEventListener('storage', syncLogout)
            return () => {
                window.removeEventListener('storage', syncLogout)
                window.localStorage.removeItem('logout')
            }
        }, [])
        return <WrappedComponent {...props} />
    }

    Wrapper.getInitialProps = async (ctx: any) => {
        authToken(ctx)
        const componentProps = (WrappedComponent as any).getInitialProps &&
            await (WrappedComponent as any).getInitialProps(ctx)
        return { ...componentProps }
    }
    return Wrapper
}