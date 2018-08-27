import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

class Event extends React.Component {

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-tag"></span> {this.props.data.name}</td>
            </tr>
        )
    }
}

export default Event;