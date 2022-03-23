import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';


import MainNavigation from './common/navigation/MainNavigation';
import Map from './common/showcase/Map'
import Home from './common/showcase/Home'
import Portal from './common/portal/Portal';
import NavLinks from './common/navigation/NavLinks';


const App = () => {
  return (
    <Router>
     
      <main>
        <Switch>
          
            {/* Porail de redirection */}
            <Route path="/" exact>
              <Portal></Portal>
            </Route>

            {/* Partie de l'école de Grand-Hallet */}
            <Route path="/grand-hallet" exact>
            <MainNavigation schoolLink="grand-hallet" actuLink="grand-hallet" />
              <Home schoolName="Grand-Hallet"></Home>
              <Map lat={50.694356732800614} lng={5.038149998040227}></Map>
            </Route>

            <Route path="/grand-hallet/actu" exact>
            <MainNavigation schoolLink="grand-hallet" actuLink="grand-hallet" />
            </Route>


          {/* Partie de l'école de Moxhe*/}
          <Route path="/moxhe" exact>
            
          <MainNavigation schoolLink="moxhe" actuLink="moxhe" />
            <Home schoolName="Moxhe"></Home>
            <Map lat={50.63151053045548} lng={5.081328142211933}></Map>
          </Route>

          <Route  path="/moxhe/actu" exact>
            <MainNavigation schoolLink="moxhe" actuLink="moxhe" />
            </Route>


          {/* Footer */}

        </Switch>
      
      </main>
    </Router>
  );
};

export default App;
