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
        return (
            <div className="boxx">
                <h1>Paikat</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella
                    järjestelmään tallennettuja tapahtumapaikkoja sekä lisätä, poistaa ja muokata niitä.
                </div>
                <Row>
                    {this.state.json.map((data, index) => data.id!=999999999&&<Place callBack={this.load} key={index} data={data}/>)}
                </Row>
                <Row>
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