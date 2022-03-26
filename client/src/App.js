import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';


import MainNavigation from './common/navigation/MainNavigation';
import Map from './common/showcase/Map'
import Home from './common/showcase/Home'
import Portal from './common/portal/Portal';
import Footer from './common/showcase/Footer';


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
              <MainNavigation schoolLink="grand-hallet" actuLink="grand-hallet" schoolLogo="img/Grand-Hallet.png" />
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <Home></Home>
              <Map lat={50.694356732800614} lng={5.038149998040227}></Map>
              <Footer></Footer>
            </Route>

            <Route path="/grand-hallet/actu" exact>
              <MainNavigation schoolLink="grand-hallet" actuLink="grand-hallet" schoolLogo="img/Grand-Hallet.png" />
              <Footer></Footer>
            </Route>


          {/* Partie de l'école de Moxhe*/}
          <Route path="/moxhe" exact>
            <MainNavigation schoolLink="moxhe" actuLink="moxhe" schoolLogo="img/Moxhe.png" />
            <Home></Home>
            <Map lat={50.63151053045548} lng={5.081328142211933}></Map>
            <Footer></Footer>
          </Route>

          <Route  path="/moxhe/actu" exact>
            <MainNavigation schoolLink="moxhe" actuLink="moxhe" schoolLogo="img/Moxhe.png" />
            <Footer></Footer>
          </Route>


        </Switch>
      
      </main>
    </Router>
  );
};

export default App;
