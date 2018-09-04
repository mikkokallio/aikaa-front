import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Role from './Role';
import NewRole from "./NewRole";

class Roles extends React.Component {
    state = {json:[]};

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/roles')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

    removeRoleFromDatabase = (id, workroleid) => {
        axios.delete('/api/roles/'+id)
            .then(response => {
                this.load();
            });
    };

    render () {
        return (
            <div className="boxx">
                <h1>Roolit</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja muokata erilaisia rooleja, joita
                    käyttäjät voivat liittää profiileihinsa ja joiden avulla järjestäjät löytävät oikeat henkilöt tapahtumien kokoonpanoihin.
                </div>
                <Row>
                    {this.state.json.map((data, index) => <Role callBack={this.load} id={data.id} key={data.id} data={data} callBackRemove={this.removeRoleFromDatabase}/>)}
                    <NewRole callBack={this.load}/>
                </Row>
            </div>
        )

    }
    componentDidMount() {this.load();
    }
}

export default Roles;