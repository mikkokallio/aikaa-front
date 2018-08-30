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
                <p>{this.props.data.address.streetAddress}, {this.props.data.address.postcode}</p>
                <p>{this.props.data.address.district}, {this.props.data.address.country}</p>
                <div className="circle" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6804.242548242408!2d25.64423964827891!3d64.76383069055811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4681b78ad8bcbf3d%3A0x6d468fce3e298c6c!2zOTE4MDAgVHlybsOkdsOkLCBGaW5sYW5k!5e0!3m2!1sen!2sse!4v1535459753837"
                    width="300" height="225" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </Col>
        )
    }
}

export default Place;