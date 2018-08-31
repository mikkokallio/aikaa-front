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

        axios.post('/signin', { username: this.state.username, password: this.state.password })
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data);
                console.log(localStorage.getItem("token"));
                var decoded = jwt.decode(res.data, { complete: true });
                console.log(decoded.payload.auth);
            });
    };
    handleNameChange = (event) => {
        this.setState({ username: event.target.value });
    };
    handlePswChange= (event) => {
        this.setState({password: event.target.value});
    };

    render() {
        return (
            <div className="boxx">
                <h1>Sisäänkirjautuminen / Inloggning</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Syötä alle käyttäjätunnuksesi (muotoa?) ja salasanasi kirjautuaksesi
                    sisään.
                </div>
                <p>Formi antaa palautetta virheellisestä syötteestä?</p>
                <Row>
                    <Col xs={2} md={2}>Nimi</Col>
                    <Col xs={2} md={2}><input type="text" value={this.state.username} onChange={this.handleNameChange}/></Col>
                </Row>
                <Row>
                    <Col xs={2} md={2}>Salasana</Col>
                    <Col xs={2} md={2}><input type="password" value={this.state.password} onChange={this.handlePswChange}/></Col>
                </Row>
                <Row>
                    <Col xs={2} md={2}><input className="btn btn-primary" type="submit"
                        value="Kirjaudu Sisään" onClick={this.handleCreateClick} /></Col>
                </Row>
            </div>
        )
    }
}

export default SignIn;