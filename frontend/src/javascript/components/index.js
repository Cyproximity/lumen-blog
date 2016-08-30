import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from './home/home';
import About from './about/about';

const _Core = document.getElementById('core');

ReactDom.render((
  <Router history={hashHistory}>
    <Route path="/" component = { Home }/>
    <Route path="/home" component = { Home }/>
    <Route path="/about" component = { About }/>
  </Router>
), _Core)
