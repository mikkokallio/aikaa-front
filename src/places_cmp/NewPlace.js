import React from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';

class NewPlace extends React.Component {
    state = {
        name: '',
        streetAddress: '',
        postcode: '',
        city: '',
        country: '',
        mapurl: ''
    };

    handleCreateClick = (event) => {
        //event.preventDefault();

        axios.post('/api/places',
            {name: this.state.name,
            address: {
                streetAddress: this.state.streetAddress,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            },
            mapurl: this.state.mapurl}
        )
            .then(res => {
                this.props.callBack();
            });

            this.setState({
                name: '',
                streetAddress: '',
                postcode: '',
                city: '',
                country: '',
                mapurl: ''
            })
    };
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };
    handleStreetChange = (event) => {
        this.setState({streetAddress: event.target.value});
    };
    handleZipChange = (event) => {
        this.setState({postcode: event.target.value});
    };
    handleCityChange = (event) => {
        this.setState({ city: event.target.value });
    };
    handleCountryChange = (event) => {
        this.setState({ country: event.target.value });
    };
    handleMapurlChange = (event) => {
        this.setState({ mapurl: event.target.value })
    }

    render() {
        return (
            <Col xs={4} md={4} className="boxx alert alert-warning">
            <p><span className="glyphicon glyphicon-tag"></span>Lisää paikkoja</p>
                <input type="text" style={{ width: '200px' }} placeholder="nimi" value={this.state.name}
                    onChange={this.handleNameChange} /><br></br>
                <input type="text" style={{ width: '200px' }} placeholder="katuosoite"
                    value={this.state.streetAddress}
                    onChange={this.handleStreetChange} /><br></br>
                <input type="text" style={{ width: '100px' }} placeholder="postinumero" value={this.state.postcode}
                    onChange={this.handleZipChange} />
                <input type="text" style={{ width: '150px' }} placeholder="kaupunki" value={this.state.city}
                    onChange={this.handleCityChange} />
                <input type="text" style={{ width: '100px' }} placeholder="maa" value={this.state.country}
                    onChange={this.handleCountryChange} />
                <input type="text" style={{ width: '300px' }} placeholder="kartan url" value={this.mapurl}
                    onChange={this.handleMapurlChange} />
                <div className="circle" onClick={this.handleCreateClick.bind(this)}><span
                    className="glyphicon glyphicon-plus"></span></div>
            </Col>
        );
    }
}

export default NewPlace;

