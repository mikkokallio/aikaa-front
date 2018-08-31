import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Col} from 'react-bootstrap';

import axios from "axios/index";

class User extends React.Component {
    state = {redirect: false};
    poistaAfo = () => {
        axios.delete('/afos/poista/' + this.props.data.id)
            .then(res => {});
        var elem = document.getElementById(this.props.data.id);
        elem.style.textDecoration = "line-through";
    };

    handleClick = () => {
        this.setState({redirect: true});
    };

    render() {
        // Redirect needed if clicking a user opens a different view?
        if (this.state.redirect) {
            return <Redirect push to="/aforismi" data={this.props.data.quote}/>;
        }
        return (
            <Col xs={3} md={3} className="boxx"><span className="glyphicon glyphicon-user"></span>{this.props.name}</Col>
        )
    }
}

export default User;

{/*<div>*/}
{/*<dl style={{"background-color":"#EEE"}} onClick={this.handleClick} id={this.props.data.id}>*/}
{/*<dt><b>{this.props.data.quote}</b></dt>*/}
{/*<dd>{this.props.data.author}<button style={{"margin-bottom":"30px","margin-top":"0px"}} onClick={this.poistaAfo}><span className="glyphicon glyphicon-trash"*/}
{/*aria-hidden="true"></span></button></dd>*/}
{/*</dl>*/}
{/*</div>*/}