import React, { Component } from 'react';
import Work from '../works_cmp/Work';
import SubEvent from './SubEvent';
import axios from "axios/index";
import NewSubEvent from "./NewSubEvent";
import WorksList from "../works_cmp/WorksList";

class Event extends React.Component {
    state = { json: { subEvents: [], works: [] } };

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                for (var i = 0; i < json.subEvents.length; i++) {
                    json.subEvents[i].begin = this.stringManipulation(json.subEvents[i].begin);
                    if (json.subEvents[i].ending) json.subEvents[i].ending = this.stringManipulation(json.subEvents[i].ending);
                }
                this.setState({ json });
            });
    };

    stringManipulation = (input) => {
        var str = input.split(/[-T:]/);
        var timeStamp = str[2] + "." + str[1] + "." + str[0] + ", klo " + str[3] + ":" + str[4];
        return timeStamp;
    };

    render() {
        return (
            <div className="boxx">
                <h1>Tapahtuma: {this.state.json.name}</h1>
                <table className="boxx table-striped">
                    <thead>
                        <tr><th>Tapahtuma</th><th>Tyyppi</th><th>Alkaa</th><th>Päättyy</th><th>Sijainti</th><th /></tr>
                    </thead>
                    <tbody>
                        {this.state.json.subEvents.map((data, index) => <SubEvent {...this.props} key={index} data={data} />)}
                        {(sessionStorage.getItem("mode") === 'ROLE_ADMIN' || sessionStorage.getItem("mode") === 'ROLE_SUPERADMIN')
                            &&<NewSubEvent eventid={this.state.json.id} event={this.state.json.id} callBack={this.load} />}
                    </tbody>
                </table>
                    <WorksList {...this.props} data={this.state.json.works} eventid={this.state.json.id} callBack={this.load} />
            </div>
                )
            }
        }
        
export default Event;