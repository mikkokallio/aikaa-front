import React from 'react';
import TimeLabel from "../schedule_cmp/TimeLabel";
import Week from "../schedule_cmp/Week";
import Day from "../schedule_cmp/Day";
import WorkCast from "./WorkCast";
import LocalizedStrings from 'react-localization';
import axios from "axios/index";

class Booking extends React.Component {
    state = {labels: [], event:[]};

    render() {
        console.log(this.state.subevent);
        return (
                    <table className="boxx table-striped">
                        <thead>
                        <tr><th colSpan={2}><span className="glyphicon glyphicon-flag"></span><span> </span>Roolitukset: {this.state.event.name}</th></tr>
                        </thead>
                        <tbody>
                        {this.state.event.works&&this.state.event.works.map((data, index) => <WorkCast key={index} data={data}/>)}
                        <tr>
                            <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                       value="Talleta"/>
                            </td>
                            <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru"/></td></tr>
                        </tbody>
                    </table>
        )
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/events/1')
            .then(response => {
                const event = response.data;
                this.setState({event});
            });
    };
}

export default Booking;