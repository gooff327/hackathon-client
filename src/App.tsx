import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from './store'
import client from './utils/apollo-init'
import routes from './constants/routes'
import Header from './components/Header'
import { customTheme } from './constants/theme'
import ErrorBoundary from './containers/ErrorBoundary'

import './styles/layout.scss'
import './App.css'
function App () {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <ChakraProvider theme={customTheme}>
            <Router>
              <Box className={'main-layout'}>
                <Header />
                <div className={'content-wrapper'}>
                  <Switch>
                    {routes.map((route, i) => (
                      <Route {...route} key={i} />
                    ))}
                  </Switch>
                </div>
              </Box>
            </Router>
          </ChakraProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
