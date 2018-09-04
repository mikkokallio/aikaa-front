import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import User from "./User";
import user from '../user.png';

class Schedule extends React.Component {
    state = {json: []};
    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    };
    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    };
    handleLevelChange = (event) => {
        this.setState({userLevel: event.target.value})
    };

    handleCreateClick = (event) => {
        //event.preventDefault();
        let requestparam = '';
        if (this.props.eventid) {
            requestparam += '?event=true&eventid=' + this.props.eventid;
        }
        axios.post('/api/users' + requestparam, {
            name: this.state.name,
            email: this.state.email,
            userLevel: this.state.userLevel
        })
            .then(res => {
                this.setState({name: '', email: '', userLevel: ''});
                this.load();
            });
    };

    render() {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Käyttäjät</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit hallinnoida
                    järjestelmän käyttäjiä.
                </div>
                <div className="boxx"><img src={user} alt="Avatar" className="avatar"/>
                    <div style={{display: 'inline-block', marginLeft: '1em', width: '12em'}}>
                        <input type="text" placeholder="nimi" value={this.state.name}
                               onChange={this.handleNameChange}></input></div>
                    <div style={{display: 'inline-block', marginLeft: '1em', width: '12em'}}>
                        <input type="text" placeholder="sähköposti" value={this.state.email}
                               onChange={this.handleEmailChange}></input></div>
                    <div style={{display: 'inline-block', marginLeft: '1em', width: '12em'}}>
                        <select value={this.state.userLevel} onChange={this.handleLevelChange}>
                            <option label="käyttäjä" value="3"/>
                            <option label="järjestäjä" value="2"/>
                            <option label="ylläpitäjä" value="1"/>
                        </select></div>
                    <div className="circle" onClick={this.handleCreateClick}><span
                        className="glyphicon glyphicon-plus"></span></div>
                    <td></td>
                </div>
                {this.state.json.map((line, index) =>
                    <User {...this.props} key={index} data={line}/>)}
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/users')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }
}

export default Schedule;