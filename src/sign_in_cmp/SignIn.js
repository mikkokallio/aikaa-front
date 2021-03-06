import React from 'react';
import axios from "axios/index";
import Role from '../roles_cmp/Role';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import jwt from 'jsonwebtoken';

class SignIn extends React.Component {
    state = { username: '', password: [] };

    handleCreateClick = (event) => {
        //event.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.setItem("mode", "unknown");
        axios.post('/signin', { username: this.state.username, password: this.state.password })
            .then(res => {
                let token = res.data;
                sessionStorage.setItem("token", "Bearer " + token);
                var decoded = jwt.decode(res.data, { complete: true });
                sessionStorage.setItem("mode", decoded.payload.auth[0].authority);
                sessionStorage.setItem("id", decoded.payload.id);
            })
            .then(res => {
                this.props.callBack();
                this.loadHomePage();
            });
    };

    handleNameChange = (event) => {
        this.setState({ username: event.target.value });
    };
    handlePswdChange = (event) => {
        this.setState({ password: event.target.value });
    };
    handleKeyPress = (event) => {
        if (event.key==="Enter") {
            this.handleCreateClick(event);
        }
    };

    loadHomePage = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="boxx" onKeyPress={this.handleKeyPress}>
                <h1>Sisäänkirjautuminen</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Syötä alle käyttäjätunnuksesi ja salasanasi kirjautuaksesi
                    sisään.
                </div>
                <table className="boxx table-striped">
                    <thead>
                    <tr>
                        <th colSpan={2}><span className="glyphicon glyphicon-user"></span><span> </span>
                            Sisäänkirjautumistiedot
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Nimi</td>
                        <td><input type="text" placeholder="nimi" value={this.state.username} onChange={this.handleNameChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Salasana</td>
                        <td><input type="password" placeholder="salasana" value={this.state.password} onChange={this.handlePswdChange} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><input className="btn btn-primary" type="submit"
                                   value="Kirjaudu sisään" onClick={this.handleCreateClick} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}

export default SignIn;