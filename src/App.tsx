import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {ApolloProvider} from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from "./store";
import client from "./utils/apollo-init";
import routes from "./constants/routes";
import './App.css';

function App() {
  return (
      <Provider store={store}>
        <ApolloProvider client={client}>
            <Router>
              <Switch>
                {routes.map((route, i) => (
                    <Route {...route}/>
                ))}
              </Switch>
            </Router>
        </ApolloProvider>
      </Provider>
  );
}

export default App;
