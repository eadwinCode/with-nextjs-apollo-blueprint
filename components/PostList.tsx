import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import PostUpvoter from './PostUpvoter'
import ErrorMessage from './ErrorMessage'


export const ALL_POSTS_QUERY = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
export type Post = {
    id: number
    title: string
    url: string
    votes: number
    createdAt: Date
}

export interface TData{
    allPosts: Post[]
    _allPostsMeta: any
}
export const allPostsQueryVars = {
    skip: 0,
    first: 10,
}


const PostList: React.FC = () => {
    const { loading, error, data, fetchMore, networkStatus } = useQuery<TData>(ALL_POSTS_QUERY, {
        variables: allPostsQueryVars,
        notifyOnNetworkStatusChange: true
    })

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                skip: allPosts.length,
            },
            updateQuery: (previousResult: TData, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return previousResult
                }
                return Object.assign({}, previousResult, {
                    allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
                })
            }
        })
    }

    if (error) return <ErrorMessage message="Error loading posts." />
    if (loading && !loadingMorePosts) return <div>Loading</div>

    const { allPosts, _allPostsMeta } = data as TData
    const areMorePosts = allPosts.length < _allPostsMeta.count

    return (
        <section>
            <ul>
                {allPosts.map((post, index) => (
                    <li key={post.id}>
                        <div>
                            <span>{index + 1}. </span>
                            <a href={post.url}>{post.title}</a>
                            <PostUpvoter id={post.id} votes={post.votes} />
                        </div>
                    </li>
                ))}
            </ul>
            {areMorePosts && (
                <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
                    {loadingMorePosts ? 'Loading...' : 'Show More'}
                </button>
            )}
        </section>
    )

}

export default PostList