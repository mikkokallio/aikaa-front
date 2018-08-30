import React, {Component} from 'react';
import Work from './Work';
import SubEvent from './SubEvent';
import axios from "axios/index";

class EventEdit extends React.Component {
    state = { json: {subEvents:[],works:[]} };
    //state = { }

    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/api/events/1')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.json.name} (id:{this.state.json.id})</h1>
                <table className="boxx">
                    <tr><td>Tapahtuma</td><td>Tyyppi</td><td>Alkaa</td><td>Päättyy</td><td>Sijainti</td></tr>
                    {this.state.json.subEvents.map((data, index) => <SubEvent key={index} data={data}/>)}
                </table>
                <table className="boxx">
                    <tr><td>Teos</td><td>Säveltäjä</td><td>Kesto</td><td>Muusikot</td><td>Instrumentaatio</td></tr>
                    {this.state.json.works.map((data, index) => <Work key={index} data={data}/>)}
                </table>
            </div>
        )
    }
}

export default EventEdit;