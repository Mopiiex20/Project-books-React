import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';

import { Provider } from 'react-redux';
import { Store } from 'redux';

import Home from "./components/Home";
import Login from "./containers/LoginContainer";
import Header from "./containers/HederContainer";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import Admin from "./containers/AdminContainer"
import Profile from './components/ProfileComponent'

import configureStore from "./redux/store";
import { RootState } from "./redux/rootReduser";
import NavBar from './components/Material/Layout/NavBar';
import { AppBar } from '@material-ui/core';
import BookInfo from './components/Material/BookInfo';

const store: Store<RootState> = configureStore();

export const Path = {
  root: "/",
  login: "/login",
  register: "/register",
  admin: "/admin",
  about: "/about",
  profile: "/profile",
  bookInfo : "/bookInfo"
};

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <AppBar
          position='sticky'
        >
          <Header />
          <NavBar />
        </AppBar>
        <main>
          <Route exact path={Path.root} component={Home} />
          <Route path={Path.register} component={Register} />
          <Route path={Path.login} component={Login} />
          <Route path={Path.about} component={AboutUs} />
          <Route path={Path.admin} component={Admin} />
          <Route path={Path.profile} component={Profile} />
          <Route path={Path.bookInfo} component={BookInfo} />
        </main>


      </Router>
    </Provider>
  )
}

