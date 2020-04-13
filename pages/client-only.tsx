import InfoBox from '../components/InfoBox'
import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import UserList from '../components/UserList'
import { withAuthSync } from '../components/Auth/PrivateRoute'

const clientOnly = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <InfoBox>
            ℹ️ This example shows how to disable apollos query fetching on the server.
      If you <a href="/client-only">reload</a> this page, you will see a loader
      since Apollo didn't fetch any data on the server. This allows{' '}
            <a
                href="https://nextjs.org/blog/next-9#automatic-static-optimization"
                target="_blank"
                rel="noopener noreferrer"
            >
                automatic static optimization
      </a>
      .
    </InfoBox>
        <UserList  />
    </Layout>
)

clientOnly.getStaticProps = ({ apolloState, apolloClient, context, ...rest }: any) => {
    console.log("called clientOnly ", rest)
    return {
        apolloClient
    }
}

export default withAuthSync(withApollo({ ssr: false })(clientOnly))