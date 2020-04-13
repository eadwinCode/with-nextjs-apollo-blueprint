import React from 'react'
import Layout from '../components/Layout'
import { withAuthSync } from '../components/Auth/PrivateRoute'
import { Button } from "@blueprintjs/core"
import Router from 'next/router'


const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <Button intent="success" text="button content" onClick={() => Router.push('/')}>
      Testing
    </Button>
  </Layout>
)

export default withAuthSync(AboutPage)
