import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import User from "../components/User";

class Schedule extends React.Component {
    state = {json: []};

    render() {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Käyttäjät / Användare</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit hallinnoida
                    järjestelmän käyttäjiä.
                </div>
                <p>Listaa, filtteröi, poista, muokkaa.</p>
                <p>Täältä linkki jokaisesta profiili-kortista itse profiiliin, joka vastaa Profile-palikkaa.</p>
                <Row>
                    <User name="Testi"/>
                    <User name="Jorma"/>
                    <User name="Liisa"/>
                    <User name="Janne"/>
                    <User name="Teuvo"/>

                    {this.state.json.map((line, index) =>
                        <User key={index} data={line}/>)}
                </Row>
            </div>
        )

    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get('/afos')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Schedule;