import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Preloader from './pages/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import MyWorks from './pages/MyWorks';
import Contact from './pages/Contact';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="app__page-container">
        <Switch>
          <Route exact path="/" 
            render={() => (
              <Preloader key="home">
                <Home />
              </Preloader>
            )}
          />
          <Route path="/about"
            render={() => (
              <Preloader key="about">
                <About />
              </Preloader>
            )}
          />
          <Route path="/skills"
            render={() => (
              <Preloader key="skills">
                <Skills />
              </Preloader>
            )}
          />
          <Route path="/myworks"
            render={() => (
              <Preloader key="myworks">
                <MyWorks />
              </Preloader>
            )}
          />
          <Route path="/contact"
            render={() => (
              <Preloader key="contact">
                <Contact />
              </Preloader>
            )}
          />
          <Route
            render={() => (
              <Preloader key="nomatch">
                <NoMatch />
              </Preloader>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;