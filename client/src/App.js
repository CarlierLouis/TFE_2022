import React, { useState, useCallback, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './common/navigation/MainNavigation';
import Map from './showcase/Map'
import Home from './showcase/Home'
import Portal from './portal/Portal';
import Footer from './showcase/Footer';
import Auth from './user/Auth';
import { AuthContext } from './common/context/auth-context';
import News from './showcase/News';
import NewNews from './admin/NewNews';
import UpdateNews from './admin/UpdateNews';

let logoutTimer;

const App = () => {
const [token, setToken] = useState(false);
const [tokenExpirationDate, setTokenExpirationDate] = useState();
const [userId, setUserId] = useState(false);
const [role, setRole] = useState(false);


const login = useCallback((uid, token, role, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify(
      {userId: uid, token: token, role: role, expiration: tokenExpirationDate.toISOString()}
      ));
}, [])
  
const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem('userData');
}, []);

// Auto logout
useEffect(() => {
  if (token && tokenExpirationDate) {
    const remainingTime = tokenExpirationDate - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime)
  }
  else {
    clearTimeout(logoutTimer);
  }
}, [token, logout, tokenExpirationDate]);

// Auto login
useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if (storedData && storedData.token && new Date(storedData.expiration > new Date())) {
    login(storedData.userId, storedData.token, storedData.role);
  }
}, [login]);

let routes;

if (token && role === "Admin") {
  routes = (
    
<Switch>
  <Redirect from="/grand-hallet/login/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/login/prof" to="/moxhe" />


  <Route path="/" exact>
          <Portal />
  </Route>

    {/* Partie de l'école de Grand-Hallet */}
    <Route path="/grand-hallet" exact>
      <MainNavigation schoolLink="grand-hallet"
      schoolLogo="/img/Grand-Hallet_blanc.png" />

      <Home caroussel1="/img/Grand-Hallet-photo_1.jpg" 
      caroussel2="/img/Grand-Hallet-photo_1.jpg" 
      caroussel3="/img/Grand-Hallet-photo_1.jpg" />
      
      <News school="grand-hallet" numberofnews="3"/>

      <Map lat={50.694356732800614} lng={5.038149998040227} />
      <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/actu" exact>
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/img/Grand-Hallet_blanc.png" />
        <News school="grand-hallet" numberofnews="200"/>
        
        <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>
    
    <Route path="/grand-hallet/admin/add-news">
      <MainNavigation schoolLink="grand-hallet"
                        schoolLogo="/img/Grand-Hallet_blanc.png" />
        <NewNews schoolname="grand-hallet" />
    </Route>

    <Route path="/grand-hallet/admin/update-news/:newsId">
    <MainNavigation schoolLink="grand-hallet"
                        schoolLogo="/img/Grand-Hallet_blanc.png" />
      <UpdateNews schoolname="grand-hallet" />
    </Route>


    {/* Partie de l'école de Moxhe*/}
    <Route path="/moxhe" exact>
      <MainNavigation schoolLink="moxhe" 
      actuLink="moxhe" 
      schoolLogo="/img/Moxhe_blanc.png" />

      <Home caroussel1="/img/Moxhe-photo_1.jpg" 
            caroussel2="/img/Moxhe-photo_2.jpg" 
            caroussel3="/img/Moxhe-photo_3.jpg" />

      <News school="moxhe" numberofnews="3"/>

      <Map lat={50.63151053045548} lng={5.081328142211933} />
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route  path="/moxhe/actu" exact>
      <MainNavigation schoolLink="moxhe" 
                      actuLink="moxhe" 
                      schoolLogo="/img/Moxhe_blanc.png" />
      <News school="moxhe" numberofnews="200"/>
      
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Tombeu 7" />
    </Route>

    <Route path="/moxhe/admin/add-news">
      <MainNavigation schoolLink="moxhe"
                        schoolLogo="/img/Moxhe_blanc.png" />
    </Route>

    <Route path="/moxhe/admin/update-news/:newsId">
    <MainNavigation schoolLink="moxhe"
                        schoolLogo="/img/Moxhe_blanc.png" />
      <UpdateNews schoolname="moxhe" />
    </Route>
    
</Switch>

  );
}

else if (token && role === "Default") {
  routes = (
    
<Switch>
  <Redirect from="/grand-hallet/login/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/login/prof" to="/moxhe" />

  <Redirect from="/grand-hallet/login/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/login/prof" to="/moxhe" />

    <Route path="/" exact>
      <Portal />
    </Route>

      {/* Partie de l'école de Grand-Hallet */}
    <Route path="/grand-hallet" exact>
      <MainNavigation schoolLink="grand-hallet"
      schoolLogo="/img/Grand-Hallet_blanc.png" />

      <Home caroussel1="/img/Grand-Hallet-photo_1.jpg" 
      caroussel2="/img/Grand-Hallet-photo_1.jpg" 
      caroussel3="/img/Grand-Hallet-photo_1.jpg" />

    <News school="grand-hallet" numberofnews="3"/>

      <Map lat={50.694356732800614} lng={5.038149998040227} />
      <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/actu" exact>
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/img/Grand-Hallet_blanc.png" />
      <News school="grand-hallet" numberofnews="200"/>
        
        <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/espace-prof">
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/img/Grand-Hallet_blanc.png" />
    </Route>
      


      {/* Partie de l'école de Moxhe*/}
    <Route path="/moxhe" exact>
      <MainNavigation schoolLink="moxhe" 
      actuLink="moxhe" 
      schoolLogo="/img/Moxhe_blanc.png" />

      <Home caroussel1="/img/Moxhe-photo_1.jpg" 
            caroussel2="/img/Moxhe-photo_2.jpg" 
            caroussel3="/img/Moxhe-photo_3.jpg" />

      <News school="moxhe" numberofnews="3"/>

      <Map lat={50.63151053045548} lng={5.081328142211933} />
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route  path="/moxhe/actu" exact>
      <MainNavigation schoolLink="moxhe" 
                      actuLink="moxhe" 
                      schoolLogo="/img/Moxhe_blanc.png" />
      <News school="moxhe" numberofnews="200"/>
      
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Tombeu 7" />
    </Route>

    <Route path="/moxhe/espace-prof">
      <MainNavigation schoolLink="moxhe"
                      schoolLogo="/img/Moxhe_blanc.png" />
    </Route>


</Switch>

  );
}

else if (token && role === "Student") {
  routes = (
    
<Switch>
  <Redirect from="/grand-hallet/login/parent-eleve" to="/grand-hallet" />
  <Redirect from="/moxhe/login/parent-eleve" to="/moxhe" />

  <Redirect from="/grand-hallet/login/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/login/prof" to="/moxhe" />

  <Route path="/" exact>
    <Portal />
  </Route>

    {/* Partie de l'école de Grand-Hallet */}
    <Route path="/grand-hallet" exact>
      <MainNavigation schoolLink="grand-hallet"
      schoolLogo="/img/Grand-Hallet_blanc.png" />

      <Home caroussel1="/img/Grand-Hallet-photo_1.jpg" 
      caroussel2="/img/Grand-Hallet-photo_1.jpg" 
      caroussel3="/img/Grand-Hallet-photo_1.jpg" />

    <News school="grand-hallet" numberofnews="3"/>

      <Map lat={50.694356732800614} lng={5.038149998040227} ></Map>
      <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/actu" exact>
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/img/Grand-Hallet_blanc.png" />
        <News school="grand-hallet" numberofnews="200"/>
        
        <Footer title="Ecole Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/espace-eleve">
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/img/Grand-Hallet_blanc.png" />
    </Route>
    


    {/* Partie de l'école de Moxhe*/}
    <Route path="/moxhe" exact>
      <MainNavigation schoolLink="moxhe" 
      actuLink="moxhe" 
      schoolLogo="/img/Moxhe_blanc.png" />

      <Home caroussel1="/img/Moxhe-photo_1.jpg" 
            caroussel2="/img/Moxhe-photo_2.jpg" 
            caroussel3="/img/Moxhe-photo_3.jpg" />

    <News school="moxhe" numberofnews="3"/>

      <Map lat={50.63151053045548} lng={5.081328142211933} />
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route  path="/moxhe/actu" exact>
      <MainNavigation schoolLink="moxhe" 
                      actuLink="moxhe" 
                      schoolLogo="/img/Moxhe_blanc.png" />
      <News school="moxhe" numberofnews="200"/>
      
      <Footer title="Ecole Fondamentale de Moxhe" addresse="Rue Tombeu 7" />
    </Route>

    <Route path="/moxhe/espace-eleve">
      <MainNavigation schoolLink="moxhe"
                      schoolLogo="/img/Moxhe_blanc.png" />
    </Route>

</Switch>

  );
}


else { 
  routes = (

<Switch>

  {/* Porail de redirection */}
  <Route path="/" exact>
      <Portal />
  </Route>

    {/* Partie de l'école de Grand-Hallet */}
    <Route path="/grand-hallet" exact>
    <MainNavigation schoolLink="grand-hallet"
    schoolLogo="/img/Grand-Hallet_blanc.png" />

    <Home caroussel1="/img/Grand-Hallet-photo_1.jpg" 
    caroussel2="/img/Grand-Hallet-photo_2.jpg" 
    caroussel3="/img/Grand-Hallet-photo_3.jpg" />

    <News school="grand-hallet" numberofnews="3"/>

    <Map lat={50.694356732800614} lng={5.038149998040227} ></Map>
    <Footer title="École Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/actu" exact>
    <MainNavigation schoolLink="grand-hallet"
                    schoolLogo="/img/Grand-Hallet_blanc.png" />
      <News school="grand-hallet"  numberofnews="200"/>
      
      <Footer title="École Fondamentale de Grand-Hallet" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route path="/grand-hallet/login/parent-eleve">
    <MainNavigation schoolLink="grand-hallet"
                    schoolLogo="/img/Grand-Hallet_blanc.png" />
      <Auth connexiontitle_1=""
            connexiontitle_2=""
            schoolname="grand-hallet"
            usertype="students"
            usertypeId="studentId" 
            usertypefr="élèves ainsi qu'à leurs parents" />
    </Route>

    <Route path="/grand-hallet/login/prof">
    <MainNavigation schoolLink="grand-hallet"
      schoolLogo="/img/Grand-Hallet_blanc.png" />
      <Auth connexiontitle_1=""
            connexiontitle_2=""
            schoolname="grand-hallet"
            usertype="teachers"
            usertypeId="teacherId"
            usertypefr="enseignants" />
    </Route>


    {/* Partie de l'école de Moxhe*/}
    <Route path="/moxhe" exact>
      <MainNavigation schoolLink="moxhe" 
      actuLink="moxhe" 
      schoolLogo="/img/Moxhe_blanc.png" />

      <Home caroussel1="/img/Moxhe-photo_1.jpg" 
            caroussel2="/img/Moxhe-photo_2.jpg" 
            caroussel3="/img/Moxhe-photo_3.jpg" />

    <News school="moxhe"  numberofnews="3"/>

      <Map lat={50.694356732800614} lng={5.038149998040227} />
      <Footer title="École Fondamentale de Moxhe" addresse="Rue Mayeur J Debras 3A" />
    </Route>

    <Route  path="/moxhe/actu" exact>
      <MainNavigation schoolLink="moxhe" 
                      actuLink="moxhe" 
                      schoolLogo="/img/Moxhe_blanc.png" />
      <News school="moxhe"  numberofnews="200"/>

      <Footer title="École Fondamentale de Moxhe" addresse="Rue Tombeu 7" />
    </Route>

    <Route path="/moxhe/login/parent-eleve">
      <MainNavigation schoolLink="moxhe"
        schoolLogo="/img/Moxhe_blanc.png" />
        <Auth connexiontitle_1=""
              connexiontitle_2=""
              schoolname="moxhe"
              usertype="students"
              usertypefr="élèves ainsi qu'à leurs parents" />
    </Route>

    <Route path="/moxhe/login/prof">
      <MainNavigation schoolLink="moxhe"
                      schoolLogo="/img/Moxhe_blanc.png" />
        <Auth connexiontitle_1=""
              connexiontitle_2=""
              schoolname="moxhe"
              usertype="teachers"
              usertypefr="enseignants"/>
  </Route>

</Switch>

  );
}
  
  return (
  <AuthContext.Provider 
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      role: role,
      login: login,
      logout: logout
    }}>
    <Router>
      <main>
      {routes}
      </main>
    </Router>
  </AuthContext.Provider>

  );
};

export default App;
