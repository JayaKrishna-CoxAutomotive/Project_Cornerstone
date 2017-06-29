import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'
import Home from './common/home.component.jsx'
import About from './common/about.component.jsx'
import Car from './car/car.component.jsx'
import register from './common/register.jsx'
import Login from './common//Login.jsx'

//import CarDetail from './car/car-detail.component.jsx'


render(
    <Router history={browserHistory}>
        <Route component={Main}>
            <Route path="/register" component={register}/>
            <Route path="/" component={Home}/>
            <Route path="/cars" component={Car} />
            <Route path="/about" component={About}/>
            <Route path="/Login" component={Login}/>
            
             
        </Route>
    </Router>,
    document.getElementById('container')
);
