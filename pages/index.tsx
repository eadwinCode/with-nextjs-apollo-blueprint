import Layout from '../components/Layout'
import Link from 'next/link'
import Router from 'next/router'
import { Button } from "@blueprintjs/core"

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Button intent="primary" text="button content" onClick={() => Router.push('/')}>
        Testing
    </Button>
    </p>
  </Layout>
)

export default IndexPage
