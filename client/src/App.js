import React, { useState, useCallback, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './showcase/Home';
import Portal from './portal/Portal';
import Footer from './showcase/Footer';
import Auth from './user/Auth';
import { AuthContext } from './common/context/auth-context';
import News from './showcase/News';
import AddNews from './admin/News/AddNews';
import UpdateNews from './admin//News/UpdateNews';
import WelcomeUser from './email-confirmation/WelcomeUser';
import CheckEmail from './email-confirmation/CheckEmail';
import Users from './admin/Users/Users';
import UpdateUser from './admin/Users/UpdateUser';
import AddUser from './admin/Users/AddUser';
import AddExcel from './admin/Users/Excel/AddExcel';
import PersonalSpace from './user/PersonalSpace';
import GlobalCalendar from './showcase/GlobalCalendar';
import AddEvent from './admin/GlobalCalendar/AddEvent';
import UpdateEvent from './admin/GlobalCalendar/UpdateEvent';
import ProjectsAndRegulations from './showcase/ProjectsAndRegulations';

let logoutTimer;

const App = () => {
const [token, setToken] = useState(false);
const [tokenExpirationDate, setTokenExpirationDate] = useState();
const [userId, setUserId] = useState(false);
const [role, setRole] = useState(false);
const [school, setSchool] = useState(false);


const login = useCallback((uid, token, role, school, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    setSchool(school);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 1 day
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify(
      {userId: uid, token: token, role: role, school: school, expiration: tokenExpirationDate.toISOString()}
      ));
}, [])
  
const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    setSchool(null);
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
    login(storedData.userId, storedData.token, storedData.role, storedData.school);
  }
}, [login]);

let routes;

if (token && role === "Admin") {
  routes = (
    
<Switch>

  <Redirect from="/grand-hallet/connexion/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/connexion/prof" to="/moxhe" />

  {school === "grand-hallet" &&
    <Redirect from="/moxhe" to="/grand-hallet" />
  }

  {school === "moxhe" &&
    <Redirect from="/grand-hallet" to="/moxhe" />
  }

  <Route path="/" exact>
          <Portal />
  </Route>

  <Route path="/:school" exact>
    <Home numberofnews="3" />
  </Route>

  <Route path="/:school/actualites" exact>
      <News numberofnews="200"/>
      <Footer />
  </Route>

  <Route path="/:school/agenda">
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/admin/ajouter-evenement-calendrier">
    <AddEvent />
  </Route>

  <Route path="/:school/admin/maj-evenement-calendrier/:eventId">
    <UpdateEvent />
  </Route>

  <Route path="/:school/projets-et-reglements">
    <ProjectsAndRegulations />
    <Footer />
  </Route>
  
  <Route path="/:school/admin/ajouter-actualite">
      <AddNews />
  </Route>

  <Route path="/:school/admin/maj-actualite/:newsId">
    <UpdateNews />
  </Route>

  <Route path="/:school/admin/utilisateurs" exact>
    <Users />
  </Route>

  <Route path="/:school/admin/utilisateurs/:usertype">
    <Users />
  </Route>

  <Route path="/:school/admin/ajouter-utilisateur/:usertype">
    <AddUser />
  </Route>

  <Route path="/:school/admin/maj-utilisateur/:usertype/:userId">
    <UpdateUser />
  </Route>

  <Route path="/:school/admin/ajouter-excel/white-list-eleves">
    <AddExcel />
  </Route>

  <Route path="/:school/espace-prof" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/:section">
      <PersonalSpace />
  </Route>


</Switch>

  );
}

else if (token && role === "Default") {
  routes = (
    
<Switch>

  <Redirect from="/grand-hallet/connexion/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/connexion/prof" to="/moxhe" />

  <Redirect from="/grand-hallet/connexion/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/connexion/prof" to="/moxhe" />

  {school === "grand-hallet" &&
    <Redirect from="/moxhe" to="/grand-hallet" />
  }

  {school === "moxhe" &&
    <Redirect from="/grand-hallet" to="/moxhe" />
  }

  <Route path="/" exact>
    <Portal />
  </Route>

  <Route path="/:school" exact>
    <Home numberofnews="3" />
  </Route>

  <Route path="/:school/actualites" exact>
    <News numberofnews="200"/>
    <Footer />
  </Route>

  <Route path="/:school/agenda">
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements">
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/espace-prof" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/:section">
      <PersonalSpace />
  </Route>

</Switch>

  );
}

else if (token && role === "Student") {
  routes = (
    
<Switch>

  <Redirect from="/grand-hallet/connexion/parent-eleve" to="/grand-hallet" />
  <Redirect from="/moxhe/connexion/parent-eleve" to="/moxhe" />

  <Redirect from="/grand-hallet/connexion/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/connexion/prof" to="/moxhe" />

  {school === "grand-hallet" &&
    <Redirect from="/moxhe" to="/grand-hallet" />
  }

  {school === "moxhe" &&
    <Redirect from="/grand-hallet" to="/moxhe" />
  }

  <Route path="/" exact>
    <Portal />
  </Route>

  <Route path="/:school" exact>
    <Home numberofnews="3" />
  </Route>

  <Route path="/:school/actualites" exact>
      <News numberofnews="200"/>
      <Footer />
  </Route>

  <Route path="/:school/agenda">
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements">
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/espace-personnel" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-personnel/:section">
      <PersonalSpace />
  </Route>

</Switch>

  );
}


else { 
  routes = (

<Switch>

  <Route path="/" exact>
      <Portal />
  </Route>

  <Route path="/:school" exact>
    <Home numberofnews="3" />
  </Route>

  <Route path="/:school/actualites" exact>
    <News numberofnews="200"/>
    <Footer />
  </Route>

  <Route path="/:school/agenda">
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements">
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/connexion/:usertype">
      <Auth />
  </Route>

  <Route path="/:usertype/email-confirmation/:confirmationCode">
    <WelcomeUser />
  </Route>

  <Route path="/:school/info-email">
    <CheckEmail />
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
      school: school,
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
