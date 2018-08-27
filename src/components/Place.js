import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

import axios from "axios/index";

class Place extends React.Component {
    //state = {redirect: false};
    poistaAfo = () => {
        axios.delete('/afos/poista/' + this.props.data.id)
            .then(res => {});
        var elem = document.getElementById(this.props.data.id);
        elem.style.textDecoration = "line-through";
    };

    remove =() => {
        console.log("click!");
        console.log(this.props.id);
        //document.getElementById()
        var elem = document.getElementById(this.props.id);
        elem.className += " fadeout";
        //elem.style.textDecoration = "line-through";
    };


    handleClick = () => {
        //this.setState({redirect: true});
    };

    render() {
        // Redirect needed if clicking a user opens a different view?
        // if (this.state.redirect) {
        //     return <Redirect push to="/aforismi" data={this.props.data.quote}/>;
        // }
        return (
            <Col xs={2} md={2} className="boxx alert alert-success role" id={this.props.id}>
                <span className="glyphicon glyphicon-tag"></span> {this.props.name}
                <div className="circle" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></div></Col>
        )
    }
}

export default Place;


//TODO: Linkki takaisin Roles-näkymään? Vain admin?