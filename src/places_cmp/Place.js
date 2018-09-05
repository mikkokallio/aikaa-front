import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import axios from "axios/index";

class Place extends React.Component {

    remove =() => {
        axios.delete('/api/places/' + this.props.data.id)
            .then(res => {
                this.props.callBack();
            });
    };

    render() {
        return (
            <Col xs={4} md={4} className="boxx alert alert-success role" id={this.props.data.id}>
                <span className="glyphicon glyphicon-map-marker"></span> {this.props.data.name}
                <p>{this.props.data.address.streetAddress}</p>
                <p>{this.props.data.address.postcode} {this.props.data.address.city}</p>
                <p>{this.props.data.address.country}</p>
                <div className="circle" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></div>
                <iframe title={"map"+this.props.data.id}
                    src={this.props.data.mapurl?this.props.data.mapurl:''}
                    width="300" height="225" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </Col>
        )
    }
}

export default Place;