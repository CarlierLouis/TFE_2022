import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

// Navbars
import MainNavigationGH from './grand-hallet/MainNavigationGH';
import MainNavigationMoxhe from './moxhe/MainNavigationMoxhe';

// Maps
import MapGH from './grand-hallet/MapGH';
import MapMoxhe from './moxhe/MapMoxhe';

//Home Pages
import HomeGH from './grand-hallet/HomeGH';
import HomeMoxhe from './moxhe/HomeMoxhe';

// Portail de redirection
import Portal from './common/portal/Portal';


const App = () => {
  return (
    <Router>
     
      <main>
        <Switch>
          
            <Route path="/" exact>
              <Portal></Portal>
            </Route>

            {/* Partie de l'école de Grand-Hallet */}
            <Route  path="/grand-hallet" exact>
            <MainNavigationGH />
              <HomeGH></HomeGH>
              <MapGH></MapGH>
            </Route>

            <Route  path="/grand-hallet/actu" exact>
            <MainNavigationGH />
            </Route>


          {/* Partie de l'école de Moxhe*/}
          <Route path="/moxhe" exact>
            
          <MainNavigationMoxhe />
            <HomeMoxhe></HomeMoxhe>
            <MapMoxhe></MapMoxhe>
          </Route>

          <Route  path="/moxhe/actu" exact>
            <MainNavigationMoxhe />
            </Route>


        </Switch>
      
      </main>
    </Router>
  );
};

export default App;
