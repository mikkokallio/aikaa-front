import React from 'react';
import axios from 'axios';
import {Col} from 'react-bootstrap';

class NewPlace extends React.Component {
    state = {
        name: '',
        address: {
            streetAddress: '',
            postcode: '',
            district: '',
            country: ''
        }
    };

    handleCreateClick = (event) => {
        //event.preventDefault();

        axios.post('/api/places', {
            name: this.state.name, address: {
                streetAddress: this.state.address.streetAddress,
                postcode: this.state.address.postcode,
                district: this.state.address.district,
                country: this.state.address.country
            }
        })
            .then(res => {
                this.props.callBack();
            });
    };
    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    handleStreetChange = (event) => {
        this.setState({address: {streetAddress: event.target.value}});
    };
    handleZipChange = (event) => {
        this.setState({address: {postcode: event.target.value}});
    };
    handleRegionChange = (event) => {
        this.setState({address: {district: event.target.value}});
    };
    handleCountryChange = (event) => {
        this.setState({address: {country: event.target.value}});
    };

    render() {
        return (
            <Col xs={4} md={4} className="boxx alert alert-warning"><span className="glyphicon glyphicon-tag"></span>
                <input type="text" style={{width: '80px'}} placeholder="nimi" value={this.state.name}
                       onChange={this.handleNameChange}/>
                <input type="text" style={{width: '80px'}} placeholder="katuosoite"
                       value={this.state.address.streetAddress}
                       onChange={this.handleStreetChange}/>
                <input type="text" style={{width: '80px'}} placeholder="postinumero" value={this.state.address.postcode}
                       onChange={this.handleZipChange}/>
                <input type="text" style={{width: '80px'}} placeholder="maakunta" value={this.state.address.district}
                       onChange={this.handleRegionChange}/>
                <input type="text" style={{width: '40px'}} placeholder="maa" value={this.state.address.country}
                       onChange={this.handleCountryChange}/>
                <div className="circle" onClick={this.handleCreateClick.bind(this)}><span
                    className="glyphicon glyphicon-plus"></span></div>
            </Col>
        );
    }
}

export default NewPlace;