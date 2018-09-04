import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Role from '../roles_cmp/Role';
import user from'../user.png';

class User extends React.Component {
    state = { user: [] };

    openProfile = (evt) => {
        const url = '/profile/' + this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;

        return (
            <div className="boxx"><img src={this.props.data.picurl ? this.props.data.picurl : user} alt="Avatar" className="avatar" />
                <div style={{ display: 'inline-block', marginLeft: '1em', width: '12em' }}>{this.props.data.name}</div>
                {this.props.data.roles.map((line, index) =>
                    <Role key={index} id={line.id} data={line} />)}
                <div className="circle" onClick={this.openProfile}><span className="glyphicon glyphicon-edit"></span></div>
                <td></td>
            </div>
        )
    }
}

export default User;