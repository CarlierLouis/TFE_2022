import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './common/navigation/MainNavigation';
import Map from './common/UIElements/Map';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
          </Route>
          <Route path="/:school/home" exact></Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
