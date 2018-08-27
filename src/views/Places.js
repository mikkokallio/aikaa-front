import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import Role from '../components/Role';

class Places extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Paikat / Platser</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella järjestelmään tallennettuja tapahtumapaikkoja sekä lisätä, poistaa ja muokata niitä.
                </div>
                <p>List all them places! Ne voisi generoitua "laattoina" tai riveinä ja tähän voisi tulla vaikka karttanäkymä mukaan. Mahdollista lisätä kuva?</p>
                <p>Add, update, delete. Muuta toiminnallisuutta ei tarvita tänne.</p>
                <Row>
                    <Role id="1" name="Musapaikka"/>
                    <Role id="2" name="mezzosopraano"/>
                    <Role id="3" name="alttoviulu"/>
                    <Role id="4" name="sello"/>
                    {this.state.json.map((line, index) =>
                        <Role key={index} data={line}/>)}
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

export default Places;