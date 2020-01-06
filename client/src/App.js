import React, { useEffect } from 'react';
import "materialize-css/dist/css/materialize.min.css"
import M from "materialize-css/dist/js/materialize.min.js"
import './App.css';
import store from "./store"
import { Provider } from "react-redux"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from './components/pages/Landing';
import Account from './components/pages/Account';
import Jobs from "./components/jobs/Jobs"

function App() {

  useEffect(() => {
    //initialize materialize JS
    M.AutoInit()
  })

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/jobs" component={Jobs} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
