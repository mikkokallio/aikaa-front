import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import './App.css';
// Layout components
import SideNav from "./layout/SideNav";
import Top from "./layout/Top";
// View components
import Main from './views/Main';
import Events from "./views/Events";
import Roles from "./views/Roles";
import Places from "./views/Places";
import Profile from "./views/Profile";
import Schedule from "./views/Schedule";
import Users from "./views/Users";

const App = appProps => (
    <Router>
        <div className="App">
            {/*<Grid>*/}
            {/*<Row>*/}
                {/*<Top/>*/}
                {/*/!*LOGO!!!*!/*/}
            {/*</Row>*/}
            <Row>
                <Col xs={2} md={2}><SideNav/></Col>
                <Col xs={10} md={10}>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route path="/events/" component={Events}/>
                        <Route path="/roles/" component={Roles}/>
                        <Route path="/places/" component={Places}/>
                        <Route path="/profile/" component={Profile}/>
                        <Route path="/schedule/" component={Schedule}/>
                        <Route path="/users/" component={Users}/>
                        <Route path="/x/" component={Profile}/>
                    </Switch>
                </Col>
            </Row>
            {/*</Grid>*/}
        </div>
    </Router>
);

export default App;
