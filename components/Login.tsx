import React, { FormEvent } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { login } from './Auth/PrivateRoute'
import ErrorMessage from './ErrorMessage'


interface loginVars {
    email: {
        email: string
        password: string
    }
}

interface LoginData {
    signinUser: { token: string }
}

const SIGNIN_MUTATION = gql`
    mutation signinUser($email: AUTH_PROVIDER_EMAIL){
        signinUser(email:$email){
            token
        }
    }
`

const LoginAction: React.FC = () => {
    const [signinUser, { loading, error }] = useMutation<LoginData, loginVars>(SIGNIN_MUTATION)


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new window.FormData(form)
        const usernameOrEmail = formData.get('usernameOrEmail')
        const password = formData.get('password')

        let vars = { email: usernameOrEmail, password }

        const sas = await signinUser({
            variables: { email: vars } as loginVars,
            update: (_, { data }) => {
                let token = data!.signinUser.token
                login({ token })
            }
        })
        console.log(sas)
        form.reset()
    }

    return (
        <>
            {error && <ErrorMessage message={String(error)} />}
            <form onSubmit={handleSubmit} >
                <input id="my-input" aria-describedby="usernameOrEmail" placeholder="usernameOrEmail" name="usernameOrEmail" type="text" required />
                <input id="password" aria-describedby="password" placeholder="password" name="password" type="password" />
                <button color="primary" type="submit" disabled={loading}> Submit</button>
            </form>
        </>
    )
}

export default LoginAction