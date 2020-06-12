import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import * as serviceWorker from './services/serviceWorker';
import history from './services/history';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';

import App from './containers/App';
import reducers from "./reducers";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import "./assets/css/reset.css";
import "./assets/css/fonts.css";
import "./assets/css/style.css";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: "http://localhost:3001/gql",
  // link: new HttpLink({
  //   uri: "http://localhost:3001/gql",
  // }),
  // headers: {
  //   authorization: localStorage.getItem('token'),
  // }, 
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initial_state = { auth: { authenticated: localStorage.getItem("token") }};

const store = createStore(
    reducers,
    initial_state,
    composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        </App>
      </Router>
    </Provider>
  </ApolloProvider>
  , document.getElementById('root')
);

serviceWorker.register();