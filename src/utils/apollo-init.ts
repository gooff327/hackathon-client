import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloServerURL } from '../constants'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { getFromLocalStorage } from './index'

const authLink = setContext((_, { headers }) => {
  const token = getFromLocalStorage('token')
  return {
    headers: {
      ...headers,
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvb2ZmMTk5N0BvdXRsb29rLmNvbSIsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE2MDM5Mzg4NjB9.AX8XKpKKyAYv16U9KWN06DaCzhj8DUiN0i7werlgsn8'
    }
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({ uri: ApolloServerURL }))
})
export default client
