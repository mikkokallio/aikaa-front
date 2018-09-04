import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';
import WorkCast from "../booking_cmp/WorkCast";

class EditSubEvent extends React.Component {
    state = {
        bookings: [], event: [], places: [], works: [], name: '', begin: '', ending: '',
        eventid: '', placeid: '', type: '', workid: '', selectedCast: []
    };

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState(json);
                return json;
            }).then(subevent => {
                axios.get('/api/events/' + subevent.eventid)
                    .then(response => {
                        const event = response.data;
                        this.setState({ event: event });
                    });
            });
        axios.get('/api/places')
            .then(response => {
                const places = response.data;
                this.setState({ places: places });
            });
        axios.get('/api/bookings'+this.props.location.pathname)
        .then(response =>{
            this.setState({selectedCast:response.data});
        }) 
    };

    handleCreateClick = (event) => {// tässä lisätään pelkästään roolit
        //event.preventDefault();
        axios.post('/api/workroles/' + this.state.id, this.state.newRoles)
            .then(res => {
                this.setState(this.state);
            });
    };

    updateCast = (cast) => {
        for (let role of cast) {
            axios.post('/api/bookings?subeventid='+this.state.id+'&userid='+ role.userid + '&workroleid=' + role.roleid)
                .then(res => {
                    console.log("lisätty subeventcast");
                });
        }
        this.load();
    }

    handleUpdateClick = (event) => {
        axios.put('/api/subevents/' + this.state.id, {
            name: this.state.name, begin: this.state.begin, ending: this.state.ending,
            placeId: this.state.placeid, eventId: this.state.eventid, type: this.state.type, workId: this.state.workid
        })
            .then(res => {
                // this.props.callBack();
                this.load();
            });
    };
    handleRevertClick = (event) => {
        this.load();
    };
    handleNameChange = (event) => {
        this.setState({ work: event.target.value });
    };
    handleTypeChange = (event) => {
        this.setState({ type: event.target.value });
    };
    handleBeginChange = (event) => {
        this.setState({ begin: event.target.value });
    };
    handleEndChange = (event) => {
        this.setState({ ending: event.target.value });
    };
    handlePlaceChange = (event) => {
        this.setState({ placeId: event.target.value });
    };
    handleWorkChange = (event) => {
        this.setState({ workid: event.target.value });
    };

    render() {
        return (
            <div className="boxx">
                <h1>Muokkaa tapahtuman osaa</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit muokata tapahtuman
                    osaa.
                </div>
                <table className="boxx table-striped">
                    <thead>
                        <tr>
                            <th colSpan={2}><span className="glyphicon glyphicon-flag"></span><span> </span>
                                <input type="text" placeholder="" value={this.state.name} onChange={this.handleNameChange} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tyyppi</td>
                            <td><input type="text" placeholder="" value={this.state.type} onChange={this.handleTypeChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Alkaa</td>
                            <td><input type="datetime-local" placeholder="" value={this.state.begin}
                                onChange={this.handleBeginChange} /></td>
                        </tr>
                        <tr>
                            <td>Päättyy</td>
                            <td><input type="datetime-local" placeholder="" value={this.state.ending}
                                onChange={this.handleEndChange} /></td>
                        </tr>
                        <tr>
                            <td>Sijainti</td>
                            <td>
                                <select placeholder="sijainti" value={this.state.placeid} onChange={this.handlePlaceChange}>
                                    <option key={0} value={0} label={"Valitse paikka"} data={"Ei valittu"} />
                                    {this.state.places.map((data, index) =>
                                        <option key={data.id} value={data.id}
                                            label={data.name} data={data}
                                            selected={this.state.placeid == data.id && 'selected'} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Teos</td>
                            <td>
                                <select placeholder="teos" value={this.state.workid} onChange={this.handleWorkChange}>
                                    <option key={0} value={0} label={"Valitse teos"} data={"Ei valittu"} />
                                    {this.state.event.works && this.state.event.works.map((data, index) => <option
                                        key={data.id} value={data.id}
                                        label={data.work} data={data} selected={this.state.workid == data.id && 'selected'} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                value="Talleta" />
                            </td>
                            <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick}
                                value="Peru" /></td>
                        </tr>
                    </tbody>
                </table>
                {this.state.workid && <WorkCast {...this.props} selectedCast={this.state.selectedCast} callBack={this.updateCast} workid={this.state.workid} />}
            </div>
        );
    }
}

export default EditSubEvent;