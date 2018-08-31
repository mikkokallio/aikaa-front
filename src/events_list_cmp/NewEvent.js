import React from 'react';
import axios from 'axios';

class NewEvent extends React.Component {
    state= { name: ''};
    handleCreateClick= (event) => {
        //event.preventDefault();

        axios.post('/api/events', { name:this.state.name })
            .then(res => {
                this.props.callBack();
            });
    };
    handleNameChange= (event) => {
        this.setState({name: event.target.value});
    };

    render() {
        return(
            <tr><td><span className="glyphicon glyphicon-tag"></span>
                <input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange}/></td>
                <td colspan="2"><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
        );
    }
}

export default NewEvent;