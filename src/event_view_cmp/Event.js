import React, {Component} from 'react';
import Work from '../works_cmp/Work';
import SubEvent from './SubEvent';
import axios from "axios/index";
import NewSubEvent from "./NewSubEvent";
import WorksList from "../works_cmp/WorksList";

class Event extends React.Component {
    state = { json: {subEvents:[],works:[]} };

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api'+this.props.location.pathname)
            .then(response => {
                const json = response.data;
                for (var i = 0; i < json.subEvents.length; i++) {
                    json.subEvents[i].begin =json.subEvents[i].begin.replace("T"," ");
                    json.subEvents[i].ending =json.subEvents[i].ending.replace("T"," ");
                }
                this.setState({json});
            });
    };

    render() {
        return (
            <div className="boxx">
                <h1>Tapahtuma: {this.state.json.name}</h1>
                <table className="boxx table-striped">
                    <thead>
                    <tr><th>Tapahtuma</th><th>Tyyppi</th><th>Alkaa</th><th>Päättyy</th><th>Sijainti</th><th/></tr>
                    </thead>
                    <tbody>
                    {this.state.json.subEvents.map((data, index) => <SubEvent {...this.props} key={index} data={data}/>)}
                    <NewSubEvent eventid={this.state.json.id} event={this.state.json.id} callBack={this.load}/>
                    </tbody>
                </table>
                <WorksList {...this.props} data={this.state.json.works} eventid={this.state.json.id} callBack={this.load}/>
            </div>
        )
    }
}

export default Event;

// {id: 1, name: "Konsertti1", subEvents: Array(9), works: Array(7)}
// id
// :
// 1
// name
// :
// "Konsertti1"
// subEvents
// :
// Array(9)
// 0: {id: 2, name: "konsertti 1", type: "konsertti", begin: "2019-07-06T19:00:00", ending: "2019-07-06T21:00:00", …}
// 1
// :
// {id: 6, name: "saliharjoitus", type: "harjoitus", begin: "2019-07-06T17:15:00", ending: "2019-07-06T18:00:00", …}
// 2
// :
// {id: 7, name: "saliharjoitus", type: "harjoitus", begin: "2019-07-06T15:00:00", ending: "2019-07-06T15:30:00", …}
// 3
// :
// {id: 8, name: "harjoitus", type: "harjoitus", begin: "2019-07-07T10:00:00", ending: "2019-07-07T13:00:00", …}
// 4
// :
// {id: 9, name: "harjoitus", type: "harjoitus", begin: "2019-07-03T10:00:00", ending: null, …}
// 5
// :
// {id: 10, name: "testi", type: "testi", begin: "2019-09-09T15:00:00", ending: "2019-09-09T16:00:00", …}
// 6
// :
// {id: 3, name: "harjoitus", type: "harjoitus", begin: "2019-07-05T11:00:00", ending: "2019-07-05T13:00:00", …}
// 7
// :
// {id: 1, name: "saliharjoitus", type: "harjoitus", begin: "2019-07-06T15:30:00", ending: "2019-07-06T17:15:00", …}
// 8
// :
// {id: 5, name: "harjoitus", type: "harjoitus", begin: "2019-07-05T13:00:00", ending: "2019-07-05T15:00:00", …}
// length
// :
// 9
// __proto__
// :
// Array(0)
// works
// :
// (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// __proto__
// :
// Object