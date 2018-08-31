import React from 'react';
import EventListing from "./EventListing";
import axios from "axios/index";
import Event from "../event_view_cmp/Event";
import EventEdit from "../event_edit_cmp/EventEdit";
import NewEvent from "./NewEvent";

class Events extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

    return (
        <div className="boxx">
            <h1>Tapahtumat / Evenemang</h1>
            <div className="alert alert-info">
                <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja hallita tapahtumia ja niihin liittyviä
                aktiviteetteja (/tapahtumien osat).
            </div>
            <p>-Listaa filtteröidyt tapahtumat?</p>
            <table className="boxx table-striped">
                <thead>
                <tr><th>Tapahtuma</th><th>Osat</th><th>Säveltäjät</th></tr>
                </thead>
                <tbody>
            {this.state.json.map((data, index) => <EventListing {...this.props} id={this.state.json.id} key={index} data={data}/>)}
                <NewEvent callBack={this.load}/>
                </tbody>
            </table>
            {/*<Event/>*/}
        </div>
    )}

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/events')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

}

export default Events;