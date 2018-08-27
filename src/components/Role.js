import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

import axios from "axios/index";

class Role extends React.Component {
    //state = {redirect: false};
    poistaAfo = () => {
        axios.delete('/api/xx/' + this.props.data.id)
            .then(res => {});
        var elem = document.getElementById(this.props.data.id);
        elem.style.textDecoration = "line-through";
    };

    remove =() => {
        //console.log("click!");
        //console.log(this.props.data.id);
        var elem = document.getElementById(this.props.data.id);
        elem.className += " fadeout";
        //elem.style.textDecoration = "line-through";
    };

    handleClick = () => {
        //this.setState({redirect: true});
    };

    render() {

        return (
            <Col xs={2} md={2} className={"boxx alert alert-success role role"+this.props.data.categoryId}>
                <span className="glyphicon glyphicon-tag"></span> {this.props.data.name} {this.props.data.categoryId}
                <div className="circle" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></div></Col>
        )
    }
}

export default Role;


//TODO: Linkki takaisin Roles-näkymään? Vain admin?