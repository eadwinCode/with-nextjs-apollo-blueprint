import InfoBox from '../../components/InfoBox'
import Layout from '../../components/Layout'
import { withApollo } from '../../lib/apollo'
import { withAuthSync } from '../../components/Auth/PrivateRoute'
import PostList from '../../components/PostList'

const IndexPage = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <InfoBox>
            ℹ️ This example shows how to fetch all initial apollo queries on the
      server. If you <a href="/">reload</a> this page you won't see a loader
      since Apollo fetched all needed data on the server. This prevents{' '}
            <a
                href="https://nextjs.org/blog/next-9#automatic-static-optimization"
                target="_blank"
                rel="noopener noreferrer"
            >
                automatic static optimization
      </a>{' '}
      in favour of full Server-Side-Rendering.
    </InfoBox>
        <PostList />
    </Layout>
)

IndexPage.getStaticProps = async ({ apolloClient }: any) => {
    return {
        apolloClient
    }
}

export default withAuthSync(withApollo({ ssr: true })(IndexPage))
