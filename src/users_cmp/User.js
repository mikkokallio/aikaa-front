import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Role from '../roles_cmp/Role';

import axios from "axios/index";

class User extends React.Component {
    state = {user:[]};
    // poistaAfo = () => {
    //     axios.delete('/afos/poista/' + this.props.data.id)
    //         .then(res => {});
    //     var elem = document.getElementById(this.props.data.id);
    //     elem.style.textDecoration = "line-through";
    // };

    render() {
        return (
            <div className="boxx"><img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" className="avatar"/>
                <div style={{display:'inline-block', marginLeft:'1em', width:'12em'}}>{this.props.data.name}</div>
                {this.props.data.roles.map((line, index) =>
                    <Role key={index} data={line}/>)}
            </div>
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