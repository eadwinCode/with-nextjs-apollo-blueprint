import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const ALL_USERS_QUERY = gql`
  query {
    users {
        id
        username
        email
    }
  }
`
export type User = {
  id: number
  username: string
  email: string
}

type QueryResultData = {
  users: User[]
}

type UserListProps = {
}

const UserList: React.FC<UserListProps> = ({ }) => {
  const { loading, error, data } = useQuery<QueryResultData>(ALL_USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  if (error) return <ErrorMessage message={String(error)} />
  if (loading) return <div>Loading</div>

  const { users } = data as QueryResultData

  return (
    <section>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <a href="#">{user.username} - {user.email}</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )

}

export default UserList