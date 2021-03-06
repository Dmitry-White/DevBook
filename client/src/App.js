import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/createProfile/CreateProfile';
import EditProfile from './components/editProfile/EditProfile';
import AddExperience from './components/addCredentials/AddExperience';
import AddEducation from './components/addCredentials/AddEducation';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import NotFound from './components/notFound/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path='/' exact component={Landing} />
            <div className='container'>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <Route path='/profiles' exact component={Profiles} />
              <Route path='/profile/:handle' exact component={Profile} />
              <Switch>
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/create-profile' exact component={CreateProfile} />
                <PrivateRoute path='/edit-profile' exact component={EditProfile} />
                <PrivateRoute path='/add-experience' exact component={AddExperience} />
                <PrivateRoute path='/add-education' exact component={AddEducation} />
                <PrivateRoute path='/feed' exact component={Posts} />
                <PrivateRoute path='/post/:id' exact component={Post} />
              </Switch>
              <Route path='/not-found' exact component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
