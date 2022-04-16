import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import MainNavigation from './common/navigation/MainNavigation';
import Map from './common/showcase/Map'
import Home from './common/showcase/Home'
import Portal from './common/portal/Portal';
import Footer from './common/showcase/Footer';
import Auth from './user/Auth';


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
            <MainNavigation schoolLink="grand-hallet"
            schoolLogo="img/Grand-Hallet_blanc.png" />

            <Home caroussel1="img/Grand-Hallet-photo_1.jpg" 
            caroussel2="img/Grand-Hallet-photo_1.jpg" 
            caroussel3="img/Grand-Hallet-photo_1.jpg">
            </Home>

            <Map lat={50.694356732800614} lng={5.038149998040227} ></Map>
            <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A"></Footer>
          </Route>

          <Route path="/grand-hallet/actu" exact>
            <MainNavigation schoolLink="grand-hallet"
                            schoolLogo="img/Grand-Hallet_blanc.png" />
             <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A"></Footer>
          </Route>

          <Route path="/grand-hallet/parent-eleve">
            <MainNavigation schoolLink="grand-hallet"
                            schoolLogo="img/Grand-Hallet_blanc.png" />
              <Auth connexiontitle_1="Afin accéder à l'espace dédié aux élèves ainsi qu'à leurs parents,"
                    connexiontitle_2="veillez vous connecter" />
          </Route>

          <Route path="/grand-hallet/prof">
            <MainNavigation schoolLink="grand-hallet"
              schoolLogo="img/Grand-Hallet_blanc.png" />
              <Auth connexiontitle_1="Afin accéder à l'espace dédié aux enseignants,"
                    connexiontitle_2="veillez vous connecter"/>
          </Route>



        {/* Partie de l'école de Moxhe*/}
        <Route path="/moxhe" exact>
          <MainNavigation schoolLink="moxhe" 
          actuLink="moxhe" 
          schoolLogo="img/Moxhe_blanc.png" />

          <Home caroussel1="img/Moxhe-photo_1.jpg" 
                caroussel2="img/Moxhe-photo_1.jpg" 
                caroussel3="img/Moxhe-photo_1.jpg">
          </Home>

          <Map lat={50.63151053045548} lng={5.081328142211933}></Map>
          <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Mayeur J Debras 3A"></Footer>
        </Route>

        <Route  path="/moxhe/actu" exact>
          <MainNavigation schoolLink="moxhe" 
                          actuLink="moxhe" 
                          schoolLogo="img/Moxhe_blanc.png" />
          <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Tombeu 7"></Footer>
        </Route>

        <Route path="/moxhe/parent-eleve">
            <MainNavigation schoolLink="moxhe"
              schoolLogo="img/Moxhe_blanc.png" />
              <Auth connexiontitle_1="Afin accéder à l'espace dédié aux élèves ainsi qu'à leurs parents,"
                    connexiontitle_2="veillez vous connecter" />
          </Route>

          <Route path="/moxhe/prof">
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="img/Moxhe_blanc.png" />
              <Auth connexiontitle_1="Afin accéder à l'espace dédié aux enseignants,"
                    connexiontitle_2="veillez vous connecter" />
          </Route>



      </Switch>
    
    </main>
  </Router>

  );
};

export default App;
