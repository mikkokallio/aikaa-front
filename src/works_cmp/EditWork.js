import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';
import RolesList from '../profile_cmp/RolesList';

class EditWork extends React.Component {
    state = { allRoles: [], chosenRoles: [], newRoles: [] };//all: kaikki olemasaolevat roolit; chosen: kaikki valitut; new: nyt lisättävät roolit

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api' + this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState(json);//täällä sisällä "roleList", joka sisältää teoksen roolit
                let chosenList = this.state.roleList ? this.state.roleList : [];
                this.setState({ chosenRoles: chosenList });
                // console.log("chosenRoles", this.state.chosenRoles)
                // console.log(this.state.roleList[0].name);
                // if (chosenList.length === 0 && this.state.roleList[0].name) {
                //     chosenList = this.state.roleList;
                //     console.log(chosenList);
                // }
            });
        axios.get('/api/roles')//kaikki olemassaolevat roolit eli allRoles
            .then(response => {
                const allRoles = response.data;
                this.setState({ allRoles: allRoles });
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
        axios.put('/api/works/'+this.state.id, { work:this.state.work, composer:this.state.composer, musicians:this.state.musicians,
            durationInMinutes:this.state.durationInMinutes, instrumentation:this.state.instrumentation})
            .then(res => {
                // this.props.callBack();
                this.load();
 //               this.setState({work: '', composer: '', durationInMinutes: '', musicians: '', instrumentation: ''});
            });
    };
    handleRevertClick = (event) => {
        this.load();
    };
    handleWorkNameChange = (event) => {
        this.setState({ work: event.target.value });
    };

    handleComposerChange = (event) => {
        this.setState({ composer: event.target.value });
    };
    handleDurChange = (event) => {
        this.setState({ durationInMinutes: event.target.value });
    };
    handleMusChange = (event) => {
        this.setState({ musicians: event.target.value });
    };
    handleInstChange = (event) => {
        this.setState({ instrumentation: event.target.value });
    };
    handleRoleChange = (event) => {
        let newList = this.state.newRoles ? this.state.newRoles : [];//otetaan joko olemassaoleva roleList(tullut apista ja päivittyy lisättäessä) tai aloitetaan uusi;
        newList.push(event.target.value);//lisätään lisättävien roolien listalle valitun roolin numero
        let chosenList = this.state.chosenRoles ? this.state.chosenRoles : [];//tämä lista on näkymää varten
        chosenList.push(this.state.allRoles.find(role => role.id === Number(event.target.value)));//valittu rooli lisätään myös näkymään
        this.setState({ newRoles: newList, chosenRoles: chosenList });//päivitetään tilaan uudet listat
    };

    render() {
        return (
            <div className="boxx">
                <h1>Muokkaa teosta</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit muokata yksittäistä teosta ja mm. lisätä siihen
                    rooleja.
                </div>
                <table className="boxx table-striped">
                    <thead>
                        <tr><th colSpan={2}><span className="glyphicon glyphicon-music"></span><span> </span>
                            <input type="text" placeholder="" value={this.state.work} onChange={this.handleWorkNameChange} /></th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Säveltäjä</td>
                            <td><input type="text" placeholder="" value={this.state.composer} onChange={this.handleComposerChange} /></td>
                        </tr>
                        <tr><td>Kesto</td>
                            <td><input style={{ width: '20px' }} type="text" placeholder="" value={this.state.durationInMinutes} onChange={this.handleDurChange} /></td>
                        </tr>
                        <tr><td>Muusikot</td>
                            <td><input style={{ width: '20px' }} type="text" placeholder="" value={this.state.musicians} onChange={this.handleMusChange} /></td>
                        </tr>
                        <tr><td>Instrumentaatio</td>
                            <td><input type="text" placeholder="" value={this.state.instrumentation} onChange={this.handleInstChange} /></td>
                        </tr>
                        <tr>
                            <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                       value="Talleta"/>
                            </td>
                            <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru"/></td></tr>
                    </tbody>
                </table>
                {/*<RolesList user={this.state.roleList} callBack={this.load}/>*/}
                {this.state.chosenRoles ? this.state.chosenRoles.map((line, index) => <Role key={index} data={line} />) : 'LOADING, oh my!'}
                <div><select placeholder="rooli" value={this.state.roleId} onChange={this.handleRoleChange}>
                    {this.state.allRoles.map((data, index) => <option key={index} value={data.id} label={data.name} data={data} />)}
                </select></div>

                <tr>
                    {/* <td><span className="glyphicon glyphicon-music"></span>
                        <input type="text" placeholder="nimi" value={this.state.name} onChange={this.handleNameChange} />
                    </td> */}
                    <td colSpan="2">
                        <div className="circle" onClick={this.handleCreateClick.bind(this)}><span
                            className="glyphicon glyphicon-plus"></span></div>Päivitä teoksen roolit 
                    </td>
                </tr>
            </div >
        );
    }
}

export default EditWork;