import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import './App.css';
// Layout components
import SideNav from "./layout/SideNav";
// View components
import Main from './main_cmp/Main';
import Events from "./events_cmp/Events";
import Roles from "./roles_cmp/Roles";
import Places from "./places_cmp/Places";
import Profile from "./views/Profile";
import Schedule from "./schedule_cmp/Schedule";
import Users from "./views/Users";
import EventListing from "./events_cmp/EventListing";

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
                        <Route path="/event/" component={EventListing}/>
                    </Switch>
                </Col>
            </Row>
            {/*</Grid>*/}
        </div>
    </Router>
);

export default App;
