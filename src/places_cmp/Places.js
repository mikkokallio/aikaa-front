import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import Place from './Place';
import NewPlace from './NewPlace';

class Places extends React.Component {
    state = {json: []};

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/places')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

    render() {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Paikat / Platser</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella
                    järjestelmään tallennettuja tapahtumapaikkoja sekä lisätä, poistaa ja muokata niitä.
                </div>
                <p>Tähän voisi tulla vaikka karttanäkymä mukaan. Mahdollista lisätä kuva?</p>
                <p>Add, update, delete. Muuta toiminnallisuutta ei tarvita tänne.</p>
                <Row>
                    {this.state.json.map((data, index) => <Place callBack={this.load} key={index} data={data}/>)}
                    <NewPlace callBack={this.load}/>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }
}

export default Places;