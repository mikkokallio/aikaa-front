import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Role from '../components/Role';

class Profile extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Profiili / Profil</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja muokata käyttäjäprofiilisi
                    tietoja, mukaanlukien roolejasi, joiden avulla järjestäjät voivat sijoittaa sinut kokoonpanoihin. Voit myös hallinnoida asetuksia
                    kuten että näetkö eri näkymissä tällaisia info-bokseja.
                </div>
                <Row>
                    <Col xs={2} md={2}>Etunimi</Col>
                    <Col xs={2} md={2}><input type="text"/></Col>
                    <Col xs={2} md={2}>Sukunimi</Col>
                    <Col xs={2} md={2}><input type="text"/></Col>
                </Row>
                <Row>
                    <Col xs={2} md={2}>Osoite</Col>
                    <Col xs={2} md={2}><input type="text"/></Col>
                    <Col xs={2} md={2}>Puhelinnumero</Col>
                    <Col xs={2} md={2}><input type="text"/></Col>
                </Row>
                Roolit: Tänne + nappi ja "tägi-pilvi"
                <Row>
                    <Role id="1" name="laulu (baritoni)"/>
                    <Role id="2" name="kitara"/>
                    {this.state.json.map((line, index) =>
                        <Role key={index} data={line}/>)}
                </Row>
                <Row>
                <Col xs={2} md={2}><input className="btn btn-primary" type="submit" value="Talleta Muutokset"/></Col>
                <Col xs={2} md={2}><input className="btn btn-warning" type="submit" value="Peru Muutokset"/></Col>
            </Row>
            </div>
        )

    }
    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/afos')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Profile;