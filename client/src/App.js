import React, { useState, useCallback, useEffect, Suspense} from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './common/context/auth-context';

import Error404Page from './common/UIElements/Error404Page';
import ScrollToTop from './common/navigation/ScrollToTop';
import LoadingSpinner from './common/UIElements/LoadingSpinner';

import './App.css';

//import Home from './showcase/Home';
//import Portal from './portal/Portal';
//import Footer from './showcase/Footer';
//import Auth from './user/Auth';
//import News from './showcase/News';
//import AddNews from './admin/News/AddNews';
//import UpdateNews from './admin//News/UpdateNews';
//import WelcomeUser from './email-confirmation/WelcomeUser';
//import CheckEmail from './email-confirmation/CheckEmail';
//import Users from './admin/Users/Users';
//import UpdateUser from './admin/Users/UpdateUser';
//import AddUser from './admin/Users/AddUser';
//import AddExcel from './admin/Users/Excel/AddExcel';
//import PersonalSpace from './user/PersonalSpace';
//import GlobalCalendar from './showcase/GlobalCalendar';
//import AddEvent from './admin/GlobalCalendar/AddEvent';
//import UpdateEvent from './admin/GlobalCalendar/UpdateEvent';
//import ProjectsAndRegulations from './showcase/ProjectsAndRegulations';
//import AddTargetedEvent from './teachers/PersonnalCalendar/AddTargetedEvent';
//import UpdateTargetedEvent from './teachers/PersonnalCalendar/UpdateTargetedEvent';
//import AddDocument from './teachers/Documents/AddDocument';
//import UpdateDocument from './teachers/Documents/UpdateDocument';
//import AddOuting from './teachers/SchoolOutings/AddOuting';
//import UpdateOuting from './teachers/SchoolOutings/UpdateOuting';
//import AddAnnouncement from './teachers/Announcements/AddAnnouncement';
//import UpdateAnnouncement from './teachers/Announcements/UpdateAnnouncement';

const Home = React.lazy(() => import('./showcase/Home'));
const Portal = React.lazy(() => import('./portal/Portal'));
const Footer = React.lazy(() => import('./showcase/Footer'));
const Auth = React.lazy(() => import('./user/Auth'));
const News = React.lazy(() => import('./showcase/News'));
const AddNews = React.lazy(() => import('./admin/News/AddNews'));
const UpdateNews = React.lazy(() => import('./admin//News/UpdateNews'));
const WelcomeUser = React.lazy(() => import('./email-confirmation/WelcomeUser'));
const CheckEmail = React.lazy(() => import('./email-confirmation/CheckEmail'));
const Users = React.lazy(() => import('./admin/Users/Users'));
const UpdateUser = React.lazy(() => import('./admin/Users/UpdateUser'));
const AddUser = React.lazy(() => import('./admin/Users/AddUser'));
const AddExcel = React.lazy(() => import('./admin/Users/Excel/AddExcel'));
const PersonalSpace = React.lazy(() => import('./user/PersonalSpace'));
const GlobalCalendar = React.lazy(() => import('./showcase/GlobalCalendar'));
const AddEvent = React.lazy(() => import('./admin/GlobalCalendar/AddEvent'));
const UpdateEvent = React.lazy(() => import('./admin/GlobalCalendar/UpdateEvent'));
const ProjectsAndRegulations = React.lazy(() => import('./showcase/ProjectsAndRegulations'));
const AddTargetedEvent = React.lazy(() => import('./teachers/PersonnalCalendar/AddTargetedEvent'));
const UpdateTargetedEvent = React.lazy(() => import('./teachers/PersonnalCalendar/UpdateTargetedEvent'));
const AddDocument = React.lazy(() => import('./teachers/Documents/AddDocument'));
const UpdateDocument = React.lazy(() => import('./teachers/Documents/UpdateDocument'));
const AddOuting = React.lazy(() => import('./teachers/SchoolOutings/AddOuting'));
const UpdateOuting = React.lazy(() => import('./teachers/SchoolOutings/UpdateOuting'));
const AddAnnouncement = React.lazy(() => import('./teachers/Announcements/AddAnnouncement'));
const UpdateAnnouncement = React.lazy(() => import('./teachers/Announcements/UpdateAnnouncement'));


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

  <Route path="/:school/agenda" exact>
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/agenda/admin/ajouter-evenement-calendrier" exact>
    <AddEvent />
  </Route>

  <Route path="/:school/agenda/admin/maj-evenement-calendrier/:eventId" exact>
    <UpdateEvent />
  </Route>

  <Route path="/:school/projets-et-reglements" exact>
    <ProjectsAndRegulations />
    <Footer />
  </Route>
  
  <Route path="/:school/actualites/admin/ajouter-actualite" exact>
      <AddNews />
  </Route>

  <Route path="/:school/actualites/admin/maj-actualite/:newsId" exact>
    <UpdateNews />
  </Route>

  <Route path="/:school/admin/utilisateurs" exact>
    <Users />
  </Route>

  <Route path="/:school/admin/utilisateurs/:usertype" exact>
    <Users />
  </Route>

  <Route path="/:school/admin/utilisateurs/ajouter-utilisateur/:usertype" exact>
    <AddUser />
  </Route>

  <Route path="/:school/admin/utilisateurs/maj-utilisateur/:usertype/:userId" exact>
    <UpdateUser />
  </Route>

  <Route path="/:school/admin/utilisateurs/ajouter-excel/white-list-eleves" exact>
    <AddExcel />
  </Route>

  <Route path="/:school/espace-prof" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/:section" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/horaires/:classname/ajouter-evenement-calendrier" exact>
    <AddTargetedEvent />
  </Route>

  <Route path="/:school/espace-prof/horaires/maj-evenement-calendrier/:eventId" exact>
    <UpdateTargetedEvent />
  </Route>

  <Route path="/:school/espace-prof/documents/:classname/ajouter-document" exact>
    <AddDocument />
  </Route>

  <Route path="/:school/espace-prof/documents/maj-document/:documentId" exact>
    <UpdateDocument />
  </Route>

  <Route path="/:school/espace-prof/sorties-scolaires/:classname/ajouter-sortie-scolaire" exact>
    <AddOuting />
  </Route>

  <Route path="/:school/espace-prof/sorties-scolaires/maj-sortie-scolaire/:outingId" exact>
    <UpdateOuting />
  </Route>

  <Route path="/:school/espace-prof/annonces/:classname/ajouter-annonce" exact>
    <AddAnnouncement />
  </Route>

  <Route path="/:school/espace-prof/annonces/maj-annonce/:announcementId" exact>
    <UpdateAnnouncement />
  </Route>
  
  <Route path='*' component={Error404Page}/>

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

  <Route path="/:school/agenda" exact>
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements" exact>
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/espace-prof" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/:section" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-prof/horaires/:classname/ajouter-evenement-calendrier" exact>
    <AddTargetedEvent />
  </Route>

  <Route path="/:school/espace-prof/horaires/maj-evenement-calendrier/:eventId" exact>
    <UpdateTargetedEvent />
  </Route>

  <Route path="/:school/espace-prof/documents/:classname/ajouter-document" exact>
    <AddDocument />
  </Route>

  <Route path="/:school/espace-prof/documents/maj-document/:documentId" exact>
    <UpdateDocument />
  </Route>

  
  <Route path="/:school/espace-prof/sorties-scolaires/:classname/ajouter-sortie-scolaire" exact>
    <AddOuting />
  </Route>

  <Route path="/:school/espace-prof/sorties-scolaires/maj-sortie-scolaire/:outingId" exact>
    <UpdateOuting />
  </Route>

  <Route path="/:school/espace-prof/annonces/:classname/ajouter-annonce" exact>
    <AddAnnouncement />
  </Route>

  <Route path="/:school/espace-prof/annonces/maj-annonce/:announcementId" exact>
    <UpdateAnnouncement />
  </Route>

  <Route path='*' component={Error404Page}/>

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

  <Route path="/:school/agenda" exact>
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements" exact>
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/espace-personnel" exact>
      <PersonalSpace />
  </Route>

  <Route path="/:school/espace-personnel/:section" exact>
      <PersonalSpace />
  </Route>

  <Route path='*' component={Error404Page}/>

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

  <Route path="/:school/agenda" exact>
    <GlobalCalendar />
    <Footer />
  </Route>

  <Route path="/:school/projets-et-reglements" exact>
    <ProjectsAndRegulations />
    <Footer />
  </Route>

  <Route path="/:school/connexion/:usertype" exact>
      <Auth />
  </Route>

  <Route path="/:usertype/email-confirmation/:confirmationCode" exact>
    <WelcomeUser />
  </Route>

  <Route path="/:school/info-email" exact>
    <CheckEmail />
  </Route>

  <Route path='*' component={Error404Page}/>

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
      <ScrollToTop />
      <main>
      <Suspense fallback=
      {<div className='center'><LoadingSpinner />
      </div>}>
      {routes}
      </Suspense>
      </main>
    </Router>
  </AuthContext.Provider>

  );
};

export default App;
