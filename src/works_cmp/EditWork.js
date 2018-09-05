import React from 'react';
import axios from 'axios';
import Role from '../roles_cmp/Role';
import RolesList from '../profile_cmp/RolesList';

class EditWork extends React.Component {
    state = { allRoles: [], chosenRoles: [], newRoles: [], categories: [], shortList: [] };//all: kaikki olemasaolevat roolit; chosen: kaikki valitut; new: nyt lisättävät roolit

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
            });
        axios.get('/api/roles')//kaikki olemassaolevat roolit eli allRoles
            .then(response => {
                const allRoles = response.data;
                this.setState({ allRoles: allRoles });
            });
        axios.get('/api/rolecategories')
            .then(response => {
                const categories = response.data;
                this.setState({ categories: categories });
            });

    };

    handleCategoryChange = (event) => {
        var roles = this.state.allRoles;
        var shortList = [];
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].categoryId == event.target.value) shortList.push(roles[i]);
        }
        this.setState({ shortList: shortList });
    };

    handleCreateClick = (event) => {// tässä lisätään pelkästään roolit
        //event.preventDefault();
        axios.post('/api/workroles/' + this.state.id, this.state.newRoles)
            .then(res => {
                this.setState(this.state);
            });
    };

    handleUpdateClick = (event) => {
        axios.put('/api/works/' + this.state.id, {
            work: this.state.work, composer: this.state.composer, musicians: this.state.musicians,
            durationInMinutes: this.state.durationInMinutes, instrumentation: this.state.instrumentation
        })
            .then(res => {
                // this.props.callBack();
                this.load();
                //               this.setState({work: '', composer: '', durationInMinutes: '', musicians: '', instrumentation: ''});
            });
    };

    removeRoleFromWork = (id, workroleid) => {
        axios.delete('/api/workroles/' + workroleid)
            .then(res => {
                this.setState(this.state);
                this.load();
            })
    }
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
                                value="Talleta" />
                            </td>
                            <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru" /></td></tr>
                    </tbody>
                </table>
                <table className="boxx table-striped">
                    <thead>
                        <tr><th colSpan={3}><span className="glyphicon glyphicon-tags"></span><span> </span>Roolit</th></tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan={3}>{this.state.chosenRoles ? this.state.chosenRoles.map((line, index) => <Role key={index} data={line} callBack={this.load} callBackRemove={this.removeRoleFromWork} />) : 'Lataa...'}</td>
                        </tr>
                        <tr><td>
                            <div style={{ display: 'inline-block' }}><select style={{ width: '160px' }} value={this.state.categoryId} onChange={this.handleCategoryChange}>
                                <option disabled selected value> -- kategoria -- </option>
                                {this.state.categories.map((data, index) => <option key={index} value={data.id} label={data.name} data={data} />)}
                            </select></div>
                            <div><select style={{ width: '160px' }} value={this.state.role} onChange={this.handleRoleChange}>
                                <option disabled selected value> -- rooli -- </option>
                                {this.state.shortList.map((data, index) => <option value={data.id} label={data.name} data={data} />)}
                            </select></div>
                        </td></tr>
                        <tr><td>
                            <input className="btn btn-primary" type="submit" onClick={this.handleCreateClick.bind(this)}
                                value="Talleta" /></td></tr>
                    </tbody>
                </table>
                {/*<RolesList user={this.state.roleList} callBack={this.load}/>*/}
                {/* <div><select placeholder="rooli" value={this.state.roleId} onChange={this.handleRoleChange}>
                    <option key={0} value={0} label={"Valitse rooli"} data={"Ei valittu"} />
                    {this.state.allRoles.map((data, index) => <option key={index} value={data.id} label={data.name} data={data} />)}
                </select></div> */}
            </div >
        );
    }
}

export default EditWork;