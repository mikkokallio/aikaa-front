import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';
import Booking from '../booking_cmp/Booking';

class EditSubEvent extends React.Component {
    state = {bookings: [], event: [], places: [], works: []};

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState(json);
            });
        axios.get('/api/places')
            .then(response => {
                const places = response.data;
                this.setState({places});
            });
        axios.get('/api/events/'+this.state.eventid)
            .then(response => {
                const event = response.data;
                this.setState({event});
                console.log(event);
            });
    };

    handleCreateClick = (event) => {// tässä lisätään pelkästään roolit
        //event.preventDefault();
        axios.post('/api/workroles/' + this.state.id, this.state.newRoles)
            .then(res => {
                this.setState(this.state);
            });
    };

    handleUpdateClick = (event) => {
        axios.put('/api/works/' + this.state.id, {
            work: this.state.work, composer: this.state.composer, musicians: this.state.musicians,
            durationInMinutes: this.state.durationInMinutes, instrumentation: this.state.instrumentation
        })
            .then(res => {
                // this.props.callBack();
                this.load();
                //               this.setState({work: '', composer: '', durationInMinutes: '', musicians: '', instrumentation: ''});
            });
    };
    handleRevertClick = (event) => {
        this.load();
    };
    handleNameChange = (event) => {
        this.setState({work: event.target.value});
    };
    handleTypeChange = (event) => {
        this.setState({type: event.target.value});
    };
    handleBeginChange = (event) => {
        this.setState({begin: event.target.value});
    };
    handleEndChange = (event) => {
        this.setState({ending: event.target.value});
    };
    // handleInstChange = (event) => {
    //     this.setState({ instrumentation: event.target.value });
    // };
    // handleInstChange = (event) => {
    //     this.setState({ instrumentation: event.target.value });
    // };

    render() {
        console.log("State: "+this.state);
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
                            <input type="text" placeholder="" value={this.state.name} onChange={this.handleNameChange}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Tyyppi</td>
                        <td><input type="text" placeholder="" value={this.state.type} onChange={this.handleTypeChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Alkaa</td>
                        <td><input type="datetime-local" placeholder="" value={this.state.begin}
                                   onChange={this.handleBeginChange}/></td>
                    </tr>
                    <tr>
                        <td>Päättyy</td>
                        <td><input type="datetime-local" placeholder="" value={this.state.ending}
                                   onChange={this.handleEndChange}/></td>
                    </tr>
                    <tr>
                        <td>Sijainti</td>
                        <td>
                            <select placeholder="sijainti" value={this.state.placeId} onChange={this.handlePlaceChange}>
                                <option key={0} value={0} label={"Valitse paikka"} data={"Ei valittu"}/>
                                {this.state.places.map((data, index) => <option key={data.id} value={data.id}
                                                                                label={data.name} data={data}/>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Teos</td>
                        <td>
                            {/*<select placeholder="sijainti" value={this.state.placeId} onChange={this.handlePlaceChange}>*/}
                            {/*<option key={0} value={0} label={"Valitse paikka"} data={"Ei valittu"}/>*/}
                            {/*{this.state.json.map((data, index) => <option key={data.id} value={data.id}*/}
                            {/*label={data.name} data={data}/>)}*/}
                            {/*</select>*/}

                            <input type="text" placeholder="" value={this.state.placeId}
                                   onChange={this.handleWorkChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                   value="Talleta"/>
                        </td>
                        <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick}
                                   value="Peru"/></td>
                    </tr>
                    </tbody>
                </table>
                <Booking {...this.props} data={this.state.works} eventid={this.state.id} callBack={this.load}/>
            </div>
        )
            ;
    }
}

export default EditSubEvent;
//                 <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>