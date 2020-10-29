import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from './store'
import client from './utils/apollo-init'
import routes from './constants/routes'

import './styles/layout.scss'
import './App.css'
import Header from './components/Header'

function App () {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <section className={'main-layout'}>
            <Header />
            <div className={'content-wrapper'}>
              <Switch>
                {routes.map((route, i) => (
                  <Route {...route} key={i} />
                ))}
              </Switch>
            </div>
          </section>
        </Router>
      </ApolloProvider>
    </Provider>
  )
}

export default App
