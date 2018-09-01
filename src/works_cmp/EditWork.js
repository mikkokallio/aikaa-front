import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';

class EditWork extends React.Component {
    state = {json: ''};

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState({json});
                console.log(json);
            });
        axios.get('/api/roles')
            .then(response => {
                const roleList = response.data;
                this.setState({roleList});
            });

    };

    handleCreateClick = (event) => {
        //event.preventDefault();

        axios.post('/api/works', {name: this.state.name})
            .then(res => {
                this.props.callBack();
            });
    };
    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    handleRoleChange = (event) => {
        this.setState({name: event.target.value});
    };

    render() {
        console.log(this.props);
        return (
            <div className="boxx">
                <h1>Muokkaa teosta</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit muokata yksittäistä teosta ja mm. lisätä siihen
                    rooleja.
                </div>
                <table className="boxx table-striped">
                    <thead>
                    <tr><th colSpan={2}><span className="glyphicon glyphicon-music"></span><span> </span>{this.state.json.work}</th></tr>
                    </thead>
                    <tbody>
                <tr>
                    <td>Säveltäjä</td>
                    <td>{this.state.json.composer}</td>
                </tr>
                <tr><td>Kesto</td>
                    <td>{this.state.json.durationInMinutes}</td>
                </tr>
                <tr><td>Muusikot</td>
                    <td>{this.state.json.musicians}</td>
                </tr>
                <tr><td>Instrumentaatio</td>
                    <td>{this.state.json.instrumentation}</td>
                </tr>
                </tbody>
                </table>
                {/*{this.state.roleList?this.state.roleList.map((line, index) => <Role key={index} data={line}/>):'LOADING, oh my!'}*/}
                {/*<div><select placeholder="rooli" value={this.state.placeId} onChange={this.handleRoleChange}>*/}
                    {/*{this.state.roleList.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}*/}
                {/*</select></div>*/}

                {/*<tr>*/}
                    {/*<td><span className="glyphicon glyphicon-music"></span>*/}
                        {/*<input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange}/>*/}
                    {/*</td>*/}
                    {/*<td colSpan="2">*/}
                        {/*<div className="circle" onClick={this.handleCreateClick.bind(this)}><span*/}
                            {/*className="glyphicon glyphicon-plus"></span></div>*/}
                    {/*</td>*/}
                {/*</tr>*/}
            </div>

        );
    }
}

export default EditWork;