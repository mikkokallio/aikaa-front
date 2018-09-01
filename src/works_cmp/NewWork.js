import React from 'react';
import axios from 'axios';

class NewEvent extends React.Component {
    state= { work: '',composer: ''};
    handleCreateClick= (event) => {
        //event.preventDefault();

        axios.post('/api/works', { work:this.state.work, composer:this.state.composer, musicians:this.state.musicians,
            durationInMinutes:this.state.durationInMinutes, roleList:null, instrumentation:this.state.instrumentation})
            .then(res => {
                //this.props.callBack();
            });
    };
    handleNameChange= (event) => {
        this.setState({work: event.target.value});
    };
    handleComposerChange= (event) => {
        this.setState({composer: event.target.value});
    };
    handleDurationChange= (event) => {
        this.setState({durationInMinutes: event.target.value});
    };
    handleMusChange= (event) => {
        this.setState({musicians: event.target.value});
    };
    handleInstChange= (event) => {
        this.setState({instrumentation: event.target.value});
    };

    render() {
        return(
            <tr><td><span className="glyphicon glyphicon-music"></span><span> </span>
                <input type="text" placeholder="" value={this.state.work} onChange={this.handleNameChange}/></td>
                <td><input type="text" placeholder="" value={this.state.composer} onChange={this.handleComposerChange}/></td>
                <td><input style={{width:'20px'}} type="text" placeholder="" value={this.state.durationInMinutes} onChange={this.handleDurationChange}/></td>
                <td><input style={{width:'20px'}} type="text" placeholder="" value={this.state.musicians} onChange={this.handleMusChange}/></td>
                <td><input type="text" placeholder="" value={this.state.instrumentation} onChange={this.handleInstChange}/></td>
                <td colspan="2"><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
        );
    }
}

export default NewEvent;