import React from 'react';
import axios from 'axios';

class NewSubEvent extends React.Component {
    state = {
        json: [], name: '', begin: '', ending: '',
        placeId: '', type: '', workId: ''
    };

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api/places')
            .then(response => {
                const json = response.data;
                this.setState({ json });
            });
    };

    handleCreateClick = (event) => {
        //event.preventDefault();
        axios.post('/api/subevents', {
            name: this.state.name, begin: this.state.begin, ending: this.state.ending,
            placeId: this.state.placeId, eventId: this.props.eventid, type: this.state.type, workId: this.state.workId
        })
            .then(res => {
                this.props.callBack();
                this.setState({
                    name: '', begin: '', ending: '',
                    placeId: '', type: '', workId: ''
                });
            });
    };

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };
    handleTypeChange = (event) => {
        this.setState({ type: event.target.value });
    };
    handleBeginChange = (event) => {
        this.setState({ begin: event.target.value + ":00" });
    };
    handleEndChange = (event) => {
        this.setState({ ending: event.target.value + ":00" });
    };
    handlePlaceChange = (event) => {
        this.setState({ placeId: event.target.value });
    };

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span><span> </span><input style={{width:'80px'}} type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange} /></td>
                <td><input  style={{width:'80px'}} type="text" placeholder="tyyppi" value={this.state.type} onChange={this.handleTypeChange} /></td>
                <td><input type="datetime-local" placeholder="alkaa" value={this.state.begin} onChange={this.handleBeginChange} /></td>
                <td><input type="datetime-local" placeholder="loppuu" value={this.state.ending} onChange={this.handleEndChange} /></td>
                <td><select placeholder="sijainti" value={this.state.placeId} onChange={this.handlePlaceChange}>
                    <option key={0} value={0} label={"Valitse paikka"} data={"Ei valittu"} />
                    {this.state.json.map((data, index) => <option key={data.id} value={data.id} label={data.name} data={data} />)}
                </select></td>
                <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
        );
    }
}

export default NewSubEvent;