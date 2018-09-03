import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';
import WorkCast from "../booking_cmp/WorkCast";

class EditSubEvent extends React.Component {
    state = {bookings: [], event: [], places: [], works: [], name: '', begin: '', ending: '',
    placeId: '', type: '', workId: ''};

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

    //         name: this.state.name, begin: this.state.begin, ending: this.state.ending,
    //         placeId: this.state.placeId, eventId: this.props.eventid, type: this.state.type, workId: this.state.workId
    //     })
    //         .then(res => {
    //             this.props.callBack();
    //             this.setState({
    //                 name: '', begin: '', ending: '',
    //                 placeId: '', type: '', workId: ''
    //             });
    //         });
    // };


    handleUpdateClick = (event) => {
        axios.put('/api/subevents/' + this.state.id, {
            name: this.state.name, type: this.state.type, begin: this.state.begin,
            ending: this.state.ending, placeId: this.state.placeId, workId: this.state.workId, eventId: this.state.eventId
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
    handlePlaceChange = (event) => {
        this.setState({ placeId: event.target.value });
    };
    handleWorkChange = (event) => {
        this.setState({ workId: event.target.value });
    };

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
                                {this.state.places.map((data, index) =>
                                    <option key={data.id} value={data.id} label={data.name} data={data}
                                    selected={this.state.placeId===data.id&&'selected'}/>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Teos</td>
                        <td>
                            <select placeholder="sijainti" value={this.state.placeId} onChange={this.handleWorkChange}>
                            <option key={0} value={0} label={"Valitse paikka"} data={"Ei valittu"}/>
                                {this.state.event.works&&this.state.event.works.map((data, index) => <option key={data.id} value={data.id}
                            label={data.name} data={data}/>)}
                            </select>

                            <input type="text" placeholder="" value={this.state.workId}
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
                <WorkCast {...this.props} workId={this.state.workId} />
                {/*<Booking {...this.props} data={this.state.works} eventid={this.state.id} callBack={this.load}/>*/}
            </div>
        )
            ;
    }
}

export default EditSubEvent;
//                 <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>