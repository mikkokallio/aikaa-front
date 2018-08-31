import React from 'react';
import axios from 'axios';

class NewSubEvent extends React.Component {
    state= { name: '', begin:'', ending:'',
        placeid:'', eventid:'1', type:'', workid:'1'};

    handleCreateClick= (event) => {
        //event.preventDefault();

        axios.post('/api/subevents', { name:this.state.name, begin:this.state.begin, ending:this.state.ending,
        placeid:parseInt(this.state.placeid), eventid:parseInt(this.state.eventid), type:this.state.type, workid:parseInt(this.state.workid)})
            .then(res => {
                this.props.callBack();
            });
    };
    handleNameChange= (event) => {
        this.setState({name: event.target.value});
    };
    handleTypeChange= (event) => {
        this.setState({type: event.target.value});
    };
    handleBeginChange= (event) => {
        this.setState({begin: event.target.value});
    };
    handleEndChange= (event) => {
        this.setState({ending: event.target.value});
    };
    handlePlaceChange= (event) => {
        this.setState({placeid: event.target.value});
    };

    render() {
        return(
            <tr>
                <td><span className="glyphicon glyphicon-tag"></span><input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange}/></td>
                <td><input type="text" placeholder="tyyppi" value={this.state.type} onChange={this.handleTypeChange}/></td>
                <td><input type="datetime-local" placeholder="alkaa" value={this.state.begin} onChange={this.handleBeginChange}/></td>
                <td><input type="datetime-local" placeholder="loppuu" value={this.state.ending} onChange={this.handleEndChange}/></td>
                <td><input type="text" placeholder="sijainti" value={this.state.placeid} onChange={this.handlePlaceChange}/></td>
                <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
        );
    }
}

export default NewSubEvent;