import React from 'react';
import axios from 'axios';

class NewSubEvent extends React.Component {
    state= { json: [] };

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/places')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

    handleCreateClick= (event) => {
        //event.preventDefault();

        axios.post('/api/subevents', { name:this.state.name, begin:this.state.begin, ending:this.state.ending,
        placeId:parseInt(this.state.placeId), eventId:parseInt(this.state.eventId), type:this.state.type, workId:parseInt(this.state.workId)})
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
        this.setState({placeId: event.target.value});
    };

    render() {
        return(
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span><input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange}/></td>
                <td><input type="text" placeholder="tyyppi" value={this.state.type} onChange={this.handleTypeChange}/></td>
                <td><input type="datetime-local" placeholder="alkaa" value={this.state.begin} onChange={this.handleBeginChange}/></td>
                <td><input type="datetime-local" placeholder="loppuu" value={this.state.ending} onChange={this.handleEndChange}/></td>
                <td><select placeholder="sijainti" value={this.state.placeId} onChange={this.handlePlaceChange}>
                    {this.state.json.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                </select></td>
                <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
        );
    }
}

export default NewSubEvent;