import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { getToken } from './utils/authHelper'


// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  (global as any).fetch = fetch
}

const getFormattedToken = (ctx: any) => {
  let token = getToken(ctx)
  return token ? `Bearer ${token}` : token
}



export default function createApolloClient(initialState: NormalizedCacheObject, ctx: any) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  const httpLink = createHttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
    credentials: 'same-origin',
    fetch
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: getFormattedToken(ctx)
      }
    }
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: Boolean(ctx), // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}