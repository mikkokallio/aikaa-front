import React, {Component} from 'react';
import Work from './Work';
import SubEvent from './SubEvent';
import axios from "axios/index";
import NewSubEvent from "./NewSubEvent";

class Event extends React.Component {
    state = { json: {subEvents:[],works:[]} };

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/events/1')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

    render() {
        return (
            <div>
                <h1>{this.state.json.name} (id:{this.state.json.id})</h1>
                <table className="boxx">
                    <tr><td>Tapahtuma</td><td>Tyyppi</td><td>Alkaa</td><td>Päättyy</td><td>Sijainti</td></tr>
                    {this.state.json.subEvents.map((data, index) => <SubEvent key={index} data={data}/>)}
                    <NewSubEvent callBack={this.load}/>
                </table>
                <table className="boxx">
                    <tr><td>Teos</td><td>Säveltäjä</td><td>Kesto</td><td>Muusikot</td><td>Instrumentaatio</td></tr>
                    {this.state.json.works.map((data, index) => <Work key={index} data={data}/>)}
                </table>
            </div>
        )
    }
}

export default Event;

//
//     render() {
//                 {maa ?
//                     <ListGroup>
//                         <ListGroupItem>Nimi: {maa.name}</ListGroupItem>
//                         <ListGroupItem>Paikallinen nimi: {maa.localName||'-'}</ListGroupItem>
//                         <ListGroupItem>Maanosa: {maa.continent}</ListGroupItem>
//                         <ListGroupItem>Pääkaupunki: {maa.capital ? maa.capital.name : '-'}</ListGroupItem>
//                         <ListGroupItem>Asukasluku: {maa.population}</ListGroupItem>
//                         <ListGroupItem>Päämies: {maa.headOfState}</ListGroupItem>
//                     </ListGroup>
//                     :
//                     <p>Haetaan dataa</p>
//                 }
//             </div>
//         );
//     }
// }