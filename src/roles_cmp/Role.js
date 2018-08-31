import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

import axios from "axios/index";

class Role extends React.Component {

    remove =() => {
        //console.log("click!");
        //console.log(this.props.data.id);
        //var elem = document.getElementById(this.props.data.id);
        //elem.className += " fadeout";
        //elem.style.textDecoration = "line-through";

        axios.delete('/api/roles/' + this.props.data.id)
            .then(res => {
                this.props.callBack();
            });
        //var elem = document.getElementById(this.props.data.id);
        //elem.style.textDecoration = "line-through";

    };

    render() {

        return (
            <div className={"role role"+this.props.data.categoryId}>
                <span className="glyphicon glyphicon-tag"></span> {this.props.data.name}
                <div className="circle" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></div></div>
        )
    }
}

export default Role;


//TODO: Linkki takaisin Roles-näkymään? Vain admin?