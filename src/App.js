import React, { useState } from "react"
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from 'axios'

import ExampleContext from './ExampleContext'

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
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complewAppToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
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
    </ExampleContext.Provider>
  );
}

export default App;
