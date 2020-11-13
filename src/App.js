import React, { useState, useReducer } from "react"
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from 'axios'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

import Header from './components/Header'
import Footer from './components/Footer';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import FlashMessages from "./components/FlashMessages";
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from "./components/CreatePost";
import ViewSinglePost from './components/ViewSinglePost';

Axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complewAppToken")),
    flashMessages: []
  }

  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }

      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path='/post/:id'>
              <ViewSinglePost />
            </Route>
            <Route path='/create-post'>
              <CreatePost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
