import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import Role from '../components/Role';

class Roles extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Roolit / Roller</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja muokata erilaisia rooleja, joita
                    käyttäjät voivat liittää profiileihinsa ja joiden avulla järjestäjät löytävät oikeat henkilöt tapahtumien kokoonpanoihin.
                    (tämä div näyttää käytönaikaisia ohjeita: Kuvailee mitä roolit on jne. Käyttäjän profiilissa on täppä
                    jolla nämä saa piiloon.)
                </div>
                <p>Tarviiko rooleilla olla kuvaukset? Tai mahdollisuus liittää kuvia? Mikrofoni, saksofoni.</p>
                <p>Add, update, delete. Muuta toiminnallisuutta ei tarvita tänne.</p>
                <p>Rooleja voi poistaa helposti, mutta pitää olla varmistusdialogi.</p>
                <Row>
                    {this.state.json.map((data, index) => <Role key={index} data={data}/>)}
                </Row>
            </div>
        )

    }
    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/api/roles')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Roles;