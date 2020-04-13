import React, { FormEvent } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Post, ALL_POSTS_QUERY, allPostsQueryVars, TData } from './PostList'

interface CreatePostVars {
    title: string
    url: string
    votes?: number
}

interface CreatePostData{
    createPost: Post
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($title: String!, $url:String!, $votes: Int){
        createPost(title: $title, url: $url, votes: $votes){
            id
            title
            votes
            url
            createdAt
        }
    }
`

const CreatePost: React.FC = () => {
    const [createPost, { loading }] = useMutation<CreatePostData, CreatePostVars>(CREATE_POST_MUTATION)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new window.FormData(form)
        const title = formData.get('title')
        const url = formData.get('url')
        form.reset()

        createPost({
            variables: { title, url } as CreatePostVars,
            update: (proxy, { data }) => {
                let post = data?.createPost
                const cached_data = proxy.readQuery<TData>({
                    query: ALL_POSTS_QUERY,
                    variables: allPostsQueryVars,
                })
                proxy.writeQuery({
                    variables:allPostsQueryVars,
                    query: ALL_POSTS_QUERY,
                    data:{
                        ...cached_data,
                        allPosts: [post, ...cached_data!.allPosts]
                    }
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Submit</h1>
            <input placeholder="title" name="title" type="text" required />
            <input placeholder="url" name="url" type="url" required />
            <button type="submit" disabled={loading}> Submit</button>
            <style jsx>{`
                    form {
                    border-bottom: 1px solid #ececec;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                    }
                    h1 {
                    font-size: 20px;
                    }
                    input {
                    display: block;
                    margin-bottom: 10px;
                    }
                `}</style>
        </form>
    )
}

export default CreatePost