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
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBDbi1lZkphZjVlazZUZll6QWd5Iiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTYwMzg3MDA3OH0.Sxawzpf-wwmW_Ye5ikFCfbyESdO4F8kysAiIys8fhL0'
    }
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({ uri: ApolloServerURL }))
})
export default client
