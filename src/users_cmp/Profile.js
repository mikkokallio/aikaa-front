import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Role from '../roles_cmp/Role';
import User from "./User";

class Profile extends React.Component {
    state = {selected:'', categories: [], roleList: [], shortList: [], user: []};

    handleNameChange = (event) => {
        this.setState({user: { ...this.state.user, name: event.target.value}})
    };
    handleEmailChange = (event) => {
        this.setState({user: { ...this.state.user, email: event.target.value}})
    };
    handlePhoneChange= (event) => {
        this.setState({user: { ...this.state.user, phonenumber: event.target.value}})
    };
    handlePicChange = (event) => {
        this.setState({user: { ...this.state.user, picurl: event.target.value}})
    };
    handleAddressChange = (event) => {
        //this.setState({user:{addressId: event.target.value}});
    };
    handleCategoryChange = (event) => {
        //this.setState({selected: event.target.value});
        var roles=this.state.roleList;
        var shortList = [];
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].categoryId==event.target.value) shortList.push(roles[i]);
        }
        console.log(shortList);
        this.setState({shortList: shortList});
    };
    handleRoleChange = (event) => {
        this.setState({selected: event.target.value})
        console.log(this.state.selected);
    };
    handleUpdateClick= (event) => {
        event.preventDefault();
        axios.put('/api/users/3', this.state.user)
            .then(res => {
                //this.props.callBack();
            });
    };

handleCreateClick= (event) => {
        axios.post('/api/userrole/3/'+this.state.selected)
            .then(res => {
                this.load();
//                 this.props.callBack();
            });
    };
    handleRevertClick= (event) => {
        //event.preventDefault();
        this.load();
    };

    render() {
        console.log(this.state.user);
        return (
            <div className="boxx">
                <h1>Profiili</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja muokata
                    käyttäjäprofiilisi
                    tietoja, mukaanlukien roolejasi, joiden avulla järjestäjät voivat sijoittaa sinut kokoonpanoihin.
                    Tähdellä merkityt tiedot ovat pakollisia.
                </div>
                <p>Formin pitää varoittaa ja estää tyhjien kenttien lähetys! Ainakin nimi on tällainen.</p>
                <img src=""/>
                <table className="boxx table-striped">
                    <thead>
                    <tr><th colSpan={2}><span className="glyphicon glyphicon-user"></span><span> </span>Käyttäjätietojen muokkaus</th></tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Nimi*</td>
                        <td><input type="text" placeholder="" value={this.state.user.name} onChange={this.handleNameChange}/></td>
                    </tr>
                    <tr><td>Sähköposti*</td>
                        <td><input type="text" placeholder="" value={this.state.user.email} onChange={this.handleEmailChange}/></td>
                    </tr>
                    <tr><td>Puhelinnumero*</td>
                        <td><input type="text" placeholder="" value={this.state.user.phonenumber} onChange={this.handlePhoneChange}/></td>
                    </tr>
                    <tr><td>Profiilikuvan URL-osoite</td>
                        <td><input type="text" placeholder="" value={this.state.user.picurl} onChange={this.handlePicChange}/></td>
                    </tr>
                    <tr><td>Katuosoite</td>
                        <td><input type="text" placeholder="" value={this.state.user.addressId} onChange={this.handleAddressChange}/></td>
                    </tr>
                    <tr>
                        <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                                   value="Talleta"/>
                        </td>
                        <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru"/></td></tr>
                    </tbody>
                </table>

                <table className="boxx table-striped">
                    <thead>
                    <tr><th colSpan={3}><span className="glyphicon glyphicon-tags"></span><span> </span>Roolit</th></tr>
                    </thead>
                    <tbody>
                    <tr><td colSpan={3}>{this.state.user.roles?this.state.user.roles.map((line, index) => <Role key={index} data={line}/>):'Lataa...'}</td>
                    </tr>
                    <tr><td>
                        <div style={{display:'inline-block'}}><select style={{width:'160px'}} value={this.state.categoryId} onChange={this.handleCategoryChange}>
                            <option disabled selected value> -- kategoria -- </option>
                            {this.state.categories.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                        </select></div></td>
                        <td><div><select style={{width:'160px'}} value={this.state.role} onChange={this.handleRoleChange}>
                            <option disabled selected value> -- rooli -- </option>
                            {this.state.shortList.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                        </select></div>
                    </td>
                    <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
                    </tbody>
                </table>
                {/*<p>Esikatselu</p>*/}
                {/*<User data={this.state}/>*/}
            </div>
        )
    }

    componentDidMount() {
        this.load();
        this.handleCategoryChange();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/users/3')
            .then(response => {
                const user = response.data;
                this.setState({user});
            });
        axios.get('/api/rolecategories')
            .then(response => {
                const categories = response.data;
                this.setState({categories});
            });
        axios.get('/api/roles')
            .then(response => {
                const roleList = response.data;
                this.setState({roleList});
            });
    }
}

export default Profile;