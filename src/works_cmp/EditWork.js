import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';

class EditWork extends React.Component {
    state = { allRoles: [], chosenRoles: [] };

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState(json);//täällä sisällä "roleList", joka sisältää teoksen roolit
                let chosenList = this.state.roleList?this.state.roleList:[];
                this.setState({chosenRoles : chosenList});
                console.log("chosenRoles", this.state.chosenRoles) 
            });
        axios.get('/api/roles')//kaikki olemassaolevat roolit eli allRoles
            .then(response => {
                const allRoles = response.data;
                this.setState({ allRoles: allRoles });
            });

    };

    handleCreateClick = (event) => {// tässä lisätään pelkästään roolit
        //event.preventDefault();
        axios.post('/api/workroles/'+this.state.id, this.state.roleList)
            .then(res => {
                this.setState(this.state);
            });
    };
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };
    handleRoleChange = (event) => {
        let roleList = [];
        roleList.push(event.target.value);
        let chosenList = this.state.chosenRoles?this.state.chosenRoles:[];
        chosenList.push(this.state.allRoles.filter((role)=>role.id===event.target.value));
        this.setState({ roleList: roleList, chosenRoles: chosenList });
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
                        <tr><th colSpan={2}><span className="glyphicon glyphicon-music"></span><span> </span>{this.state.work}</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Säveltäjä</td>
                            <td>{this.state.composer}</td>
                        </tr>
                        <tr><td>Kesto</td>
                            <td>{this.state.durationInMinutes}</td>
                        </tr>
                        <tr><td>Muusikot</td>
                            <td>{this.state.musicians}</td>
                        </tr>
                        <tr><td>Instrumentaatio</td>
                            <td>{this.state.instrumentation}</td>
                        </tr>
                    </tbody>
                </table>
                {this.state.chosenRoles ? this.state.chosenRoles.map((line, index) => <Role key={line.id} data={line} />) : 'LOADING, oh my!'}
                <div><select placeholder="rooli" value={this.state.roleId} onChange={this.handleRoleChange}>
                    {this.state.allRoles.map((data, index) => <option value={data.id} label={data.name} data={data} />)}
                </select></div>

                <tr>
                    <td><span className="glyphicon glyphicon-music"></span>
                        <input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange} />
                    </td>
                    <td colSpan="2">
                        <div className="circle" onClick={this.handleCreateClick.bind(this)}><span
                            className="glyphicon glyphicon-plus"></span></div>
                    </td>
                </tr>
            </div>

        );
    }
}

export default EditWork;