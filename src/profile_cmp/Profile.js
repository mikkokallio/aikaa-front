import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Role from '../roles_cmp/Role';
import User from "../users_cmp/User";
import RolesList from "./RolesList";

class Profile extends React.Component {
    state = {user: []};

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
    handleUpdateClick= (event) => {
        event.preventDefault();
        axios.put('/api/users/3', this.state.user)
            .then(res => {
                //this.props.callBack();
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
                {/*TODO: Formin pitää varoittaa ja estää tyhjien kenttien lähetys! Ainakin nimi on tällainen.*/}
                {/*<img src=""/>*/}
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
                <RolesList user={this.state.user} callBack={this.load}/>
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }
    load = () => {
        this.setState({isLoading: true});
        // Tänne OMAN id:n kautta myös pelkällä profile -osoitteella!!!
        var path = this.props.location.pathname.replace("profile","users");
        console.log(path);
        axios.get('/api'+path)
            .then(response => {
                const user = response.data;
                this.setState({user});
            });
    }
}

export default Profile;