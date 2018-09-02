import React from 'react';
import axios from "axios/index";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Role from '../roles_cmp/Role';
import User from "./User";

class Profile extends React.Component {
    state = {categories: [], roleList: [], user: []};

    handleNameChange = (event) => {
        this.setState({user:{name: event.target.value}});
    };
    handleEmailChange = (event) => {
        this.setState({user:{email: event.target.value}});
    };
    handlePhoneChange= (event) => {
        this.setState({user:{phonenumber: event.target.value}});
    };
    handlePicChange = (event) => {
        this.setState({user:{picurl: event.target.value}});
    };
    handleAddressChange = (event) => {
        //this.setState({user:{addressId: event.target.value}});
    };
    // handleRoleChange = (event) => {
    //     this.setState({roleId: event.target.value});
    // };
    handleUpdateClick= (event) => {
        //event.preventDefault();
        axios.put('/api/users/1', { user:this.state.user })
            .then(res => {
                this.props.callBack();
            });
    };


    render() {
        console.log(this.state.user.roles);
        return (
            <div className="boxx">
                <h1>Profiili / Profil</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja muokata
                    käyttäjäprofiilisi
                    tietoja, mukaanlukien roolejasi, joiden avulla järjestäjät voivat sijoittaa sinut kokoonpanoihin.
                    Voit myös hallinnoida asetuksia
                    kuten että näetkö eri näkymissä tällaisia info-bokseja. Tähdellä merkityt tiedot ovat pakollisia. Esikatselusta näet miten järjestäjät ja muut käyttäjät näkevät sinut.
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
                    </tbody>
                </table>
                <p>Esikatselu</p>
                {/*<User data={this.state}/>*/}
                <span className="glyphicon glyphicon-flag"></span>
                {/*id: 14, userLevel: 1,*/}
                {/*roles: [*/}
                    {/*id: 18,*/}
                    {/*name: "SuperAdmin",*/}
                    {/*category: "Tukihenkilöstö",*/}
                    {/*categoryId: 9*/}
                {/*googleid: "110922832614819859477",*/}
                {/*userLevelAsString: [*/}
                {/*"ROLE_USER",*/}
                {/*"ROLE_ADMIN",*/}
                {/*"ROLE_SUPERADMIN"*/}

                <p>Roolit: Tänne + nappi</p>
                {this.state.user.roles?this.state.user.roles.map((line, index) => <Role key={index} data={line}/>):'Lataa...'}

                <div style={{display:'inline-block'}}><select placeholder="luokka" value={this.state.categoryId} onChange={this.handleCategoryChange}>
                    {this.state.categories.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                </select></div>

                <div><select placeholder="rooli" value={this.state.placeId} onChange={this.handleRoleChange}>
                {this.state.roleList.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                </select></div>

                <Row>
                    <Col xs={2} md={2}><input className="btn btn-primary" type="submit"
                                              value="Talleta Muutokset"/></Col>
                    <Col xs={2} md={2}><input className="btn btn-warning" type="submit" value="Peru Muutokset"/></Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/roles')
            .then(response => {
                const roleList = response.data;
                this.setState({roleList});
            });
        axios.get('/api/users/1')
            .then(response => {
                const user = response.data;
                this.setState({user});
            });
        axios.get('/api/rolecategories')
            .then(response => {
                const categories = response.data;
                this.setState({categories});
            });
    }

}

export default Profile;

////
//     handleCreateClick= (event) => {
//         //event.preventDefault();
//         axios.post('/api/subevents', { name:this.state.name, begin:this.state.begin, ending:this.state.ending,
//         placeId:this.state.placeId, eventId:this.props.event, type:this.state.type, workId:this.state.workId})
//             .then(res => {
//                 this.props.callBack();
//             });
//     };
//