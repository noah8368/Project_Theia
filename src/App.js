import React from 'react';
import "./App.css";

import {Route, Switch,  BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


//pages
import LoginPage from "./pages/index.js"
import NotFoundPage from "./pages/404"
import Home from './pages/Home.js';
import RegisterPage from "./pages/register.js"

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Route exact path="/Home" component={Home}/>
                    <Redirect to = "/404"/>
                </Switch>
            </Router>
        );
    }
};

export default App;