import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import AdminLogin from './components/layout/AdminLogin';
import FrontPage from './components/views/FrontPage';
import Players from './components/views/Players';
import AddPlayer from './components/forms/AddPlayer';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={FrontPage} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/adminLogin' component={AdminLogin} />
              <Route exact path='/players' component={Players} />
              <PrivateRoute exact path='/addPlayer' component={AddPlayer} />
              {/* <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} /> */}
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
