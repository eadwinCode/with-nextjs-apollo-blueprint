import React from 'react'
import { withApollo } from '../lib/apollo'
import LoginAction from '../components/Login'



export default withApollo()((_props: any) =>(
        <LoginAction />
 ))
