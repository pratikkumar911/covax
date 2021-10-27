import React from 'react';
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import './App.css';

const App = () => {
  return (
    <Router>
        <Header/>
        <Switch>
          <Route path ='/' exact={true} component={Intro}/>
          <Route path='/vaccines' exact={true} component={Home}/>
        </Switch>
    </Router>
  );
}

export default App;