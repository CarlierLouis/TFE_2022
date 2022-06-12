import React, { useState, useCallback, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './common/navigation/MainNavigation';
import Home from './showcase/Home';
import Portal from './portal/Portal';
import Footer from './showcase/Footer';
import Auth from './user/Auth';
import { AuthContext } from './common/context/auth-context';
import News from './showcase/News';
import AddNews from './admin/News/AddNews';
import UpdateNews from './admin//News/UpdateNews';
import WelcomeTeacher from './email-confirmation/WelcomeTeacher';
import WelcomeStudent from './email-confirmation/WelcomeStudent';
import CheckEmail from './email-confirmation/CheckEmail';
import Users from './admin/Users/Users';
import UpdateUser from './admin/Users/UpdateUser';
import AddUser from './admin/Users/AddUser';
import AddExcel from './admin/Users/Excel/AddExcel';

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
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 1hour
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
  
  <Redirect from="/grand-hallet/login/prof" to="/grand-hallet" />
  <Redirect from="/moxhe/login/prof" to="/moxhe" />

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

  <Route path="/:school/actu" exact>
      <News numberofnews="200"/>
      <Footer />
  </Route>
  
  <Route path="/:school/admin/add-news">
      <AddNews />
  </Route>

  <Route path="/:school/admin/update-news/:newsId">
    <UpdateNews school="grand-hallet" />
  </Route>

  <Route path="/:school/admin/utilisateurs" exact>
    <Users school="grand-hallet"/>
  </Route>

  <Route path="/:school/admin/utilisateurs/:usertype">
    <Users school="grand-hallet"/>
  </Route>

  <Route path="/:school/admin/update-user/:usertype/:userId">
    <UpdateUser school="grand-hallet" />
  </Route>

  <Route path="/:school/admin/add-user/:usertype">
    <AddUser school=":school" />
  </Route>

  <Route path="/:school/admin/add-excel/trusted-students">
    <AddExcel school="grand-hallet" />
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

  <Route path="/:school/actu" exact>
    <News numberofnews="200"/>
    <Footer />
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

  <Route path="/:school/actu" exact>
      <News numberofnews="200"/>
      <Footer />
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

  <Route path="/:school/actu" exact>
    <News numberofnews="200"/>
    <Footer  />
  </Route>

  <Route path="/:school/login/:usertype">
      <Auth />
  </Route>

  <Route path="/teachers/email-confirmation/:confirmationCode">
    <WelcomeTeacher />
  </Route>

  <Route path="/students/email-confirmation/:confirmationCode">
    <WelcomeStudent />
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
