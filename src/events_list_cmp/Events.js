import React from 'react';
import EventListing from "./EventListing";
import axios from "axios/index";
import Event from "../event_view_cmp/Event";
import EventEdit from "../event_edit_cmp/EventEdit";
import NewEvent from "./NewEvent";

class Events extends React.Component {
    state = { json: [] };
    render() {
        return (
            <div className="boxx">
                <h1>Tapahtumat</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä näet listauksen tapahtumista ja siirtyä muokkaamaan niiden osia valitsemalla <span className="glyphicon glyphicon-edit"></span>.
            </div>
                <table className="boxx table-striped">
                    <thead>
                        <tr><th>Tapahtuma</th><th>Osat</th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.state.json.map((data, index) => <EventListing {...this.props} id={this.state.json.id} key={index} data={data} />)}
                        <NewEvent {...this.props} callBack={this.load} />
                    </tbody>
                </table>
                {/*<Event/>*/}
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api/events')
            .then(response => {
                const json = response.data;
                this.setState({ json });
            });
    };

}

export default Events;