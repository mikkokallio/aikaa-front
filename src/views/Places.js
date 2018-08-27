import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import Place from '../components/Place';

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
                    <Place id="1" name="Musapaikka"/>
                    <Place id="2" name="mezzosopraano"/>
                    <Place id="3" name="alttoviulu"/>
                    <Place id="4" name="sello"/>
                    {this.state.json.map((line, index) =>
                        <Place key={index} data={line}/>)}
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