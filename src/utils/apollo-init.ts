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
      authorization: token
    }
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({ uri: ApolloServerURL }))
})
export default client
