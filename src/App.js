import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from "axios/index";

import './App.css';
// Layout components
import SideNav from "./layout_cmp/SideNav";
// View components
import Main from './main_cmp/Main';
import Events from "./events_list_cmp/Events";
import Roles from "./roles_cmp/Roles";
import Places from "./places_cmp/Places";
import Profile from "./profile_cmp/Profile";
import Schedule from "./schedule_cmp/Schedule";
import Users from "./users_cmp/Users";
import Event from "./event_view_cmp/Event";
import Works from "./works_cmp/Works";
import EditWork from "./works_cmp/EditWork";
import EditSubEvent from "./subevent_edit_cmp/EditSubEvent";
import SignIn from "./sign_in_cmp/SignIn";

axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");

class App extends Component {
    state = { mode: sessionStorage.getItem("mode") };

    handleModeChange = () => {
        this.setState({ mode: sessionStorage.getItem("mode") });
    };

    render() {
        return (
            <Router>
                <div className="App">
                    {/*<Grid>*/}
                    <Row>
                        <Col xs={2} md={2}><SideNav mode={this.state.mode} /></Col>
                        <Col xs={10} md={10}>
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route exact path="/events/" component={Events} />
                                <Route path="/events/:id" render={(props) =>
                                    (<Event {...props} />)} />
                                <Route exact path="/profile/" component={Profile} />
                                <Route path="/schedule/" component={Schedule} />
                                {(this.state.mode === 'unknown' || this.state.mode == undefined) &&
                                    <Route path="/signin/" render={(props) =>
                                        (<SignIn {...props} callBack={this.handleModeChange} />)} />
                                }
                                {(this.state.mode === 'ROLE_ADMIN' || this.state.mode === 'ROLE_SUPERADMIN')&&<div>
                                    <Route path="/profile/" component={Profile} />
                                    <Route path="/roles/" component={Roles} />
                                    <Route path="/places/" component={Places} />
                                    <Route path="/users/" component={Users} />
                                    <Route exact path="/works/" component={Works} />
                                    <Route path="/subevents/:id" render={(props) =>
                                        (<EditSubEvent {...props} />)} />
                                    <Route path="/works/:id" render={(props) =>
                                        (<EditWork {...props} />)} />
                                </div>}
                            </Switch>
                        </Col>
                    </Row>
                    {/*</Grid>*/}
                </div>
            </Router>
        )
    }
}

export default App;