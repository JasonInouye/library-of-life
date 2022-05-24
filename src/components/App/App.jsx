import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../_customTheme/theme";

import {
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import './App.css';


import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SearchResults from '../SearchResults/SearchResults';
import VideoWatchPage from '../VideoWatchPage/VideoWatchPage';
import ManageLibrary from '../ManageLibrary/ManageLibrary';
import VideoUploadPage from '../VideoUploadPage/VideoUploadPage';


import './App.css';



function App() {

  const dispatch = useDispatch();
  const location = useLocation();


  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_USER' });
  }, [dispatch]);

  return (

    <ThemeProvider theme={customTheme}>

      
        {/* List of page/pages on which Nav will NOT render */}
        {location.pathname ===

          '/videoWatchPage'

          ?
          null
          : <Nav />
        }
        {/* end conditional render info for Nav */}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user/:userInParams/:view"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/search-results"
          >
            <SearchResults />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to={`/user/${user.id}/videos`} />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to={`/user/${user.id}/videos`} />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route

            exact
            path="/videoUploadPage"
          >
            <VideoUploadPage />
          </Route>

          <Route

            exact
            path="/videoWatchPage"
          >
            <VideoWatchPage />
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to={`/user/${user.id}/videos`} />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/manageLibrary"
          >
            <ManageLibrary />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />

    </ThemeProvider>
  );
}

export default App;
